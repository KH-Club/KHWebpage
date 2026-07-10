# DESIGN.md

## Design Thesis

Sea. Sky. Community. Memory.

Kaihor's public website should feel like a documentary archive for a living volunteer camp community. The design should be calm, human, photo-led, and deeply connected to place: Southern Thailand, Trang, sea horizons, morning mist, community life, construction work, classrooms, camp books, old records, and university heritage.

The visual language should help visitors feel that Kaihor is real, long-running, trustworthy, and still alive through the current generation.

## UX Audit Summary

Current strengths:

- The public app already uses real camp photography.
- The home, camp archive, camp detail, map, and voice sections provide a strong base for storytelling.
- The province map is a distinctive Kaihor feature and should become more central.
- Camp cards and detail pages already support archive behavior.
- Bai Jamjuree gives the site a Thai-first foundation.

Current weaknesses:

- The homepage structure feels like a generic club landing page: hero, stats, cards, CTA.
- The current information hierarchy does not clearly answer "What is Kaihor?", "Why has it lasted?", "Where has it worked?", and "How can I join?" in that order.
- KH55 is not yet consistently framed as the current chapter inside a larger history.
- Camp pages work functionally but do not yet feel like a curated archive.
- The map is useful but should feel like geographic memory, not only an interactive widget.
- Testimonials are valuable but currently read like a small card section rather than a people-centered story layer.
- The visual system uses blue, white, gray, cards, badges, and hover effects in patterns that can feel generic.

Design opportunity:

Turn the existing routes into a public memory system: a photo-led homepage, archive-like camp browsing, place-based map exploration, human story sections, and a clear current-chapter path.

## Visual Direction

The site should feel closer to a modern museum website, documentary archive, or long-form community publication than a startup landing page.

Translate the inspiration this way:

- Sea horizon: wide calm compositions, deep-to-light blue bands, confident negative space.
- Morning mist: pale blue-white surfaces, gentle photo transitions, low-contrast section backgrounds that still preserve text contrast.
- Trang and Southern Thailand: landscapes, school/community context, travel, heat, rain, sea air, local material textures.
- Community life: group work, teaching, food, conversations, preparation, hands, tools, and shared routines.
- Printed camp books and archives: dates, numbers, captions, chapter labels, timelines, photo grids, record-like metadata.
- University heritage: restraint, clarity, responsibility, and continuity without becoming formal or bureaucratic.

Avoid literal nautical decoration. No waves, anchors, cartoon clouds, random shells, or fantasy graphics unless they are part of real camp artifacts.

## Blue Color System

Blue is the identity system. It should feel coastal, archival, and trustworthy, not like Bootstrap, enterprise SaaS, or a bank.

Core palette:

- Deep ocean: `#082A3D`
  Use for footer, serious hero overlays, dark sections, primary text on pale blue, and high-trust surfaces.
- Kaihor ocean: `#0E4F79`
  Use for primary brand moments, active navigation, important headings, map emphasis, and photo overlays.
- Horizon blue: `#2478A8`
  Use for primary CTAs, selected states, links, and interactive accents.
- Southern sky: `#69B7D9`
  Use for secondary highlights, soft lines, icon accents, and low-emphasis visual rhythm.
- Cloud blue: `#DCEFF7`
  Use for quiet section bands, timeline backgrounds, map panels, and selected chips.
- Mist white: `#F6FAFC`
  Use for main page background and calm reading surfaces.
- Warm sand: `#D8BF91`
  Use sparingly for chapter highlights, archive stamps, date markers, and warmth.
- Sun-worn amber: `#B7792E`
  Use for KH55 deadlines, current chapter labels, and important non-error highlights.
- Archive ink: `#102033`
  Use for primary text.
- Tide slate: `#334B5F`
  Use for body text and secondary copy.
- Weathered gray: `#E5E8EA`
  Use for borders only, not as a dominant section color.

Usage rules:

- Prefer blue-tinted neutrals over generic gray.
- Use warm sand and amber as memory accents, never as the main theme.
- Use deep ocean or archive ink for text on light backgrounds.
- Use white or mist white text on deep ocean only after checking contrast.
- Primary CTAs should be horizon blue or deep ocean depending on the background.
- Hover states should darken or deepen the same hue, not jump to unrelated colors.
- Map visited states should use the blue family; unvisited states should use quiet neutral fill plus labels or legends so meaning is not color-only.
- Do not use `#0D6EFD`, Bootstrap-like blue, or default Tailwind blue as the emotional center unless adjusted into the Kaihor palette.

