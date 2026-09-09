# Kynvera Website Explanation

Version: 1.0
Last reviewed: 2026

## 1. Project Summary

Kynvera is an independent technology and creative studio website. Its central message is:

> Ideas into digital reality.

The website presents Kynvera as a small collaborative practice that turns ideas into useful software, experiments, digital experiences, open-source work, and creative publishing.

The design principle is:

> Complex ideas. Simple interfaces.

The site is intentionally honest and restrained. It does not claim to be a large agency, does not invent clients or metrics, and describes projects according to their current status.

## 2. Technology Stack

- React 19 for the interface and component rendering.
- TypeScript for typed application code.
- Vite for local development and production bundling.
- CSS in `src/styles.css` for the complete visual system and responsive layout.
- Google Fonts loaded from CSS: Manrope and JetBrains Mono.
- No UI framework or icon package is currently used.
- GitHub's public REST API is used for the repository list.
- The project requires Node.js 20.19 or newer.

Available commands from `package.json`:

- `npm run dev` starts the Vite development server.
- `npm run build` runs the TypeScript build and creates the Vite production build.
- `npm run preview` serves the production build locally.

## 3. HTML Entry Point: `index.html`

`index.html` is the browser entry document for the Vite application.

It provides:

- HTML5 document structure.
- `lang="en"` for language and accessibility metadata.
- Responsive viewport configuration.
- Dark theme color for browser UI.
- Page title: `Kynvera - Ideas into Digital Reality`.
- Search and social description metadata.
- Open Graph title, description, type, and symbol image.
- Twitter summary-card metadata.
- Link to `/site.webmanifest` for installable web-app metadata.
- SVG favicon at `/assets/logo/kynvera-favicon.svg`.
- A single `<div id="root">` mount point.
- The Vite module entry `/src/main.tsx`.

The page content is not hard-coded in `index.html`. React mounts into `#root` and renders the complete website through `src/App.tsx`.

## 4. React Entry Point: `src/main.tsx`

`src/main.tsx`:

1. Imports React's `StrictMode`.
2. Imports `createRoot` from `react-dom/client`.
3. Imports the main `App` component.
4. Imports the global stylesheet.
5. Renders `<App />` into the element with id `root`.

Strict Mode is enabled during development to expose unsafe React patterns early.

## 5. Main Application: `src/App.tsx`

`App.tsx` owns the page content, data arrays, interactive state, remote GitHub loading, and modal behavior.

### Local content models

- `Project` describes project index, name, category, description, technologies, problem, solution, status, optional source URL, optional demo URL, and featured state.
- `GithubRepo` describes the GitHub API fields displayed by the repository panel.

### Content collections

- `projects` contains three featured projects:
  - CheapFlix Nepal.
  - Nepal Administrative Intelligence System.
  - Creative / Poetry Platform.
- `capabilities` contains five work areas:
  - Software.
  - AI & ML.
  - Web.
  - Creative Technology.
  - Open Source.
- `process` contains the five-step working method:
  - Discover.
  - Explore.
  - Build.
  - Test.
  - Release.
- `labs` contains three experiment and prototype entries with statuses.

### Reusable local components

- `SectionLabel` creates the numbered technical section labels used throughout the page.
- `Arrow` creates the small diagonal arrow used on links and action controls.

### Application state

- `menuOpen` controls the mobile navigation drawer.
- `theme` stores either `dark` or `light` mode.
- `selectedProject` stores the project currently open in the details modal.
- `repos` stores repositories returned by GitHub.
- `githubState` tracks `loading`, `ready`, or `fallback` display state.

### Effects and behavior

- The saved theme is read from `localStorage` using the key `kynvera-theme`.
- The selected theme is applied to `document.documentElement.dataset.theme`.
- Theme changes are persisted to local storage.
- Elements marked with `data-reveal` animate into view through `IntersectionObserver`.
- The GitHub organization endpoint is requested with an `AbortController`:
  `https://api.github.com/orgs/Kynvera/repos?sort=updated&per_page=4`
