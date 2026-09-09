# KYNVERA Brand Guide

**Ideas into digital reality.**

Version 1.0 · 2026

## 1. Brand Overview

KYNVERA is an independent collaborative technology and creative organization working across software, web applications, automation, AI/ML experimentation, open source, digital publishing, and creative digital experiences.

The identity is built around one idea: two different directions can become one useful system. It should feel intelligent, precise, curious, and quietly ambitious without pretending to be larger than it is.

**Design principle:** Complex ideas. Simple interfaces.

## 2. Brand Story

An idea begins incomplete. Kynvera gives it structure, turns it into an experiment, builds a working version, tests what breaks, and releases what is worth sharing.

`IDEA / EXPLORE / BUILD / TEST / RELEASE`

## 3. Brand Voice

Write directly. Prefer active verbs and specific language.

Use: `We build. We experiment. We publish. We learn. We release.`

Avoid inflated claims, invented metrics, corporate jargon, and language that suggests a large team or established enterprise.

## 4. Logo System

The Kynvera symbol is a modular convergence mark. Two distinct chamfered paths enter from different directions, share a measured center, and resolve into a single forward-facing form. It represents technology and creativity, and the two founders, without literal initials or romantic symbolism.

Official source files:

- `assets/logo/kynvera-primary.svg` - cyan primary lockup
- `assets/logo/kynvera-monochrome.svg` - black lockup
- `assets/logo/kynvera-reverse.svg` - white lockup
- `assets/logo/kynvera-symbol.svg` - standalone symbol
- `assets/logo/kynvera-favicon.svg` - simplified small-size symbol
- `assets/logo/kynvera-stacked.svg` - stacked lockup
- `assets/logo/kynvera-wordmark.svg` - wordmark only
- `assets/logo/kynvera-animated.svg` - 1.6 second draw-and-resolve motion source

The motion source draws the converging paths first and resolves the filled symbol second. Use it for a restrained website intro or loading transition; respect `prefers-reduced-motion`.

### Clear space

Use a clear space equal to the width of one symbol module around the full logo. Never place text, borders, or imagery inside this zone.

### Minimum size

- Symbol: 16 px digital / 6 mm print
- Horizontal lockup: 120 px digital / 32 mm print
- Stacked lockup: 72 px digital / 20 mm print

### Incorrect use

Do not rotate, stretch, outline, add shadows, apply gradients, recolor arbitrarily, redraw the symbol, or place the logo over low-contrast detail.

## 5. Color Palette

The website uses a warm editorial palette: paper and ink establish the page, vermilion marks action and movement, and chartreuse identifies active or experimental states.

| Token | HEX | RGB | HSL | Use |
|---|---|---|---|---|
| Void | `#F3EFE7` | 243, 239, 231 | 38 29% 93% | Primary background |
| Carbon | `#FFFDF8` | 255, 253, 248 | 45 100% 99% | Deep surfaces |
| Graphite | `#E8E0D4` | 232, 224, 212 | 36 30% 87% | Cards, panels |
| Wire | `#C8BCAE` | 200, 188, 174 | 34 20% 73% | Borders, rules |
| Mist | `#6D665E` | 109, 102, 94 | 33 7% 40% | Muted text |
| Cloud | `#171717` | 23, 23, 23 | 0 0% 9% | Primary text |
| Signal | `#E9472F` | 233, 71, 47 | 8 81% 55% | Accent, links, active state |
| Signal Deep | `#BD2B1D` | 189, 43, 29 | 5 73% 43% | Accent on dark surfaces |
| Violet Trace | `#B2D449` | 178, 212, 73 | 75 61% 56% | Active and experimental accent |

Signal is a measured highlight, not a page fill. Violet Trace should appear only in experimental or research contexts.

## 6. Typography

- **Display / interface:** Space Grotesk, fallback `sans-serif`
- **Technical / metadata:** DM Mono, fallback `monospace`

Type hierarchy:

| Role | Size | Weight | Tracking |
|---|---:|---:|---:|
| Display | 72 / 80 px | 650 | -0.03em |
| Section | 44 / 52 px | 650 | -0.025em |
| Card title | 22 / 28 px | 650 | -0.01em |
| Body | 17 / 28 px | 420 | 0 |
| Technical label | 11 / 16 px | 600 | 0.12em |
| Wordmark | custom SVG | - | measured |

At 430 px and below, reduce display to 48 / 54 px and section headings to 32 / 38 px.

## 7. Graphic Language

Use quiet geometry: one-pixel rules, modular frames, sparse nodes, and generous negative space. The Kynvera pattern is built from clipped symbol modules in a 32 px repeat and should sit between 4% and 10% opacity.

Technical labels use this vocabulary:

`KYNVERA / 001` · `BUILD / ACTIVE` · `LAB / EXPERIMENTAL` · `OPEN SOURCE / AVAILABLE`

## 8. Iconography

Use a 24 × 24 viewBox, 1.5 px stroke, round line caps, and chamfered joins. Keep icons structural rather than illustrative. The starter icon sheet is in `assets/icons/kynvera-icons.svg`.

## 9. Applications

### Website

Void background, Cloud type, Signal for links and states, Wire for rules. Keep the symbol visible in navigation, project indexes, and empty states, but never as repeated decoration.

### GitHub

Use the symbol-only mark for the organization avatar. Use the dark banner template in `templates/github-banner.svg`. Repository thumbnails follow `001 / CATEGORY` and a short project name.

### Social

Use one strong statement per frame. Keep the logo in the lower-left safe area, and use Signal only as a rule, index, or small highlight. Templates live in `templates/social-project.svg`.

### Print

Use the monochrome mark where reproduction is uncertain. The presentation cover and business card templates are vector masters, not final production files.

### Merchandise

Prefer one-color screen print: small symbol at the left chest, large pattern or convergence mark on the back. Do not add gradients or tiny technical copy to garments.

## 10. Status Language

- `ACTIVE` - currently maintained or being built
- `BUILDING` - work in progress
- `EXPERIMENTAL` - exploratory, no promise of productization
- `ARCHIVED` - no longer active but kept for reference
- `OPEN SOURCE` - source is publicly available
- `IN DEVELOPMENT` - planned or early-stage work

## 11. Do / Don't

**Do** use space, contrast, precise labels, real project links, and honest descriptions.

**Don't** invent clients, team size, revenue, awards, users, funding, or technical claims. Don't turn the identity into a generic AI or cyberpunk aesthetic.
