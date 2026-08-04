# Project standards

## Why this document exists

This portfolio is built with the same rigor as a team project: on one hand it aims to have real relevance in the job market (visible best practices: architecture, CI/CD, documentation, code review), and on the other it's a passion project (3D, Blender, AI). Both goals demand the same level of care, not a lesser one. This document is the quick reference for "how we do things here" — it gets updated whenever a decision changes.

See also [`docs/ROADMAP.md`](./ROADMAP.md) for the Phase 1 Epic/Milestones/Issues.

## General architecture

- **A single Next.js (App Router) project in TypeScript**, deployed entirely on Vercel — frontend and backend (`app/api/*` as Route Handlers) in the same deploy. No separate Express server.
- **MongoDB Atlas + Mongoose** as the database. Models in `lib/models/`, singleton connection cached in `lib/db.ts` (required in a serverless environment).
  - Mongo is chosen over hardcoded static data even though Phase 1 content (profile, projects, hobbies) wouldn't require it on its own: in Phase 2, Atlas Vector Search will store the content chunks/embeddings for the AI assistant's RAG, reusing the same piece of infrastructure instead of migrating from static to DB later. The RAG work itself is only tackled once Phase 1 is closed.
- **No admin panel** for now: content (profile, projects, hobbies) is updated via `scripts/seed.ts`.
- **No contact form with email sending**: the contact section is presentational (links to email/LinkedIn/GitHub/CV), with no backend involved.

## State and data: Redux Toolkit + RTK Query (mandatory, no exceptions)

This is an explicit stack decision, not a minor detail:

- **Redux Toolkit** (`@reduxjs/toolkit` + `react-redux`) is the **only** global state mechanism in the project. `store/index.ts` builds the store with `configureStore`; `app/providers.tsx` (`"use client"`) mounts the `<Provider>`.
- **RTK Query** (part of Redux Toolkit, `store/api.ts` via `createApi`) is the **only** way to talk to the backend. Every `GET` to `app/api/*` (profile, projects, hobbies) is defined as an RTK Query endpoint — no loose `fetch`/`axios`, no hand-rolled duplicated server state (`useState` + `useEffect` for remote data is forbidden).
- **`store/sceneSlice.ts`** (Redux Toolkit slice) holds scene/UI state: avatar position, active section/overlay, camera target. The reducer/action that moves the avatar is designed decoupled from the input source: today it's the keyboard, but it must be able to receive a "move towards X" triggered from another origin (e.g. the AI assistant in phase 2) without being rewritten.
- Redux Toolkit + RTK Query was chosen over lighter alternatives (Zustand, etc.) on purpose — it's a pattern widely used in the industry and part of what this project wants to show as a signal for the job market.

## Server Components by default

- Every component is a **Server Component** unless it needs interactivity, browser state, or client hooks — the `"use client"` boundary is reserved for: the 3D canvas, components that consume RTK Query/Redux, and input controls.
- Purely static content (copy, layout, HUD, SEO/accessibility fallback) stays in Server Components.
- This **does not contradict** using RTK Query for all data: it just scopes how large the `"use client"` tree is around that data — the shell/layout of a panel can be server, the dynamic content (consumed via RTK Query) inside it is client.

## Reusable components and primitives

Phase 1 is built with generic abstractions, not code specific to "3 buildings", so that phase 2 (AI assistant) reuses instead of rewriting:

- **`InteractionTrigger`**: "interaction zone" primitive (rapier sensor + callback). Used by the 3 buildings; in phase 2 it lets the assistant react to proximity.
- **`OverlayPanel`**: generic overlay panel shell (animated enter/exit, close, layout). Office/Gallery/Arcade are instances; the future AI chat panel is another instance.
- **`components/ui/`**: layer of custom visual primitives (buttons, panels, typography) consumed by the overlays — avoid repeated ad hoc styles.
- **Named markers in Blender** (see below) read generically by code — adding a new marker doesn't require changing the code that reads them.

## Blender → 3D scene

Blender is the source of truth for everything visual and spatial. Code never hardcodes transforms, materials, or layout — it only interprets what's already authored in the `.glb`.

**What's authored in Blender:**
- Full composition: position/rotation/scale of buildings (filler and interactive), alley layout, decorative props, materials (PBR via Principled BSDF).
- Collision geometry: proxy meshes named `Collision_*`.
- Markers (Empties) with a fixed name:
  - `Trigger_Office`, `Trigger_Gallery`, `Trigger_Arcade` — volume at the door of each interactive building.
  - `SpawnPoint` — avatar's initial position.
  - `CameraRef` — exact isometric angle/distance for the camera.
- Avatar: rigged mesh + animations (`Idle`, `Walk`, and in phase 2 `Talk`/gestures) in a single `.glb`.

**Export and codegen:**
- Export as `.glb`, Draco or Meshopt compression.
- `npx gltfjsx model.glb --types` generates the typed React component in `components/scene/generated/` — **not hand-edited**, regenerated whenever the `.blend`/`.glb` changes.

**How the code interprets it (always generic, never hand-tuned per building):**
- `CameraRig` reads `CameraRef` to initialize the orthographic camera and follows the avatar with lerp.
- The code looks for nodes with the `Trigger_*` prefix and automatically hooks up an `InteractionTrigger`.
- `Collision_*` meshes generate the rapier colliders; if an object has no proxy, its bounding box is used as a fallback.
- The avatar plays animation clips by name (`useAnimations` from drei) driven by `sceneSlice`.

**Binary assets:** `.blend` and `.glb` go through **Git LFS** from the start (`assets/blender/`, `public/models/`).

## Styles and UI

- **Tailwind CSS**, with tokens (spacing, typography, and color once decided) as custom properties in `app/globals.css`, referenced from `tailwind.config`.
- **The color palette isn't defined yet** — it's chosen progressively based on the mood the scene takes in Blender. Don't fix colors "blindly" before having reference art.
- Clean interface: prefer `components/ui/` primitives over repeated inline styles.

## Code quality

- **Strict TypeScript** (`strict: true`).
- **ESLint** (flat config) + **Prettier**.
- **Husky + lint-staged** on pre-commit (lint + format on staged files).
- **Testing**: no automated tests required in phase 1 (manual verification). They are required for the AI part in phase 2 (Vitest, retrieval/RAG logic) — the CI pipeline is left ready to add it without restructuring.

## Git, commits, PRs and living documentation

- Work happens on branches + Pull Request, even solo, with a review step before merging into `main` (can lean on Claude Code's `/code-review` skill against the diff).
- Clear commit convention (e.g. Conventional Commits).
- **`docs/ROADMAP.md` is a living document**: updated whenever issues/milestones are added or closed — it's our own issue tracking, independent of whether it's also mirrored as real GitHub Issues/Milestones.
- **Every PR documents in its description** which roadmap issue/milestone it addresses and what changed.
- The detailed branching mechanics and PR templates are defined in `docs/WORKFLOW.md`.
- **Important:** this GitHub account (`ro-front-end`) also belongs to an external organization (work). Everything about this project lives exclusively in the personal repo `ro-front-end/portfolio-rodrigo-front` — never in that organization.

## CI/CD

- **GitHub Actions**: workflow on every PR with `npm ci`, `lint`, `typecheck` (`tsc --noEmit`), and `build`. A `test` job (Vitest) is added in phase 2.
- **Branch protection** on `main` requiring the workflow to pass.
- **CD**: Vercel via its GitHub integration — preview deployment per PR, production on merge to `main`. Environment variables (`MONGODB_URI`, etc.) separated between preview and production.