- Failed GitHub requests fall back to member links for `arpan085` and `26diyasubedi`.
- The project modal locks body scrolling while open.
- The Escape key closes the project modal.
- Clicking the modal backdrop closes the modal; clicking inside the dialog does not.
- Logo choice changes with theme. Dark mode uses the cyan primary logo and light mode uses the monochrome logo.
- The newsletter signup validates email and consent, then uses `VITE_NEWSLETTER_ENDPOINT` or opens the configured `VITE_SUBSTACK_URL` subscription page.
- Service CTAs dispatch a local selection event so the contact form can pre-fill the chosen project type.
- The search command palette indexes projects, capabilities, lab entries, and process steps using Lunr. It opens from the header or `Ctrl+K`/`Cmd+K`, supports arrow-key navigation, Enter selection, and Escape close.
- The case-study section presents the three existing projects as questions, directions, current states, and technologies. Its selectable progress rail uses animation to show the relationship between the selected project and Kynvera's IDEA / BUILD / TEST / RELEASE method.
- The notes section indexes five draft working notes about Kynvera's existing projects and method. Entries expand in place and are labeled `DRAFT NOTE` until approved source material is ready for publication.
- The process section is an interactive tabbed visualization. Selecting Discover, Explore, Build, Test, or Release updates the detail panel and animated stage marker; the same exported process data is reused by site search.
- Founder profiles now separate each person's documented focus from their contribution to Kynvera, without adding unverified biography, credentials, clients, or personal claims.
- The About section now also explains what matters, how Kynvera moves from discovery through release, and the independent / collaborative / curious posture already defined by the brand system.
- Lab entries use native expandable disclosures to explain why each experiment exists while retaining honest ACTIVE, EXPERIMENTAL, and ARCHIVED status language.
- The newsletter area includes two expandable issue outlines in `src/components/NewsletterIssues.tsx`. They are labeled draft outlines and do not claim external publication until `VITE_NEWSLETTER_ENDPOINT` or `VITE_SUBSTACK_URL` is configured.
- The Field Guide section provides a print-ready resource with a `Print / save as PDF` action. It uses the browser print dialog rather than adding a PDF-generation dependency.
- The project index supports category filtering and a two-project comparison tray. Comparison keeps the existing project modal intact and shows selected status, category, and technology information side by side.
- A related-project navigator continues below the project index and reuses the existing project modal, so visitors can move between the three verified project directions without duplicated project data.
- The sticky header includes a scroll-progress line that communicates position through the long single-page experience. Opening a project records the opener and restores focus when the modal closes.
- The Field Guide includes native sharing: browsers with Web Share use the system share sheet, while other browsers copy the current URL to the clipboard and report the result accessibly.
- Project dialogs now move focus inside on open, trap Tab navigation, close with Escape, restore focus to the opener, and expose a visible focus outline. GitHub link clicks emit the standard `github_click` analytics event when analytics is configured.
- The page includes a keyboard skip link, shared `:focus-visible` treatment, and a GitHub repository loading skeleton. Newsletter handoff messaging distinguishes a provider-confirmed signup from opening an external Substack page.

## 6. Page Structure and Sections

The page is a single scrolling document. The sticky header links to the main anchors.

### Header and navigation

- Sticky Kynvera brand lockup.
- Desktop links to Projects, What we build, About, and GitHub.
- Dark/light theme toggle.
- Desktop Explore projects call to action.
- Mobile menu button and expandable mobile navigation.

### Hero: Intro

The hero introduces Kynvera with the headline `Ideas into digital reality.` It includes the studio description, project and GitHub calls to action, technical metadata, and a visual process diagram.

The diagram communicates IDEA, BUILD, TEST, and LAUNCH around the Kynvera symbol. It uses orbit animation, connecting lines, a central symbol, and status metadata.

### Manifesto: The starting point

