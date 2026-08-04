# Roadmap

Living document — updated whenever issues/milestones are added or closed. Complements [`STANDARDS.md`](./STANDARDS.md) (what we decided) and [`WORKFLOW.md`](./WORKFLOW.md) (how we execute: one branch/PR per issue, waves for sequencing dependent work).

Status legend: `Todo` · `In progress` · `Done`

## Epic: Phase 1 — Interactive 3D Portfolio

A walkable, isometric 3D scene (built in Blender) with three interactive buildings (Office, Gallery, Arcade) that open overlay panels with real content served from MongoDB. No AI assistant yet — that's Phase 2.

---

### Milestone 0 — Foundations & architecture

Everything needed before any scene/feature work can start.

- [x] **Write living docs**: `STANDARDS.md`, `WORKFLOW.md`, `BLENDER_WORKFLOW.md`, `ROADMAP.md`. — `Done`
- [x] **Remove legacy content**: old flat pages (about/contact/projects), `topBar`/`footer`/`hero` components, `emailjs-com` contact form, unused `lib/projects.js`. Replaced `app/layout.js` and `app/page.js` with minimal placeholders. — `Done`
- [ ] **Foundations & architecture** (current issue) — `In progress`
  - [ ] Migrate the project to strict TypeScript (`tsconfig.json`, drop `jsconfig.json`, convert existing files to `.tsx`/`.ts`).
  - [ ] Install and wire up core dependencies: Mongoose, Redux Toolkit + RTK Query, React Three Fiber + drei + rapier, Prettier, Husky + lint-staged.
  - [ ] Base folder structure: `store/`, `lib/db.ts`, `lib/models/`, `components/ui/`, `components/scene/`.
  - [ ] Redux store skeleton: `store/index.ts`, `app/providers.tsx`, empty `store/sceneSlice.ts`.
  - [ ] Mongo connection skeleton in `lib/db.ts` (cached singleton, no models yet).
  - [ ] GitHub Actions workflow: `npm ci` + `lint` + `typecheck` + `build` on every PR.
  - [ ] Branch protection on `main` requiring the workflow to pass.

### Milestone 1 — Base 3D scene

*Detailed once Milestone 0 is done.* Expected scope: import the Blender `.glb` via `gltfjsx`, `CameraRig` reading `CameraRef`, avatar movement driven by `sceneSlice` with `Idle`/`Walk` animations, rapier colliders from `Collision_*` proxies.

### Milestone 2 — Interactions

*Detailed once Milestone 1 is done.* Expected scope: `InteractionTrigger` primitive, `OverlayPanel` primitive, Office/Gallery/Arcade triggers wired to (placeholder) panels.

### Milestone 3 — Content & data

*Detailed once Milestone 2 is done.* Expected scope: Mongoose models, `app/api/*` route handlers, RTK Query endpoints, `scripts/seed.ts`, panels consuming real data.

### Milestone 4 — Polish & deploy

*Detailed once Milestone 3 is done.* Expected scope: color palette/Tailwind tokens (once Blender art defines the mood), accessibility/SEO fallback, Vercel CD, final QA pass.

---

## How this file is used

- Each checkbox that becomes active work gets its own issue, branch (`type/issue-slug`), and PR — see `WORKFLOW.md`.
- Issues within a milestone that don't depend on each other get worked in the same wave; dependent issues wait for the next wave.
- Milestones 1–4 are intentionally light until the prior milestone is done — we don't lock in details for work that's still far out.
