-- Step 4.3 migration 0021: Realtime Broadcast tenant-private-channel policy
-- Substrate L2 per Master Doc §17.4: Supabase Realtime Broadcast on private
-- channels with RLS authorization on realtime.messages. Channel naming convention
-- `tenant:{tenant_id}:<scope>` — Step 4.3 uses `tenant:{tenant_id}:scheduler:ct1`
-- but the policy is general: any topic whose prefix matches the clinician's
-- own tenant is authorized for read (subscribe) and write (broadcast publish).
--
-- realtime.topic() returns the channel name for the current request context.
-- current_tenant_id() reads tenant_id out of the JWT app_metadata (per the
-- Italian-claim hook composition in Step 4.2 migration 0008).
--
-- RLS is already enabled on realtime.messages by Supabase; this adds the
-- per-tenant policies (no prior policies existed -> all subscribes were
-- implicit-denied).

CREATE POLICY realtime_tenant_topic_select ON realtime.messages
  FOR SELECT TO authenticated
  USING (
    public.current_tenant_id() IS NOT NULL
    AND realtime.topic() LIKE ('tenant:' || public.current_tenant_id()::text || ':%')
  );

CREATE POLICY realtime_tenant_topic_insert ON realtime.messages
  FOR INSERT TO authenticated
  WITH CHECK (
    public.current_tenant_id() IS NOT NULL
    AND realtime.topic() LIKE ('tenant:' || public.current_tenant_id()::text || ':%')
  );