This section explains that Kynvera begins with problems, experiments, and creative ideas, then turns them into things people can use.

### What we build

A five-column capability index presents the studio's main areas of work. Each capability includes an explanatory sentence and small technical tags.

### Projects: Things we've built

A three-card project index presents projects with category, status, description, technology tags, and a View project action. Each card opens a modal with:

- Project name and category.
- Status.
- Description.
- The problem.
- The direction or solution.
- Technology tags.
- Placeholder or available source/demo actions.

The current projects do not yet have source or demo URLs, so their modal actions show pending states.

The project tools are intentionally lightweight: filters use the existing category data, and comparison is capped at two projects so the result remains readable on desktop and mobile.

The remaining work is organized into two parts: Part 1 finishes UX, accessibility, interaction states, responsive behavior, and loading/performance polish; Part 2 covers production SEO, deployment readiness, content growth, and marketing operations. Related-project navigation is the first Part 1 item completed in this split.

### Case studies: Why these things exist

The case-study section adds context without inventing users, outcomes, metrics, or testimonials. It reuses the verified project descriptions and technologies already present in the app, then lets visitors select a project to inspect its guiding question, direction, current state, and technology tags.

### Notes: Thinking in public

The notes section is implemented in `src/components/BlogSection.tsx`. It provides an article-shaped content system without claiming that unpublished ideas are finished blog posts. Each note has a title, summary, category, draft status, and short source-grounded body. The notes are also included in the Lunr site search.

### GitHub: Built in public

This section explains the open-source/public layer of the studio. It displays up to four recently updated Kynvera organization repositories when the GitHub request succeeds.

Each repository row can show:

- Repository name.
- Description.
- Primary language.
- Star count.
- Fork count.

When the API is unavailable, the panel shows the two known member accounts instead.

### Process: How we work

The process track visualizes Discover, Explore, Build, Test, and Release. Each stage is a keyboard-accessible tab. Selecting a stage updates the explanation below it and moves the progress marker. Desktop uses a horizontal timeline; mobile changes it to a vertical list. The component is implemented in `src/components/ProcessSection.tsx`.

### About: Why Kynvera?

This section describes Kynvera as a collaborative space for two people who enjoy building, experimenting, creating, and learning together.

The duality panel places Technology and Creative on opposite sides of the Kynvera symbol. Technology lists Python, Backend, AI / ML, Automation, and Systems. Creative lists Writing, Digital publishing, Visual storytelling, Web experiences, and Ideas. A supporting detail grid explains the preference for useful, interesting, and beautiful work, the Discover / Explore / Build / Test / Release loop, and the studio's independent, collaborative, curious posture.

### Founders: The people behind Kynvera

Two expanded founder profiles introduce:

- Arpan, Developer: focuses on Python, backend development, automation, and learning AI/ML through practical projects; contributes working technical systems.
- Diya, Writer & Creative Contributor: focuses on poetry, writing, creative expression, and digital publishing; contributes creative direction and point of view.

Each card links to the relevant GitHub profile.

### Lab: Not everything becomes a product

The lab presents small experiments, prototypes, and archived ideas. Status language is deliberately clear: ACTIVE, EXPERIMENTAL, and ARCHIVED.

### Philosophy: The loop

The large statement `Build. Break. Learn. Build again.` summarizes the studio's iterative method. The oversized KYNVERA word in the background is a quiet graphic layer, not interactive content.

### Contact: The next idea

The contact section invites interesting problems and unusual ideas. It now includes an accessible contact form for name, email, company, project type, budget, timeline, message, and privacy consent.

The form validates fields on blur, disables submission until required values are valid, includes a honeypot field for spam prevention, and submits through FormSubmit when `VITE_CONTACT_EMAIL` is configured. Without that environment variable, it reports that the contact email is not configured instead of claiming the message was sent. GitHub remains available as an alternate contact action.

### Footer

The footer contains the theme-aware logo, tagline, page links, copyright year, and the descriptors `INDEPENDENT / COLLABORATIVE / CURIOUS`.

