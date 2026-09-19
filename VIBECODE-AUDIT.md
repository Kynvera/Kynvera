# VIBECODE AUDIT — Kynvera site

Question: does this site read as generated or as hand-made?
Method: every known AI-design tell, checked against this codebase with file:line,
scored P0 (screams AI) → P1 (smells) → P2 (craft details). Fix IDs (F1–F10) below.
Status legend: CLEAN · PRESENT (fix pending) · FIXED · ACCEPTED (deliberate, declared system)

Sources: slop-detect 27-rule fingerprint, Claude Code "Unslop UI" catalogue (3,033 complaints),
funboy322/avoid-ai-design, 21st.dev, aitoolpick 30-point checklist, thecrit.co, illustration.app audit guide.

## P0 — screams AI on sight

| # | Tell | Verdict | Evidence |
|---|------|---------|----------|
| 1 | Purple/blue/indigo primary (HSL 240–295°) | CLEAN | Accent is gold `--gold #d8b270` (hue ~40). Last cyan `#43d1db` removed. |
| 2 | Inter/Roboto/system font everywhere, no display face | CLEAN | Bodoni Moda editorial + DM Mono + Manrope/HelveticaNow. `src/styles.css:4-8`, `index.html:14-16` |
| 3 | Centered hero + big text + 2 CTAs template | CLEAN | Hero is left-aligned, typewriter H1, 5 pills. `src/App.tsx:435-479` |
| 4 | Gradient headline text (`bg-clip-text`) | CLEAN | All headings solid. No `bg-clip-text` in codebase. |
| 5 | Untouched component library (shadcn zinc, default tokens) | CLEAN | No component library. Custom tokens in `:root`. |
| 6 | Fake stats / avatars / logo clouds | CLEAN | Every number traced: CheapFlix 2400+/18000+/4.8★ (fetched), Ironman ★2, NEPSE ★1. Quotes attributed. No avatar/Testimonial components. |

## P1 — the obvious smell

| # | Tell | Verdict | Evidence → Fix |
|---|------|---------|----------------|
| 7 | One radius on everything (`rounded-xl/2xl` + pill buttons) | PRESENT → F1 | Containers `rounded-xl/2xl` ×12+, every button `rounded-full`. |
| 8 | Icon-topped equal-card grid (capabilities ×5) | PRESENT → F2 | `src/App.tsx:511` `lg:grid-cols-5` identical cards. Biggest layout tell on the page. |
| 9 | Same fade-up reveal on every element | PRESENT → F4 | Single `[data-reveal]` transition, `src/styles.css`. ~20 instances, zero variation. |
| 10 | Aurora blobs (blurred radial backdrops, several surfaces) | PRESENT → F5 | Video overlay blobs + `.site-content::before/::after` ember blobs. Two blob systems = one too many. |
| 11 | Glassmorphism by reflex | PRESENT → F6 | `.studio-nav` pill: `blur(20px) saturate(130%)` on 58% alpha. Reads frosted-glass-kit. |
| 12 | Colored glow on many elements | PRESENT → F7 | `drop-shadow` gold on marks, arcs, meter, kicker. Individually fine, collectively glowy. |
| 13 | Identical section-heading pattern ×8 | PRESENT → F3 | Eyebrow + serif H2 + right-side copy in Studio/Projects/GitHub/People/Notes/Services/Contact. Strongest remaining tell. |
| 14 | Emoji as iconography / sparkle icons | CLEAN | Line-icon SVGs only. `⌕ ↗ ←` are text glyphs, not emoji. |
| 15 | Bento grid / stat banner / 3-tier pricing | CLEAN | None present. Services use editorial rows, not pricing tiers. |
| 16 | Generic CTA copy ("Get Started") | CLEAN | "Send a brief hello", "Start a conversation", "Discuss this". Buzzword grep: 0 hits. |

## P2 — craft details (what humans get right)

| # | Tell | Verdict | Evidence → Fix |
|---|------|---------|----------------|
| 17 | Uniform section rhythm (same padding/width ×N) | PRESENT → F3/F9 | `py-24 sm:py-32 lg:py-40` + `max-w-[1200px]` repeated. NOW strip broke it once — need more. |
| 18 | Touch targets under 44px on mobile | PRESENT → F8 | `.service-row-toggle` 1.7rem ≈ 27px. |
| 19 | Copy passes the competitor-swap test (would still fit a rival) | PRESENT → F9 | Hero description names no place, no people, no number. Footer has no date/place. |
| 20 | Link hovers are plain color swaps | PRESENT → F10 | Ledger/team/case links: color-only transitions. No crafted underline motion. |
| 21 | No stated opinions / anti-list | PRESENT → F9 | Site says what it does, never what it refuses. Humans have boundaries. |
| 22 | Text overflow / misaligned edges / no spacing scale | CLEAN | Checked: `text-wrap: balance/pretty` on headings, single token scale (`--radius-*`, `--max`), tags wrap. |
| 23 | All-caps mono labels everywhere | ACCEPTED | Weight-3 tell, but it is the declared brand voice (brand-guide §7 technical labels). Mitigated by F3 variety around them. |
| 24 | Numbered steps 01–05 | ACCEPTED | It's the real method with per-stage substance + proofs, not a filler template. |
| 25 | Cream/serif "tasteful default" cluster | ACCEPTED (watch) | 2026's new tell is cream+serif itself. Defense: dark-ink (not cream), own gold system, real content, asymmetry (F2/F3). Never drift toward sage-green/cream. |

## Fixes (one by one) — all applied, build clean

- [x] F1 — Radius scale split: `--radius-lg 1rem → 0.65rem` (containers go sharp-editorial), pills stay 999px (buttons only).
- [x] F2 — Capabilities asymmetry: 6-col grid, first two cards span 3, rest span 2. Decision, not a grid.
- [x] F3 — Heading variety: Lab → compact ruled row with thread count; Projects → inline lede, side copy removed; Notes → stacked. Studio/People keep the classic treatment.
- [x] F4 — Reveal variation: `--reveal-delay` stagger on capability (70ms), ledger (60ms), team (90ms) maps.
- [x] F5 — Killed content ember blobs (single cinematic hero moment remains).
- [x] F6 — Nav: solid 92% + 12px blur (premium, not frosted).
- [x] F7 — Glow diet: project-mark drop-shadow 14px→5px whisper; arc + meter kept as the two moments.
- [x] F8 — Toggle 27px → 40px.
- [x] F9 — Voice: hero names Kathmandu + two people; footer "TENDED SEP 2026 · 27.71°N, 85.32°E"; contact anti-list ("No decks. No account managers. No promises before discovery.").
- [x] F10 — Underline-sweep hover on editorial links (ledger / team / cases / services / method).

Verdict: P0 6/6 clean · P1 7 fixed + 3 clean · P2 5 fixed + 2 clean + 3 accepted-by-system.
The remaining "tells" on site (mono labels, numbered method, dark+gold) are the declared
system in `design-tokens.json` + brand-guide §7 — a site honoring its own system scores
Aligned, never slop.

Rule going forward (from the research): borrow composition, write content. The claim, the numbers,
the names — those are what no model can supply, and this site now has them everywhere.
