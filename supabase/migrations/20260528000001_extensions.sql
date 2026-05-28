-- Step 4.2 migration 0001: extensions
-- pgcrypto provides digest() for SHA-256 hashing of the L6 audit chain.
CREATE EXTENSION IF NOT EXISTS pgcrypto;
