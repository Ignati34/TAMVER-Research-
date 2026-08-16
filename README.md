# TAMVER Research v0.6.1 — Website Design Cloner + Motion Crystal

UX / interaction correction release based on v0.6.

## v0.6.1 focus

- larger, higher hero crystal with visible foundation;
- `DSS CORE / Foundation Layer` base node;
- repaired DSS interaction;
- collision-safe Evidence Impact node layout;
- functional accessible menu button and compact menu panel;
- clickable Madrid / Vienna / Andorra footer controls;
- office-contact dialog without invented office addresses;
- clickable footer labels;
- corrected TAMVER underline and centered `research` lockup;
- reduced-motion handling.

See:
- `TZ_v0.6.1_FINAL.md`
- `CHANGELOG_v0.6.1.md`
- `DESIGN_SYNC_V06.md`
- `WEBSITE_DESIGN_CLONER_RUN.md`

## Run

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:4321/
http://localhost:4321/knowledge/
http://localhost:4321/impact/
http://localhost:4321/impact/ev-supplier-single-point/
http://localhost:4321/evidence/
http://localhost:4321/ledger/
```

## Manual acceptance test

1. Hover and click AIR, DSS, SCM, Scenario and Evidence.
2. Confirm `DSS CORE` stays structural and does not emit the red critical flash.
3. Open and close the circular menu button; also test Escape and click-outside.
4. After closing the menu, click Madrid, Vienna and Andorra in the footer.
5. Verify the three `SCENARIO NODE` labels on `/impact/` are spatially separated.
6. Check the hero at desktop and laptop widths.

## Live Ledger

Copy `.env.example` to `.env` and set:

```text
PUBLIC_TAMVER_LEDGER_API_BASE=https://your-ledger-api.example
```

v12 backward trace uses `/api/tamver/evidence/trace?claimId=...`.
Future v13 impact will use `/api/tamver/evidence/impact?evidenceId=...` when implemented.

## Build verification note

The current execution environment's internal npm registry returns HTTP 404 for `@astrojs/react@^5.0.0`, so a full local `npm install` / Astro build could not be completed here. TSX syntax for the modified React components was checked with TypeScript's transpiler and passed.

## v0.7.1 hotfix
This package preserves the Andorra Scenario Demo Crystal unchanged and fixes two shared-interface issues: DSS CORE interaction on the main hero and narrow-screen footer contact overlap. See `CHANGELOG_v0.7.1.md`.
