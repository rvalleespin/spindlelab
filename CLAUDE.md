# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo actually is

This is **not a software project** — it is the operations repository for **SpindleLab**, a solo consultancy (SEO técnico + visibilidad en motores de IA / AEO/GEO) run by Ramón Vallejos Espíndola for Chilean B2B and YMYL companies. It holds three distinct things:

- **`spindlelab-site/`** — the public marketing website (static HTML, deployed to Cloudflare Pages).
- **`marketing/`** — the brand system, 90-day strategy, content production (LinkedIn/Instagram), cold-outbound material, and cross-session coordination docs.
- **`ventas/`** — sales pipeline (`pipeline.md`) and delivered-project tracking (`proyectos-en-curso.md` — deliberately a separate document: pipeline tracks a prospect until won/lost, proyectos-en-curso tracks delivery phases of an already-won project). The "Desarrollo Web" client-site work itself (e.g. Bernardo Combeau's site) is reported to live in a sibling repo, not here.

Most work is **content and marketing operations**, not coding. `contexto-agente-spindlelab.md` at the root is the founding brief; read it plus `marketing/brand/manual-de-marca.md` before producing anything public. `marketing/estrategia-marketing-spindlelab.md` is the strategy itself — §8 defines the day-30/45/60 decision checkpoints and kill-criteria for paid channels; `marketing/como-ejecutar.md` is the original operating manual and explains the `marketing/` subfolder conventions (`listas/`, `outbound/semana-XX/`, `diagnosticos/`, `metricas/`, `articulos/`).

## Architecture: a trunk session + specialized persona sessions, running in different environments

The defining structure here is that **multiple Claude Code sessions work on this repo in parallel, in genuinely different environments**, each playing a role defined by a skill in `.claude/skills/`:

- `agente-troncal-marketing` — the trunk/coordinator. The **only** session meant to write the shared tracking docs (`marketing/plan-operativo-90-dias.md`, `ventas/pipeline.md`, the outbound trackers). Runs in the cloud (Claude Code Remote).
- `persona-social-media`, `persona-director-creativo` — LinkedIn/Instagram content and visual production (carousels, Reels, Stories, banners).
- `persona-paid-media` (Google Ads) / `persona-meta-ads` (Meta Ads) — paid channels. Browser access differs per session/environment (see below) — never assume one has it just because another does.
- `persona-disenador-web` — `spindlelab-site/` and client web-dev delivery.
- `mini-diagnostico` — generates the 1-page SEO/AI-visibility audit promised to prospects within 48h.
- `buscar-leads`, `agente-outbound`, `agente-crm` — recurring task workflows (lead sourcing, outbound sequencing, pipeline updates).

The full org chart of these agents (who does what, their working folder, memory, and open vacancies) is in **`marketing/oficina/organigrama-oficina.md`**; per-agent memory lives in `marketing/oficina/memoria/`.

### Skills live in TWO places — and that bites (jul 23)

Every skill is duplicated: the versioned copy in `.claude/skills/` (this repo) **and** a copy in `~/.claude/skills/` (global, local-Mac-session only). Consequences, learned the hard way:

- **Repo-only skills are invisible outside this folder.** A skill that exists only in `.claude/skills/` won't show up in a session started anywhere else — this is why `/persona-director-creativo` seemed to "disappear" for one session.
- **The two copies silently diverge.** On 23 jul the global copies of `persona-social-media` and `persona-disenador-web` still carried *superseded rules* (e.g. "the personal profile never shares page posts", reversed on 21 jul). **The repo copy (`.claude/skills/`) is the source of truth** — if a local session's behavior contradicts what's documented here, re-copy repo → global rather than trusting the global copy.
- **Skills are scanned once, at session startup.** A skill created or copied while a session is open will not appear in it — `/clear` does not rescan; a fresh session is needed.

**This is not one working tree shared by everyone** — some of these sessions run as local Claude Code CLI sessions on Ramón's Mac (in git worktrees under his iCloud Drive folder, with real browser access via a Chrome extension), others run as Claude Code Remote cloud sessions (like the trunk, no local filesystem, no browser by default). Treat any environment-specific instruction below as scoped to that kind of session, not universal — e.g. a browser-extension connection that works interactively in a local session does not survive a headless/backgrounded re-invocation of that same session, and cloud sessions can't be "given" that browser connection just by copying instructions.

**Coordination happens through committed files, not shared memory:**
- **`marketing/encargos-otras-sesiones/`** — tasks or reports handed from one session to another (e.g. a paid-media review the trunk needs to reconcile). If your work was requested by or is meant for another session, look here first.
- **`marketing/plan-operativo-90-dias.md`** — the week-by-week plan (`[x]`/`[~]`/`[ ]`, `[CC]` vs `[TÚ]` per task). Specialized sessions report progress via a handoff document; only the trunk edits this file directly, and only after verifying the report (see next point).
- **Never accept another session's "ya está hecho" without verifying it.** This protocol exists because of a real incident (17-20 jul): two sessions edited the plan and an outbound tracker in parallel without syncing, producing a contradictory record about which LinkedIn account a post went out on. If a claim rests on a commit, read the actual diff (`git show`/`git log`), not just the message; if it rests on external state (a live site, an ad account, a social post), ask for a screenshot or other verifiable evidence before recording it as fact.
- Before editing a shared tracking doc, sync first: `git fetch origin main && git diff origin/main HEAD -- marketing/plan-operativo-90-dias.md ventas/pipeline.md`.

## Git workflow

- Feature branches are named `claude/<description>`. **Use `merge_method: "merge"` when merging a PR, not squash** — squashing has repeatedly broken git ancestry here and caused spurious "added in both" conflicts on later PRs touching the same files.
- Never merge a PR without the user explicitly confirming in that same turn.
- Sessions have lost work to unpushed local commits before (a branch or commit another session references may not actually be on `origin` — verify with `git ls-remote`/the GitHub API rather than assuming, especially if a `git fetch` for it comes back empty).
- **Local Mac sessions specifically** have hit `git push` failing from their Bash tool (Keychain credential unreachable) — GitHub Desktop or the user's own terminal (with his credentials) works there instead. This is not a general repo rule; a cloud session's Bash `git push` works normally.

## Commands

There is **no build, lint, or test suite** — `spindlelab-site/` is hand-written static HTML with inline/linked CSS, no framework, no package.json.

- **Preview the site locally:** serve the folder with any static server, e.g. `python3 -m http.server --directory spindlelab-site 8000`.
- **Verify a visual/site change before calling it done:** render with headless Chromium rather than trusting the markup by eye.
  - In this cloud environment: `find /opt/pw-browsers -iname "chrome"` to locate the binary, then run with `--headless --no-sandbox --disable-gpu --screenshot=...`.
  - In a local Mac session: the real Chrome binary works the same way (`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome --headless=new --disable-gpu --screenshot=...`).
- **Render a brand/social asset (HTML → PNG)** — the production pipeline for carousels, Reels, Stories, banners: each asset lives in its own folder with `Gabarito.woff2` + `inter.woff2` copied alongside and referenced relatively, then screenshotted at 1080×1080 (feed) or 1080×1920 (Reel/Story). Add a transparent background flag for overlay assets and verify the output actually has an alpha channel.
- Video b-roll is generated via the Higgsfield MCP; there's no local video compositor, so text overlays are delivered as separate transparent PNGs for assembly in CapCut rather than baked into the clip.
- **Deploy** is Cloudflare Pages connected to this repo's `main` branch — pushing to `main` is what ships the site.

## The public site (`spindlelab-site/`)

- One HTML file per route, Spanish (es-CL). `_headers` sets cache policy (fonts/images cached hard and long).
- **Cache-poisoning trap:** because assets are cached aggressively, overwriting a CSS/image/favicon at the same path needs a bumped version query string (`?v=N`) on every reference, or visitors and even your own checks can keep seeing the stale asset.
- Blog posts need the same `@graph` JSON-LD (Article + BreadcrumbList + FAQPage, fixed author `#autor-ramon`) and meta-tag structure as existing posts, and publishing one updates three places: the new file, the card in `blog/index.html`, and `sitemap.xml`. Full detail in `.claude/skills/persona-disenador-web/SKILL.md`.

## Brand & content rules (non-negotiable)

Source of truth: `marketing/brand/manual-de-marca.md`. Rules easy to get wrong:

- **Voice:** first-person singular for observational claims ("le pregunté a ChatGPT", "revisé el sitio"); first-person plural for what the business delivers ("entregamos"). The personal LinkedIn account is always singular.
- **Gold accent (`#C9A227`) is scarce:** exactly one gold use per visual piece (usually the wordmark's final dot). Never in body text, bullets, or backgrounds.
- **Typography:** Gabarito (headlines/wordmark), Inter (body).
- **Zero fabricated social proof.** Content is built only from real audit findings (`marketing/outbound/semana-*/lote-*.md`); prospect companies are generalized, never named without explicit permission.
- **No em-dash used as an impact crutch** — the most common AI-writing tell, and specifically flagged as such in this project's own tone rules.
- Everything public gets a human review pass before publishing — nothing generated is sent or posted straight from a draft.

## `.gitignore` note

`.claude/*` is ignored **except `.claude/skills/`** (skills are versioned and shared across sessions/environments on purpose). A few personal/local files (`COTIZACIONES/`, `LOGOS/`, some personal notes) are also ignored.