Contrast targets:

- Normal text: 4.5:1 minimum.
- Large text and icons: 3:1 minimum.
- Focus rings: at least 3:1 against adjacent colors.
- Text over photos must use a real overlay or gradient strong enough for contrast.

## Typography Direction

Keep Bai Jamjuree as the primary family. It supports Thai readability and already belongs to the codebase.

The typographic personality should be editorial and documentary through scale, rhythm, captions, and hierarchy, not through fragile decorative font pairings.

Type roles:

- Hero title: 48-88px desktop, 36-52px mobile, bold, balanced line breaks, readable over photography.
- Page title: 40-64px desktop, 32-44px mobile.
- Section heading: 28-44px desktop, 24-34px mobile.
- Story heading: 24-36px desktop, 22-30px mobile.
- Body: 16-18px, line-height 1.65-1.85 for Thai-heavy content.
- Long-form body: max width 65-75 characters, with clear paragraph spacing.
- Metadata and captions: 13-15px, medium weight, high contrast, concise.
- Archive labels: short, direct, and readable. Avoid all-caps Thai.

Rules:

- Thai text must not use tight letter spacing.
- Do not use thin gray body text.
- Do not use more than two font families unless there is a strong content reason.
- Avoid generic luxury/editorial serif pairings that make the site feel detached from student/community life.
- Use tabular or aligned numerals only where camp numbers, years, or counts need a record-like feel.
- Headings should use `text-wrap: balance` when possible. Long prose should use `text-wrap: pretty`.

## Photography Direction

Photography is the primary visual language.

Use real camp photos that show:

- Students working together.
- Construction, tools, painting, carrying, repairing, preparing, and cleaning.
- Teaching, classroom activity, children, teachers, and shared learning.
- Food, rest, travel, meetings, and everyday camp routines.
- Landscapes, roads, schools, houses, fields, sea, rain, sky, and local context.
- Alumni and student portraits when tied to a story.
- Community members with dignity and consent.

Photo treatment:

- Prefer natural color with a slight cool-blue editorial grade.
- Keep skin tones warm and human.
- Use wide hero images where the place and people are readable.
- Use captions for archive and documentary value.
- Avoid heavy blur, dark overlays that hide the actual scene, and stock-like crops.
- Avoid decorative image masks that make photos harder to inspect.
- Use consistent aspect ratios for cards and grids to prevent layout shift.

Alt text standards:

- Describe who or what is shown, where useful, and what is happening.
- Do not write "image of" unless needed.
- For archival photos, include camp number, location, or year when known.
- Decorative background images should be hidden from screen readers only if equivalent content is nearby.

Performance rules:

- Use responsive image sizes.
- Use WebP or AVIF where possible.
- Lazy-load below-fold galleries.
- Reserve image dimensions with aspect ratio.
- Do not use oversized original photos as thumbnails.

## Layout Principles

Design for narrative browsing first.

The homepage should answer in this order:

1. What is Kaihor?
2. Why does it exist?
3. What has it done across generations?
4. Where has it worked?
5. Who has been shaped by it?
6. What is the current chapter?
7. How can I participate or contact the camp?

Layout rules:

- Use a full-bleed photo-led hero as the first identity signal.
- Let the next section peek above the fold so the page feels explorable.
- Use long-form story bands, timelines, map-led sections, and photo essays before conversion CTAs.
- Use cards only for repeated items such as camp records, stories, archive entries, FAQ rows, and contact options.
- Do not put cards inside cards.
- Avoid section after section of identical white cards.
- Use asymmetry on desktop: photo plus text, timeline plus record, map plus province detail.
- Collapse to a single clear column on mobile.
- Keep long text widths comfortable.
- Give major sections distinct roles, not just different background colors.

## Component Philosophy

Hero:
The hero should establish Kaihor as a multi-generation community. It should use a real photo, clear title, short narrative copy, and one or two focused CTAs such as "Explore camp history" and "View current chapter".

Current chapter module:
KH55 should appear as a highlighted chapter card or section with status, location, dates, and next action. It should visually sit inside Kaihor history, not above it.

Timeline:
Use for camp continuity, generation shifts, major milestones, and the relationship between past camps and the current year. Timeline entries should include year, camp number, place, and one concrete detail.

Camp archive cards:
Cards should feel like records: camp number, location, province, date, director, representative image, and project type. Hover should reveal more information without hiding the image.

Camp detail pages:
Each detail page should feel like a chapter page: photo hero, record metadata, location context, story summary, gallery, related camps or province link.

