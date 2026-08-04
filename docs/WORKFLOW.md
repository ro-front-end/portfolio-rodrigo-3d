# Project workflow

Complements [`docs/STANDARDS.md`](./STANDARDS.md) (stack/architecture decisions) and [`docs/ROADMAP.md`](./ROADMAP.md) (Epic/Milestones/Issues). This document defines **how work actually gets executed day to day**: work hierarchy, branches/PRs, agent waves, and git safety rules.

## Work hierarchy

**Epic → Milestone → Issue**, following `docs/ROADMAP.md`:

- **Epic**: the big goal (e.g. "Phase 1").
- **Milestone**: groups related issues within the Epic.
- **Issue**: a concrete, scoped unit of work. How many issues per milestone varies depending on what comes up during planning.

## Branches and PRs: one per issue

- **Each issue gets its own branch and its own PR** — issues are never bundled into a single PR, and no issue is left half-done on a shared branch.
- Branch name: `type/issue-slug` (e.g. `feat/trigger-office-panel`, `fix/camera-lerp`), consistent with the type used in Conventional Commits.
- **Every PR documents in its description** which roadmap issue/milestone it addresses and what changed (already defined in STANDARDS.md).
- Before merging: a review step (can lean on `/code-review` against the diff).

## Integration branch: `sandbox`

`main` is not the direct target for issue PRs. There's a persistent `sandbox` branch between feature branches and `main`:

- **Issue branches PR into `sandbox`**, not `main`. This is where work lands first and gets tried out together.
- **`sandbox` PRs into `main`** only once enough work has accumulated there and it's gone through manual QA — at that point it's promoted with its own PR (`sandbox` → `main`).
- `main` stays production-clean at all times; `sandbox` is where integration risk lives.

## Waves: how agent work gets sequenced

Work for a batch of issues (e.g. those in a milestone) is grouped into **waves** when there are dependencies between them:

- **Wave 1**: issues with no pending dependencies among them — can be tackled right away.
- **Wave 2**: issues that depend on something resolved in wave 1. It doesn't start until that dependency is actually ready (merged, not just "done on a branch").
- And so on. The number of waves depends on how many dependency levels exist in the current milestone/roadmap.
- A wave is a unit of **planning and sequencing**, not of git: PRs are still one per issue, not one per wave.

**At the end of each wave, a summary is delivered**: which issues were completed, which PRs are open/merged, and what's now unblocked for the next wave.

## Git safety rule

**No git command runs without being shown first for explicit confirmation.** This applies always — not just to destructive commands — since this project needs extra care with its history. The flow is: show the exact command → wait for confirmation → only then run it.

## When there's ambiguity

If something isn't defined (a convention, a dependency decision between issues, an issue's scope), it isn't assumed: it's asked before moving forward.
