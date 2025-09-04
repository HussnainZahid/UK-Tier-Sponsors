# Project Structure

This document outlines the current structure of the UK Tier Sponsors project.

```
.
├─ AGENTS.md
├─ components.json
├─ index.html
├─ netlify.toml
├─ package.json
├─ postcss.config.js
├─ public/
│  ├─ placeholder.svg
│  ├─ robots.txt
│  ├─ uk-flag.svg
│  └─ visa-sponsor-illustration.svg
├─ shared/
│  └─ api.ts
├─ tailwind.config.ts
├─ test-search.md
├─ tsconfig.json
├─ vite.config.ts
├─ vite.config.server.ts
├─ client/
│  ├─ App.tsx
│  ├─ global.css
│  ├─ components/
│  │  ├─ ApiStatus.tsx
│  │  ├─ DataTable.tsx
│  │  ├─ ErrorBoundary.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Layout.tsx
│  │  ├─ Navigation.tsx
│  │  ├─ PlaceholderPage.tsx
│  │  ├─ SearchFilters.tsx
│  │  └─ ui/ (buttons, inputs, cards, tabs, etc.)
│  ├─ contexts/
│  │  └─ (unused; Supabase removed)
│  ├─ hooks/
│  │  ├─ use-mobile.tsx
│  │  └─ use-toast.ts
│  ├─ lib/
│  │  ├─ auth.ts
│  │  ├─ csv.ts
│  │  ├─ utils.ts
│  │  ├─ utils.spec.ts
│  │  └─ supabase.ts (removed)
│  └─ pages/
│     ├─ About.tsx
│     ├─ AllData.tsx
│     ├─ AuthCallback.tsx
│     ├─ DeletedData.tsx
│     ├─ Download.tsx
│     ├─ ExportData.tsx
│     ├─ ForgotPassword.tsx
│     ├─ Index.tsx
│     ├─ Industry.tsx
│     ├─ Location.tsx
│     ├─ Login.tsx
│     ├─ NotFound.tsx
│     ├─ RecentData.tsx
│     ├─ ReleaseNotes.tsx
│     ├─ Resources.tsx
│     ├─ TestAllData.tsx
│     ├─ TestPage.tsx
│     └─ WorkingAllData.tsx
├─ netlify/
│  └─ functions/
│     └─ api.ts
└─ server/
   ├─ index.ts
   ├─ node-build.ts
   ├─ data/
   │  └─ mockSponsors.ts
   ├─ db/
   │  └─ mongo.ts
   ├─ middleware/
   │  └─ auth.ts
   ├─ models/
   │  ├─ Feedback.ts
   │  ├─ Subscription.ts
   │  └─ User.ts
   ├─ routes/
   │  ├─ auth.ts
   │  ├─ data.ts
   │  ├─ demo.ts
   │  ├─ feedback.ts
   │  ├─ govuk.ts
   │  ├─ health.ts
   │  ├─ sponsors.ts
   │  └─ subscriptions.ts
   └─ services/
      ├─ ukGovDataService.ts
      ├─ userStore.ts
      └─ userStoreMongo.ts
```

Notes:
- Authentication uses custom /api/auth routes with MongoDB (Mongoose). Supabase has been removed.
- Frontend uses React, Vite, Tailwind, and shadcn/ui components.
- Netlify config routes /api/* to the serverless function wrapper.
