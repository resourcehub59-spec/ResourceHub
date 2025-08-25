# ResourceHub (Fixed)

This build adds **graceful fallbacks** so the app runs even without Supabase credentials.

## Quick Start (Mock Mode)

```bash
npm run dev
# Works immediately using local mock data and a demo admin user (admin@example.com)
```

## Production / Real Data

1. Copy `.env.example` to `.env` and set your Supabase URL + anon key.
2. Create table `resources` matching fields used in `src/store/db.js`.
3. Create Postgres function `increment_clicks(res int)` for the click counter or remove the call.
4. Restart `vite`.

## What I fixed

- **No-DB mode:** `src/store/db.js` auto-switches to `src/store/fallback.js` when env vars are missing.
- **Mock Auth:** `src/context/AuthProvider.jsx` seeds a demo user when Supabase is not configured.
- **Browser compatibility:** replaced `toSorted`/`toReversed` with classic `slice().sort()` / `slice().reverse()`.
- **Sample data:** `src/store/mockData.json` provides initial catalog items.
- **.env template:** added `.env.example`.
- Minor defensive checks and cleanup.
