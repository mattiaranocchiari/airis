"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import {
  SCHEDULER_BROADCAST_EVENT,
  schedulerChannelTopic,
  type SchedulerBroadcastV1,
} from "@/lib/realtime/channel";
import { loadGridForCT1, moveAppointmentByDrag } from "@/app/scheduler/actions";
import { speak } from "@/lib/voice/tts";
import type { ConversationEntry } from "@/app/scheduler/_components/Conversation";

export type GridAppointment = {
  id: string;
  slot_start_at: string;
  slot_end_at: string;
  kind: string;
  subtype: string | null;
  with_contrast: boolean;
  patient_id: string;
};

type Props = {
  initial: GridAppointment[];
  tenantId: string;
  appendEntry: (entry: ConversationEntry) => void;
};

const DRAG_MIME = "application/airis-appointment-id";

export function SchedulerGrid({ initial, tenantId, appendEntry }: Props) {
  const [appointments, setAppointments] = useState<GridAppointment[]>(initial);
  const [isRefreshing, startRefresh] = useTransition();
  const [lastBroadcastAt, setLastBroadcastAt] = useState<number | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverHour, setDragOverHour] = useState<number | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const topic = schedulerChannelTopic(tenantId, "CT1");
    const channel = supabase.channel(topic, { config: { private: true } });
    channel
      .on("broadcast", { event: SCHEDULER_BROADCAST_EVENT }, ({ payload }) => {
        const msg = payload as SchedulerBroadcastV1;
        if (msg.v !== 1) return;
        setLastBroadcastAt(performance.now());
        startRefresh(async () => {
          const next = await loadGridForCT1();
          setAppointments(next.appointments);
        });
      })
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [tenantId]);

  const slots = useMemo(() => buildSlots(), []);
  const byHour = useMemo(() => {
    const out = new Map<number, GridAppointment[]>();
    for (const apt of appointments) {
      // Bucket by UTC hour to stay consistent with how slots are stored and
      // how the server formats confirmations (Vercel/Node runs UTC). Keeps
      // "book at 9" → grid row 09:00 → "booked at 09:00" coherent regardless
      // of the viewer's timezone. A real clinic-local-time rendering is a
      // post-validation concern (needs a per-clinic TZ).
      const hour = new Date(apt.slot_start_at).getUTCHours();
      const arr = out.get(hour) ?? [];
      arr.push(apt);
      out.set(hour, arr);
    }
    return out;
  }, [appointments]);

  async function handleDrop(appointmentId: string, newHour: number, dragDropTs: number) {
    const apt = appointments.find((a) => a.id === appointmentId);
    if (!apt) return;
    const oldHour = new Date(apt.slot_start_at).getUTCHours();
    if (oldHour === newHour) return;

    const oldStart = new Date(apt.slot_start_at);
    const newStart = new Date(oldStart);
    newStart.setUTCHours(newHour, 0, 0, 0);
    const durationMs =
      new Date(apt.slot_end_at).getTime() - new Date(apt.slot_start_at).getTime();
    const newEnd = new Date(newStart.getTime() + durationMs);

    // Optimistic UI per React 19 §17.1 + Step 4.3 plan — the grid reflects
    // the intent the moment the clinician drops; the L2 broadcast confirms
    // the truth a few hundred ms later.
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appointmentId
          ? { ...a, slot_start_at: newStart.toISOString(), slot_end_at: newEnd.toISOString() }
          : a,
      ),
    );

    const result = await moveAppointmentByDrag(appointmentId, newHour, dragDropTs);
    if (result.kind === "ok") {
      const latency = result.timing.broadcastSentTs - dragDropTs;
      const msg = `${result.message} (${latency} ms end-to-end)`;
      appendEntry({ id: crypto.randomUUID(), role: "system", text: msg });
      speak(result.message);
    } else if (result.kind === "error") {
      // Revert optimistic update.
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === appointmentId
            ? { ...a, slot_start_at: apt.slot_start_at, slot_end_at: apt.slot_end_at }
            : a,
        ),
      );
      appendEntry({
        id: crypto.randomUUID(),
        role: "system",
        text: `move failed: ${result.reason}`,
      });
    }
  }

  return (
    <div className="rounded-md border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-zinc-800">
        <h2 className="text-sm font-semibold">CT1 — day grid</h2>
        <span className="text-xs text-zinc-500">
          {isRefreshing ? "syncing…" : lastBroadcastAt ? "synced" : ""}
        </span>
      </div>
      <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {slots.map((slot) => {
          const hourAppts = byHour.get(slot.hour) ?? [];
          const isDragTarget = dragOverHour === slot.hour;
          return (
            <li
              key={slot.hour}
              onDragOver={(e) => {
                if (e.dataTransfer.types.includes(DRAG_MIME)) {
                  e.preventDefault();
                  setDragOverHour(slot.hour);
                }
              }}
              onDragLeave={() => {
                setDragOverHour((cur) => (cur === slot.hour ? null : cur));
              }}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData(DRAG_MIME);
                const dragDropTs = Date.now();
                setDragOverHour(null);
                setDraggingId(null);
                if (id) {
                  void handleDrop(id, slot.hour, dragDropTs);
                }
              }}
              className={
                "flex items-start px-4 py-2 text-sm " +
                (isDragTarget ? "bg-blue-50 dark:bg-blue-950" : "")
              }
            >
              <span className="w-16 shrink-0 text-zinc-500">{slot.label}</span>
              <div className="flex flex-1 flex-wrap gap-2">
                {hourAppts.map((apt) => (
                  <div
                    key={apt.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData(DRAG_MIME, apt.id);
                      e.dataTransfer.effectAllowed = "move";
                      setDraggingId(apt.id);
                    }}
                    onDragEnd={() => {
                      setDraggingId(null);
                      setDragOverHour(null);
                    }}
                    className={
                      "cursor-grab rounded border border-zinc-300 bg-zinc-50 px-2 py-1 text-xs select-none dark:border-zinc-700 dark:bg-zinc-900 " +
                      (draggingId === apt.id ? "opacity-50" : "")
                    }
                    title="drag to a new hour"
                  >
                    <div className="font-medium">
                      {apt.kind} {apt.subtype ?? ""}
                      {apt.with_contrast ? " (contrast)" : ""}
                    </div>
                    <div className="text-zinc-500">{apt.patient_id.slice(0, 8)}</div>
                  </div>
                ))}
                {hourAppts.length === 0 ? <span className="text-zinc-400">—</span> : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function buildSlots(): { hour: number; label: string }[] {
  const out: { hour: number; label: string }[] = [];
  for (let h = 7; h <= 19; h++) {
    out.push({ hour: h, label: `${h.toString().padStart(2, "0")}:00` });
  }
  return out;
}
