# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo actually is

This is **not a software project** — it is the operations repository for **SpindleLab**, a solo consultancy (SEO técnico + visibilidad en motores de IA / AEO/GEO) run by Ramón for Chilean B2B and YMYL companies. It holds three distinct things:

- **`spindlelab-site/`** — the public marketing website (static HTML, deployed to Cloudflare Pages).
- **`marketing/`** — the brand system, 90-day strategy, content production (LinkedIn/Instagram), cold-outbound material, and cross-session coordination docs.
- **`ventas/`** — sales pipeline and client-delivery playbooks (the separate "Desarrollo Web" service line; the actual client site code lives in a sibling repo `PORTAFOLIO/`, not here).

Most work is **content and marketing operations**, not coding. The `contexto-agente-spindlelab.md` at the root is the founding brief; read it plus `marketing/brand/manual-de-marca.md` before producing anything public.

## Multiple Claude Code sessions share this working tree

Several Claude Code sessions run in parallel against the same local checkout, each playing a **role defined by a skill** in `.claude/skills/`:

- `agente-troncal-marketing` — the trunk/coordinator session.
- `persona-social-media`, `persona-paid-media`, `persona-meta-ads`, `persona-disenador-web` — role personas (each encodes hard-won conventions; **read the whole skill before acting in that role**).
- `mini-diagnostico`, `buscar-leads` — recurring task workflows.

Coordination happens through files, not chat:
- **`marketing/encargos-otras-sesiones/`** — tasks handed from one session to another. If your work was requested by another session, the brief is here.
- **`marketing/plan-operativo-90-dias.md`** — the tracked week-by-week plan (`[x]`/`[~]`/`[ ]` per task, dated). Report finished work back here / via a handoff file so the trunk can register it.
- Because sessions share the tree, **`git fetch` and check `git status` / `git stash list` before assuming state** — another session may have committed or moved things since you last looked.

## Git workflow (important, non-obvious)

- **`git push` does not work from the Bash tool** in this environment (Keychain credential unreachable). Do not retry it — walk Ramón through **GitHub Desktop** instead (he has it installed, signed in as `rvalleespin`).
- **GitHub Desktop auto-stashes everything (tracked + untracked) when switching branches.** Untracked files "vanish from disk" but are recoverable: check `git stash list`, then `git stash apply` (not `pop`, so the stash survives a redo). A stale `stash@{0}: On main: !!GitHub_Desktop<main>` currently holds old cruft (`bernardo-site/`, `RRSS/`) — **do not pop it**, it would re-add folders that were intentionally removed.
- **Verify `git diff --cached --stat` right before any commit** — the index can already hold unrelated staged changes from before your session (deleted files, other sessions' work).
- Direct-to-`main` pushes are this repo's actual norm (per commit history), not PR review, unless Ramón asks for a review step. Marketing work historically lived on `claude/spindlelab-marketing-strategy-v98w8h` but is periodically merged to `main`.

## Environment gotchas (this checkout lives in iCloud Drive)

- The repo path is under `~/Library/Mobile Documents/com~apple~CloudDocs/` (iCloud Drive). This causes real problems:
  - **The Browser-pane preview/dev-server tools cannot read files here** (`Operation not permitted`). Use plain `python3 -m http.server` via Bash for local serving; the in-app preview will fail on iCloud paths.
  - The browser `file_upload` tool only accepts files the browser session already shares — a locally-generated file at an iCloud path is rejected. Uploads to sites (e.g. a Facebook cover) must be done by Ramón, or the file attached to chat first.
  - iCloud "Optimize Mac Storage" can evict file contents to `dataless` stubs; `brctl download <path>` or simply reading the file re-materializes it.
  - iCloud sync also creates conflict duplicates named `"<name> 2.ext"` / `"<dir> 2/"` (visible throughout, e.g. `spindlelab-site/blog 2/`, `README 2.md`). These are junk, not intentional variants — ignore them and clean up when safe.
- `gh` CLI is not installed. Clone/fetch with plain `git` + the HTTPS URL.

## Commands

There is **no build, lint, or test suite** — the site is hand-written static HTML with inline/linked CSS, no framework, no build step.

- **Preview the public site locally** (config in `.claude/launch.json`):
  ```
  python3 -m http.server --directory spindlelab-site 8000
  ```
- **Render a brand/social asset (HTML → PNG)** — the standard production pipeline for carousels, Reels, Stories, banners. Each asset lives in its own folder with `Gabarito.woff2` + `inter.woff2` copied in and referenced relatively:
  ```
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 --window-size=1080,1920 \
    --screenshot="<abs-path>/out.png" "file://<abs-path>/in.html"
  ```
  Feed sizes: 1080×1080 (carousel/feed), 1080×1920 (Reel/Story). Add `--default-background-color=00000000` for **transparent overlays** (verify alpha: PNG color-type byte should be 6).
- Video b-roll for Reels is generated via the Higgsfield MCP; there is **no `ffmpeg`** locally, so text cannot be composited onto video here — deliver clips + transparent text overlays for the user to assemble in CapCut.

## The public site (`spindlelab-site/`)

- Single-file HTML pages (`index.html` per route), Spanish (es-CL), deployed by drag-and-drop / Git to Cloudflare Pages. `_headers` sets the cache policy.
- **Cache-poisoning trap:** assets served `immutable` (fonts) or long-lived are cached hard by the CDN/browser. When you overwrite `style.css`, `favicon.svg`, `og.jpg`, or an image at the same path, bump a version query string (`?v=N`) on every reference, and after a deploy wait ~20-30s before first-checking a freshly versioned URL (a CDN node in transition can "burn" a `?v=N`; go to `?v=N+1`, don't retry the same).
- Blog-post structure and the required JSON-LD (`@graph`: Article + BreadcrumbList + FAQPage, fixed author `#autor-ramon`), meta-tag rules, and "publishing a post updates three places (the file, `blog/index.html`, `sitemap.xml`)" are all specified in the `persona-disenador-web` skill — follow it for any site edit.

## Brand & content rules (non-negotiable)

Source of truth: `marketing/brand/manual-de-marca.md` (currently v1.3). The persona skills restate the operational parts. Key rules that are easy to get wrong:

- **Voice:** first-person **singular** for observational/evidential claims ("le pregunté a ChatGPT", "revisé el sitio"); first-person **plural** for what the business delivers ("entregamos", "lo revisamos"). Personal LinkedIn account is always singular.
- **Gold accent (`#C9A227`) is scarce:** exactly **one** gold use per visual piece (usually the wordmark's final dot). Never gold in body text, bullets, or backgrounds.
- **Typography:** Gabarito (headlines/wordmark), Inter (body). Wordmark is `SpindleLab.` with the final dot always gold.
- **Zero fabricated social proof** — no invented client counts, testimonials, stats, or case studies. Content is built only from *real* audit findings (see `marketing/outbound/semana-*/lote-*.md`), and prospect companies are **generalized, never named** without explicit permission.
- **Everything public gets a human review pass before publishing** — the brand sells expert judgment; AI-smelling copy is anti-credibility here. No em-dash used as an impact crutch (the most common tell).

## `.gitignore` note

`.claude/*` is ignored **except `.claude/skills/`** (skills are versioned and shared across sessions). `COTIZACIONES/`, `LOGOS/`, and a couple of personal notes are also ignored. A new `CLAUDE.md` at the root is tracked normally.