The newsletter signup appears immediately before the footer and remains visibly unconfigured until a newsletter endpoint or publication URL is provided.

The dispatch section before the signup contains two prepared issue directions: an introduction to Kynvera's method and a project-focused note about turning questions into concrete systems. It intentionally avoids publication dates, subscriber numbers, or delivery claims.

The Field Guide is a compact summary of the Kynvera method. Its print stylesheet isolates the guide so visitors can choose the browser's Save as PDF option without exporting the rest of the site.

The guide's share action uses browser capabilities only and does not add a social SDK or expose a third-party integration.

Analytics is optional and privacy-focused. When `VITE_FATHOM_SITE_ID` is set, the app loads Fathom and tracks page views plus `form_submit`, `newsletter_signup`, and `project_clicked` events. Without the ID, no analytics script is injected.

### Services: How we work together

The services section presents six collaboration options with starting price ranges, typical timelines, descriptions, expandable inclusion lists, example work, and a contact CTA:

- Custom Software Development.
- AI / ML Consulting & Development.
- Front-End / UI Development.
- Workshops & Training.
- Code Audit & Optimization.
- Open-Source Support.

The section is implemented as `src/components/ServicesSection.tsx` and uses the existing single-page `#contact` destination rather than a separate route. The pricing note explains that the ranges are starting points and that final scope depends on the problem and first useful version.

Service CTA values match the full project-type options in `ContactForm.tsx`, so selecting a service correctly pre-fills the contact form.

Testimonials are intentionally not fabricated. The repository contains no verified client, user, contributor, or workshop quotes, so the social-proof section remains deferred until attributable permission and source material are collected.

## 7. Styling System: `src/styles.css`

The stylesheet contains the full visual language and responsive implementation.

### Fonts

- Manrope is the main display and interface typeface.
- JetBrains Mono is used for metadata, labels, statuses, tags, and technical navigation.
- Fonts are imported from Google Fonts at the top of the stylesheet.

### CSS variables

Dark mode is the default:

- `--void`: `#0B0E11`, primary background.
- `--carbon`: `#12171C`, deep surface color.
- `--graphite`: `#1B232A`, elevated surface and card color.
- `--wire`: `#2A353E`, borders and rules.
- `--mist`: `#A8B4BD`, secondary text.
- `--cloud`: `#EEF3F5`, primary text.
- `--signal`: `#55D6E8`, active accent, links, and status.
- `--signal-deep`: `#1596AD`, deeper accent used for light mode.
- `--violet`: `#8E86D8`, optional experimental accent.
- `--ease`: `cubic-bezier(.22,1,.36,1)`, the primary motion easing.

Light mode changes the surface, text, and accent values through `:root[data-theme='light']`.

### Layout language

- Content is constrained to a maximum width of 1280px.
- Sections use fluid horizontal gutters.
- One-pixel borders and rules create a technical grid.
- The fixed `.grid-field` adds a low-opacity background grid.
- Cards use sharp or nearly sharp corners, consistent with the brand guide.
- Cyan is used as a measured signal rather than a dominant page fill.

The visual audit identified risks of generic, AI-generated presentation: too many repeated cards, generic studio phrases, and technical decoration that does not communicate information. The current direction addresses those risks by keeping brand-specific project names and founder context, avoiding fabricated social proof, using the case-study rail as meaningful interaction, and limiting new motion to state changes that explain the work.

### Motion

- Section content fades and rises when it enters the viewport.
- Hero orbit rings rotate continuously.
- Process steps enter with staggered delays.
- Buttons and cards lift slightly on hover.
- The project modal fades and scales into view.
- The case-study progress marker moves to the selected project's stage using a purposeful state transition.
- Opening a working note reveals its content with a short editorial transition; reduced motion removes the animation.
- The header scroll-progress line updates during scrolling and disables its transition under reduced motion.
- `prefers-reduced-motion: reduce` disables or simplifies these animations.

