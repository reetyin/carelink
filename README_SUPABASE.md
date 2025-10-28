# Supabase Integration Guide

This project stores parent profiles in Supabase (Postgres) via a Next.js API.

## 1) Create a Supabase project
- Go to https://supabase.com and create a project.
- Note your Project URL and anon key (Settings → API).
- Copy your service_role key (server-side only).

## 2) Configure environment variables
Copy `.env.local.example` to `.env.local` and fill in:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE (server only; DO NOT COMMIT)

## 3) Create database tables
Open Supabase SQL Editor and run the SQL in `supabase/schema.sql` to create the `profiles` table.

SQL snippet:
```
create table if not exists profiles (
  email text primary key,
  data jsonb
);
create index if not exists profiles_data_gin on profiles using gin (data);
```

## 4) Run the app
- Install deps: npm install
- Start dev server: npm run dev
- Open /profile, edit info, click Save → writes to Supabase if env vars are set; otherwise falls back to localStorage.

## 5) How to access the database
- Supabase Web Console (recommended): use SQL Editor and Table Editor to view/edit.
- Direct Postgres client (optional): Settings → Database → Connection string (TLS required). Example:
```
postgresql://postgres:<password>@<host>:6543/postgres?sslmode=require
```

## 6) API endpoints
- GET /api/profile?email=<email> → { profile }
- POST /api/profile { email, profile } → upsert { ok: true }

## 7) Next steps
- Normalize children into a dedicated table.
- Move auth to Supabase Auth and add RLS policies.

## 8) OAuth login (Google/Facebook/Apple)

The login page has OAuth buttons wired to Supabase. To enable:

1) Supabase → Authentication → URL Configuration
- Add Redirect URLs:
  - http://localhost:3000/auth/callback
  - https://YOUR_DOMAIN/auth/callback

2) Supabase → Authentication → Providers
- Enable providers and paste their credentials.
- Each provider's authorized redirect/callback URL must include your project callback:
  - https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
  - Example: https://zbninzkmhqgzhtshabqp.supabase.co/auth/v1/callback

3) Provider credentials needed
- Google: OAuth Client ID, Client Secret
- Facebook: App ID, App Secret
- Apple: Service ID, Team ID, Key ID, Private Key (.p8)

4) App flow
- Button → supabase.auth.signInWithOAuth → redirects to provider.
- Provider → Supabase → back to /auth/callback.
- We read session, map email into local user store, then route to /role.
