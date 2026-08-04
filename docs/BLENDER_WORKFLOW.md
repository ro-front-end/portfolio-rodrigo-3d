# Guide: Blender → web workflow (React Three Fiber)

Reference guide for the workflow between Blender and a web scene built with React Three Fiber. It originates from decisions made in this project ([`STANDARDS.md`](./STANDARDS.md)), but is written project-agnostic so it can be reused in other projects. **This is a living document**: it gets filled in as new decisions, conventions, or gotchas show up — it doesn't need to be complete on day one.

## General principle

Blender is the source of truth for everything visual and spatial. Code never hardcodes transforms, materials, or layout by hand — it only interprets what's already authored in the exported `.glb`. If something can be solved by moving an object in Blender instead of touching code, it gets solved in Blender.

## Naming conventions in Blender

Code reads the scene generically by naming convention — adding a new object that follows the convention shouldn't require code changes.

- **Markers (Empties)** with a fixed name and special meaning. In this project:
  - `Trigger_<Name>` — interaction zone volume (code looks for the `Trigger_*` prefix and automatically hooks up a handler).
  - `SpawnPoint` — character/avatar starting position.
  - `CameraRef` — reference angle/distance for the camera.
- **Collision geometry**: proxy meshes with the `Collision_*` prefix. If an object has no proxy, code falls back to its bounding box.
- (Pending: keep adding conventions for LODs, material variants, prop anchor points, etc. as they come up.)

## Export

- Format: **`.glb`** (binary, self-contained).
- Geometry compression: **Draco or Meshopt** (pending: pick a default and why, and when to use the other one).
- Materials: **PBR via Principled BSDF** — avoid custom node setups that don't export well to glTF.
- (Pending: texture size/format conventions, handling multiple animations in one `.glb`, action/clip naming.)

## Codegen: from `.glb` to React component

- `npx gltfjsx model.glb --types` generates the typed component.
- The generated file is **never hand-edited** — it gets regenerated every time the source `.blend`/`.glb` changes. If extra logic is needed (e.g. hooking up a trigger), wrap the generated component instead of editing the generated file.
- Animations are played by clip name (e.g. with `useAnimations` from `@react-three/drei`), not by index.

## Versioning binaries

- `.blend` and `.glb` are large binaries — they go through **Git LFS**, never committed directly to the repo.

## Checklist before exporting a scene/object

- [ ] Empties and Collision_* names follow the convention.
- [ ] Transforms applied (or intentionally not applied, if code depends on the original hierarchy).
- [ ] Materials use Principled BSDF.
- [ ] Exported `.glb` size is reasonable (check whether Draco/Meshopt is applied).
- (Keep adding items based on recurring export errors.)

## Gotchas / learnings

(Empty for now — gets filled in with real issues encountered: names Blender truncates, axes that rotate wrong on export, materials that don't translate well to glTF, etc.)