### Responsive behavior

At widths below 980px:

- Desktop navigation and header CTA are replaced by a mobile menu.
- The hero becomes one column.
- Capability cards use two columns.
- GitHub and About sections become single-column layouts.
- Footer content changes to a two-column arrangement.

At widths below 620px:

- Site gutters reduce to 16px.
- Header and logo become smaller.
- Buttons become full width.
- Hero system diagram reduces in height and orbit size.
- Capability, project, and lab grids become one column.
- The process timeline becomes vertical.
- The Technology/Creative duality panel stacks vertically.
- Founder cards become one column.
- Modal content columns stack through the mobile rules later in the stylesheet.

## 8. Brand Assets

The `assets/` directory is the source asset collection. SVG files are the master artwork and should be preferred for new sizes and placements.

### Logo assets: `assets/logo/`

- `kynvera-primary.svg`: primary cyan horizontal lockup for dark surfaces.
- `kynvera-reverse.svg`: white/reverse horizontal lockup for dark or high-contrast contexts.
- `kynvera-monochrome.svg`: black monochrome lockup for light surfaces and print.
- `kynvera-wordmark.svg`: wordmark-only version.
- `kynvera-stacked.svg`: stacked logo arrangement.
- `kynvera-symbol.svg`: standalone convergence symbol.
- `kynvera-favicon.svg`: simplified symbol optimized for small browser sizes.
- `kynvera-animated.svg`: animated draw-and-resolve source logo.
- `kynvera-primary.png`: raster export of the primary horizontal lockup.
- `kynvera-symbol.png`: raster export of the symbol avatar.
- `kynvera-favicon.png`: raster favicon export.

The live website uses the primary logo, monochrome logo, reverse logo, and symbol SVG files. The PNG exports are useful for social, avatar, or systems that do not support SVG.

Logo rules:

- Use SVG masters whenever possible.
- Keep clear space equal to one symbol module.
- Do not stretch, rotate, outline, arbitrarily recolor, or add gradients/shadows to the logo.
- Minimum digital size is 16px for the symbol and 120px for the horizontal lockup.

### Icon asset: `assets/icons/`

- `kynvera-icons.svg`: starter structural line-icon sheet.
- Intended style is a 24 by 24 viewBox, 1.5px stroke, round caps, and chamfered joins.
- The current site mostly uses text and the CSS/HTML arrow glyph instead of this sheet.

### Pattern asset: `assets/pattern/`

- `kynvera-pattern.svg`: repeatable clipped-symbol brand pattern.
- Intended for subtle backgrounds, banners, and brand review layouts.
- The gallery uses it in the review-board header.
- Recommended opacity is 4% to 10% in normal brand applications.

## 9. Brand System Files

### `brand-guide.md`

The human brand guide defines the brand story, voice, logo rules, color palette, type hierarchy, graphic language, iconography, applications, status vocabulary, and do/don't rules.

### `design-tokens.json`

The machine-readable token source defines brand colors, typography, layout sizes, shape values, motion timing, and logo/icon sizing. It should be updated when the design system changes so implementation and brand documentation remain aligned.

### `gallery/index.html`

The gallery is a static visual review board. It can be opened directly in a browser without a development server. It displays:

- Logo family samples.
- Color swatches.
- Typography examples.
- GitHub, social, business card, and presentation templates.

The gallery is separate from the React website and is useful for reviewing brand assets before using them in the app.

## 10. Templates

The `templates/` directory contains editable SVG masters for common brand applications:

- `github-banner.svg`: GitHub banner artwork.
- `social-project.svg`: social project artwork.
- `business-card.svg`: business card artwork.
- `presentation-cover.svg`: presentation cover artwork.

These are source templates, not necessarily final production exports.

## 11. Public Web-App Files

### `public/site.webmanifest`

Defines the installable web-app identity:

