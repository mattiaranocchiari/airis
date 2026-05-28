// Substrate L2 channel naming + broadcast payload shape per §17.4 and the
// Step 4.3 RLS policy on realtime.messages (migration 0021). Channel:
// `tenant:{tenant_id}:scheduler:{room_id}`. Payload format is versioned;
// receivers ignore unknown versions to allow rolling forward.

export function schedulerChannelTopic(tenantId: string, roomId: string): string {
  return `tenant:${tenantId}:scheduler:${roomId}`;
}

export type SchedulerBroadcastV1 =
  | {
      v: 1;
      type: "appointment.created";
      appointment_id: string;
      room_id: string;
      slot_start_at: string;
      slot_end_at: string;
      kind: string;
      subtype: string | null;
      with_contrast: boolean;
      patient_id: string;
      occurred_at: string;
    }
  | {
      v: 1;
      type: "appointment.updated";
      appointment_id: string;
      room_id: string;
      slot_start_at: string;
      slot_end_at: string;
      changed_fields: string[];
      occurred_at: string;
    }
  | {
      v: 1;
      type: "appointment.cancelled";
      appointment_id: string;
      room_id: string;
      occurred_at: string;
    };

export const SCHEDULER_BROADCAST_EVENT = "scheduler.v1";
