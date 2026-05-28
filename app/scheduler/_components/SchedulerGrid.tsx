"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import {
  SCHEDULER_BROADCAST_EVENT,
  schedulerChannelTopic,
  type SchedulerBroadcastV1,
} from "@/lib/realtime/channel";
import { loadGridForCT1 } from "@/app/scheduler/actions";

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
};

export function SchedulerGrid({ initial, tenantId }: Props) {
  const [appointments, setAppointments] = useState<GridAppointment[]>(initial);
  const [isRefreshing, startRefresh] = useTransition();
  const [lastBroadcastAt, setLastBroadcastAt] = useState<number | null>(null);

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
      const hour = new Date(apt.slot_start_at).getHours();
      const arr = out.get(hour) ?? [];
      arr.push(apt);
      out.set(hour, arr);
    }
    return out;
  }, [appointments]);

  return (
    <div className="rounded-md border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-zinc-800">
        <h2 className="text-sm font-semibold">CT1 — day grid</h2>
        <span className="text-xs text-zinc-500">
          {isRefreshing ? "syncing…" : lastBroadcastAt ? "synced" : ""}
        </span>
      </div>
      <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {slots.map((slot) => (
          <li key={slot.hour} className="flex items-start px-4 py-2 text-sm">
            <span className="w-16 shrink-0 text-zinc-500">{slot.label}</span>
            <div className="flex flex-1 flex-wrap gap-2">
              {(byHour.get(slot.hour) ?? []).map((apt) => (
                <div
                  key={apt.id}
                  className="rounded border border-zinc-300 bg-zinc-50 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-900"
                >
                  <div className="font-medium">
                    {apt.kind} {apt.subtype ?? ""}
                    {apt.with_contrast ? " (contrast)" : ""}
                  </div>
                  <div className="text-zinc-500">{apt.patient_id.slice(0, 8)}</div>
                </div>
              ))}
              {(byHour.get(slot.hour) ?? []).length === 0 ? (
                <span className="text-zinc-400">—</span>
              ) : null}
            </div>
          </li>
        ))}
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