- Name and short name: Kynvera.
- Description: Ideas into digital reality.
- Start URL: `/`.
- Standalone display mode.
- Void background and theme colors.
- SVG favicon as the app icon.

### `public/robots.txt`

Controls crawler instructions for the deployed site. Keep it aligned with the intended production domain and indexing policy.

## 12. Accessibility and User Experience

Current accessibility features include:

- Semantic `header`, `nav`, `main`, `section`, `article`, and `footer` elements.
- Descriptive image alt text for visible logos.
- Hidden decorative imagery marked with empty alt text.
- Navigation labels using `aria-label`.
- Mobile menu state exposed through `aria-expanded`.
- Project modal uses `role="dialog"`, `aria-modal`, and an accessible title.
- Escape key support for closing the project modal.
- Reduced-motion support through the media query.
- Visible text for loading and fallback GitHub states.

Recommended future improvements:

- Add a visible focus style using the tokenized cyan focus ring.
- Add focus trapping and focus restoration for the project modal.
- Verify contrast in both themes with an accessibility checker.
- Consider replacing text glyph arrows with the available icon system if a consistent icon implementation is introduced.

## 13. External Data and Configuration

The only remote data request currently made by the app is the public GitHub organization repository request. It can fail because of network access, rate limits, organization visibility, or API changes; the app intentionally has a fallback state.

Before production launch, review:

- Copy `.env.example` to `.env` and set `VITE_CONTACT_EMAIL` to the real receiving inbox.
- Complete FormSubmit's first-time activation email for that inbox.
- Set either `VITE_NEWSLETTER_ENDPOINT` or `VITE_SUBSTACK_URL` to activate newsletter subscriptions.
- Set `VITE_FATHOM_SITE_ID` to activate Fathom Analytics.
- GitHub organization and repository URLs.
- Project source and live demo links.
- A real contact email address.
- Production Open Graph image URL behavior.
- The production domain in the web manifest and crawler policy.

## 14. Maintenance Rules

- Keep content honest and update project statuses as work changes.
- Prefer SVG assets over manually redrawn marks.
- Keep colors synchronized between `design-tokens.json`, `brand-guide.md`, and `src/styles.css`.
- Use technical labels for metadata and normal prose for explanations.
- Preserve the distinction between Technology and Creative without treating either as decoration.
- Test both dark and light themes after visual changes.
- Test desktop and mobile widths after layout changes.
- Preserve reduced-motion behavior when adding animations.
- Run `npm run build` before committing a production change.

## 15. Quick File Map

- `index.html`: browser metadata and React mount point.
- `src/main.tsx`: React bootstrap.
- `src/App.tsx`: page content, state, interactions, and GitHub loading.
- `src/styles.css`: tokens, layout, typography, responsive rules, and animations.
- `src/components/Search.tsx`: Lunr-powered site search command palette.
- `src/components/ServicesSection.tsx`: services, pricing, and service-to-contact CTAs.
- `src/components/CaseStudiesSection.tsx`: fact-based project context and animated project progress rail.
- `src/components/BlogSection.tsx`: draft working notes and expandable article-shaped content.
- `src/components/ProcessSection.tsx`: interactive process tabs, detail panel, and shared process data.
- `src/components/NewsletterIssues.tsx`: two expandable draft newsletter issue outlines.
- `src/components/ResourceGuide.tsx`: printable Kynvera Field Guide and PDF workflow.
- `src/components/RelatedProjects.tsx`: related-project navigation using the existing project data.
- `assets/logo/`: logo family and exports.
- `assets/icons/`: structural icon sheet.
- `assets/pattern/`: repeatable brand pattern.
- `templates/`: editable SVG applications.
- `gallery/index.html`: static brand review board.
- `brand-guide.md`: human brand rules.
- `design-tokens.json`: developer-ready tokens.
- `public/site.webmanifest`: installable app metadata.
- `public/robots.txt`: crawler instructions.
- `package.json`: scripts, dependencies, and Node requirement.
- `explain.md`: this project and website explanation.
