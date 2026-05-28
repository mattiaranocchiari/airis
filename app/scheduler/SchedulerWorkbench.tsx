"use client";

import { useCallback, useState } from "react";
import { SchedulerGrid, type GridAppointment } from "@/app/scheduler/_components/SchedulerGrid";
import { Conversation, type ConversationEntry } from "@/app/scheduler/_components/Conversation";

type Props = {
  initial: GridAppointment[];
  tenantId: string;
};

// Phase 0 client wrapper that lifts shared conversation state above both
// surfaces, so a content-surface drag-to-move can emit a system message
// into the conversation panel ("moved to 11:00") without asking a question —
// the "feels like one event" property of the dual-surface paradigm running
// in the content→conversation direction.
export function SchedulerWorkbench({ initial, tenantId }: Props) {
  const [entries, setEntries] = useState<ConversationEntry[]>([]);

  const appendEntry = useCallback((entry: ConversationEntry) => {
    setEntries((prev) => [...prev, entry]);
  }, []);

  return (
    <main className="grid h-full flex-1 grid-cols-1 gap-4 p-6 lg:grid-cols-[1fr_400px]">
      <SchedulerGrid initial={initial} tenantId={tenantId} appendEntry={appendEntry} />
      <Conversation entries={entries} appendEntry={appendEntry} />
    </main>
  );
}
