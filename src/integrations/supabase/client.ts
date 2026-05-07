import { createClient } from "@supabase/supabase-js";

// Public values — safe to inline. The anon key is intentionally public
// (RLS guards what it can do); the URL is public too. Hardcoding here
// makes the bundle work regardless of whether `.env` was injected at
// build time (Cloudflare Workers / Pages remote builds don't see
// gitignored `.env`). Local dev or alternate deployments can still
// override via `import.meta.env.VITE_SUPABASE_*`.
const FALLBACK_SUPABASE_URL = "https://kcukkqnkhvhphfdebcuh.supabase.co";
const FALLBACK_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjdWtrcW5raHZocGhmZGViY3VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzM4MjgsImV4cCI6MjA5MzY0OTgyOH0.tsOyMzsk2pfsX2j0cAbfiOTUW_gw3g08J0ywzhHzIfw";

const url = import.meta.env.VITE_SUPABASE_URL ?? FALLBACK_SUPABASE_URL;
const anonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? FALLBACK_SUPABASE_ANON_KEY;

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
