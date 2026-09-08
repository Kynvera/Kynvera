# KYNVERA Brand System

**Ideas into digital reality.**

This is the source package for Kynvera's visual identity. It is intentionally vector-first and dependency-free so the same system can move into a website, GitHub, social templates, documents, and print.

## Package map

- `brand-guide.md` - usage rules, voice, color, type, applications, and do/don't guidance
- `design-tokens.json` - developer-ready design tokens
- `assets/logo/` - logo variants, animated source, and raster exports
- `assets/icons/` - starter line icon sheet
- `assets/pattern/` - repeatable brand pattern
- `templates/` - editable vector masters for GitHub, social, presentation, and business card use
- `gallery/` - a static visual review board

## Identity anchors

- Wordmark: `KYNVERA`
- Tagline: `Ideas into digital reality.`
- Principle: `Complex ideas. Simple interfaces.`
- GitHub members supplied: `arpan085`, `26diyasubedi`

## Source-of-truth rule

Use the SVG assets as the master artwork. Export PNGs at the required size from these vectors rather than redrawing the mark in another tool. The palette, spacing, and animation timings live in `design-tokens.json`.

## Quick review

Open `gallery/index.html` directly in a browser. It is a static file and does not require a server.

The PNG exports cover the symbol avatar (`kynvera-symbol.png`), favicon (`kynvera-favicon.png`), and primary horizontal lockup (`kynvera-primary.png`). Re-export from the SVG masters when other sizes or print profiles are needed.