Map section:
Treat the map as "places Kaihor has touched." Pair the map with captions, province stories, latest visits, and links into camp records.

Testimonial blocks:
Use voices as story material, not generic testimonials. Include name, role, generation or camp connection, and enough context to make the quote specific.

Gallery:
Use gallery layouts that support browsing and memory: feature image, captions, grouped moments, and stable aspect ratios. Avoid random masonry that breaks reading order.

Impact sections:
Use numbers only when they are backed by data. Pair metrics with photos and examples so the section does not feel like marketing.

CTA sections:
CTAs should be practical and calm: join, follow updates, contact, view current chapter, explore camps. The language should say what happens next.

## Navigation And CTA Behavior

Navigation should help visitors understand the organization:

- Home
- Camps
- Map
- Stories
- Current Chapter
- About
- Contact

If space is limited on mobile, keep the most useful public paths visible: Camps, Map, Current Chapter, Contact.

CTA hierarchy:

- Primary CTA: one per major section.
- Secondary CTA: supportive discovery link.
- Do not put multiple competing CTAs in the hero.
- Use verb-led labels: "Explore camp history", "View KH55 chapter", "Read camp voices", "Contact the team".
- When applications are closed, replace "Apply" with "Follow updates" or "Contact for information".

Header behavior:

- Sticky is acceptable if it stays compact and does not cover content.
- Active route state must be visible.
- Focus state must be obvious.
- Mobile menu must be keyboard accessible and close predictably.

## Accessibility Rules

Target WCAG AA minimum.

- Body text contrast must be at least 4.5:1.
- Large text, icons, and interface graphics must be at least 3:1.
- Interactive elements need visible focus states.
- Touch targets should be at least 44px.
- Keyboard users must be able to navigate header, menu, cards, map, filters, gallery controls, and CTAs.
- Do not rely on hover to reveal essential information.
- Do not rely on color alone to communicate visited provinces, selected filters, deadlines, or active states.
- Respect `prefers-reduced-motion`.
- Avoid scroll-jacking.
- Use semantic headings in order.
- Use meaningful link text.
- Provide loading, error, and empty states that explain what happened and what the visitor can do next.
- Keep Thai text valid UTF-8 and readable across browsers.

## Mobile-First Rules

Design mobile as the primary experience.

- Start layouts at 360-390px width.
- Use one-column story flow by default.
- Keep hero copy short enough to fit without covering important photo subjects.
- Make archive filters simple and reachable.
- Avoid wide tables for metadata. Use stacked rows.
- Keep map interactions usable on touch screens.
- Do not require precision taps on province shapes without a list alternative.
- Place CTAs after enough context, not only at the top.
- Keep sticky headers small.
- Ensure buttons, chips, and links do not wrap awkwardly in Thai.

## Motion Direction

Motion should feel calm and documentary.

Use:

- Gentle fade and slide for section entry.
- Smooth hover states on cards and buttons.
- Subtle image reveal for galleries.
- Spatial transitions for menus and filters.

Avoid:

- Bouncy animation.
- Decorative parallax that fights reading.
- Large animated blobs or abstract effects.
- Motion that delays content.
- Animations that fail when reduced motion is enabled.

## What To Avoid

- Corporate SaaS composition.
- Generic student-club templates.
- KH55-only identity.
- Bootstrap blue.
- Gray-on-white institutional pages.
- Decorative illustration as the primary visual language.
- Fantasy visuals, mascot-first art, cartoon clouds, or childish symbols.
- Overused glassmorphism, floating blobs, and generic gradient orbs.
- Repeating card grids for every section.
- Tiny uppercase labels everywhere.
- Photo treatments that hide real places and people.
- Claims of community impact without names, dates, places, photos, or stories.

## Implementation Notes For KHWebpage

Current public routes should evolve this way:

- `src/pages/Homepage`: become the narrative entry point for Kaihor across generations.
- `src/pages/Camppage`: become the camp archive with stronger filtering, chapter framing, and archive language.
- `src/pages/CampDetailpage`: become individual chapter records with story, metadata, gallery, and related place context.
- `src/pages/Mappage`: become place-based memory and impact exploration.
- `src/components/homepage/CampVoices`: expand from a small testimonial area into a story system.
- `src/config/site.ts`: navigation should eventually include public participation and current chapter paths when ready.
- `src/index.css`: replace generic theme variables with the Kaihor blue system.

Do not redesign the admin/backoffice side from this document. Admin changes are relevant only when they improve public content quality, publishing workflow, or data reliability.
