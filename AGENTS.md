# Repository Guidelines

## Project Overview

This repository is the Kaihor Club volunteer camp website: a Vite + React + TypeScript single-page app for presenting the club, past camps, activities, and contact/social channels. The main audiences appear to be prospective volunteers, students, alumni, partners, and people looking for camp history or contact details.

Existing user-facing features include:

- A full-screen home hero in `src/pages/Homepage/components/LandingView.tsx` with CTAs, background imagery, and animated stats.
- About, activities, vision, and values content in `Homepage/components/About.tsx` and `Core.tsx`.
- A camp listing page at `/camp` with debounced search by name, location, camp ID, and province.
- Camp detail pages at `/camp/:campID` with hero image, location/date/director cards, loading/error states, and galleries.
- A homepage Camp Voices section in `src/pages/Homepage/components/CampVoices.tsx` that reads the first 3 published alumni/student voices from Supabase.
- A News & Activities page at `/news-activities` in `src/pages/NewsActivitiespage` that reads published rows from the Supabase `events` table and filters them by upcoming, completed, and announcement status.
- A News & Activities detail route at `/event/:eventId` in `src/pages/NewsActivityDetailpage` that shows the full item, image, event date, registration deadline/countdown, location, and action button.
- A camp map page at `/map` in `src/pages/Mappage` with an interactive Thailand SVG using `src/assets/data/provinces.ts` geometry and visited province summaries derived from `src/assets/data/KHdata.ts`.
- Activity cards and a popup modal on `/activity`, although the nav item is currently commented out in `src/config/site.ts`.
- Contact content through an Instagram embed on `/contact`, though it is not currently in `mainNav`.
- Shared header/footer, social links, reusable UI components, lazy-loaded routes, lazy-loaded images, Supabase-backed camp data, Vitest tests, and CI.

Likely missing or valuable future features for a volunteer camp website include a prominent registration/apply flow, event timeline, eligibility and requirements, packing list, FAQ, safety information, testimonials, sponsors/partners, donation/support information, richer maps, and admin/content management.

## Project Structure

Key root files:

- `package.json`: Yarn scripts and dependencies.
- `vite.config.ts`: Vite React config and `@` alias to `src`.
- `vitest.config.ts`: jsdom test setup and `src/**/__tests__/**/*.spec.{ts,tsx}` include pattern.
- `tailwind.config.js`, `postcss.config.js`, `src/index.css`: Tailwind, theme tokens, font faces, and global styles.
- `.eslintrc.cjs`, `.prettierrc.json`: linting and formatting rules.
- `.github/workflows/ci.yml`: CI for format, lint, typecheck, build, tests, and coverage.
- `vercel.json`: SPA rewrites to `index.html`.
- `README.md`, `CONTRIBUTING.md`: project and contributor documentation.

Application structure:

- `src/main.tsx`: React entry point, wraps `App` in `BrowserRouter`.
- `src/App.tsx`: route declarations, lazy page imports, `SiteHeader`, `SiteFooter`, and `ErrorBoundary`.
- `src/pages/*/page.tsx`: route-level pages. This is a local convention, not Next.js routing.
- `src/pages/*/components`: page-specific components.
- `src/services/alumniStudentVoiceService.ts`: Supabase `alumni_student_voices` delivery query for the homepage Camp Voices section.
- `src/services/newsActivityService.ts`: Supabase `events` delivery query for the public News & Activities page.
- `src/lib/newsActivityDates.ts`: date formatting and countdown helpers for News & Activities.
- `src/hooks/useAlumniStudentVoices`: hook for loading published alumni/student voices.
- `src/hooks/useNewsActivities`: hook for loading published news/activity rows.
- `src/components/Header`, `src/components/Footer`: shared layout shell.
- `src/components/ui`: shared UI components (`Button`, `LazyImage`, `InfoCard`, `SocialLinks`, `AnimatedCounter`, `ScrollIndicator`).
- `src/hooks`: reusable hooks. `useCamps` and `useCampDetail` fetch Supabase camp data; `useSearch` debounces filtering.
- `src/services/campService.ts`: Supabase `camps` table access and database-to-frontend mapping.
- `src/lib/supabase.ts`: Supabase client using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- `src/config/site.ts`: site name, description, nav items, social links, and founding year.
- `src/types`: shared TypeScript types.
- `src/test`: Vitest setup and React Testing Library render helper.
- `src/assets`: imported images, fonts, logos, and local data files.
- `public/camps`: directly served camp images used by public paths.

Notes:

- `src/pages/Mappage` contains the `/map` camp map feature. Update visited province data by editing `src/assets/data/KHdata.ts`; `src/pages/Mappage/data/campMapData.ts` normalizes camp province names to existing province SVG ids and includes the known `Uttardit` -> `uttaradit` alias. The user-facing map legend should stay simple: blue means visited, gray means not visited yet.
- `src/assets/data/KHdata.ts`, `KHdata.json`, and `provinces.ts` contain historical/static data, but the active camp list currently comes from Supabase.
- `src/pages/Contactpage/components/InstagramEmbled.tsx` has an existing filename spelling; update imports carefully if renaming it.

## Development Instructions

Use Yarn because the repository has `yarn.lock`. CI uses Node 20; use Node 20 locally when possible.

```bash
yarn install
yarn dev
yarn build
yarn preview
yarn lint
yarn lint:fix
yarn format
yarn format:check
yarn typecheck
yarn test
yarn test:run
yarn test:coverage
```

Command purposes:

- `yarn dev`: start the Vite dev server, usually on `http://localhost:5173`.
- `yarn build`: run `tsc` and build production assets into `dist/`.
- `yarn preview`: serve the production build locally.
- `yarn lint` / `yarn lint:fix`: check or fix ESLint issues.
- `yarn format` / `yarn format:check`: write or verify Prettier formatting.
- `yarn typecheck`: run TypeScript without emitting files.
- `yarn test`: run Vitest in watch mode.
- `yarn test:run`: run tests once.
- `yarn test:coverage`: generate coverage with the V8 provider.

There is no end-to-end test script, sitemap generation script, or checked-in `.env.local.example` at the time of inspection. Add those only when the project needs them, and document the new workflow.

## Coding Guidelines

- Preserve existing behavior unless the task explicitly asks for a behavioral change.
- Inspect relevant files before editing; prefer small, focused changes.
- Follow current TypeScript and React patterns: functional components, hooks, memoized reusable components where helpful, and `@/*` imports for source paths.
- Keep components small. Page-specific UI should stay under `src/pages/<Page>/components`; reusable UI belongs in `src/components/ui`.
- Use meaningful names that match domain concepts such as `CampCard`, `CampGallery`, `useCamps`, and `CampData`.
- Prefer existing helpers such as `cn` from `src/lib/utils.ts`, `LazyImage`, and shared `Button` components before adding new abstractions.
- Avoid new dependencies unless they remove clear complexity or provide accessibility/security/performance value.
- Keep Supabase data transformation in `src/services/*Service.ts` and frontend state in hooks.
- Keep News & Activities public delivery constrained to published `events` rows. Backoffice owns the editing flow and SQL contract in `docs/news-activities.md`.
- Use `events.event_date` as the main event date. Use `events.start_date` and `events.end_date` as the registration window/deadline fields that drive countdown labels such as `5 days left`, `Ends today`, and `Registration closed`.
- The News & Activities large panel should use the newest created published record for the active filter. Keep the empty state honest when no published CMS records exist.
- Do not expose `.env` values. `.env*` files are ignored; use `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- Be careful with `dangerouslySetInnerHTML`; the Instagram embed is the current exception and should be audited if modified.

## Styling Guidance

The existing styling approach is Tailwind CSS with shadcn-style CSS variables, `tailwind-merge`, `clsx`, `class-variance-authority`, and the Bai Jamjuree font loaded from `src/assets/fonts` in `src/index.css`. Current screens use blue accents, gray/white sections, full-bleed camp photography, rounded cards, shadows, and responsive grid layouts.

For new volunteer camp UI, keep the site warm, welcoming, trustworthy, community-focused, and nature/outdoor-inspired:

- Use real camp, student, school, community, and outdoor imagery rather than generic stock art.
- Keep blue as an existing brand accent, but consider adding restrained earth green, warm amber, off-white, and neutral slate accents.
- Use generous section spacing, clear headings, short Thai-first copy, and scannable content blocks.
- Prefer cards for repeated camps, testimonials, FAQs, requirements, sponsors, and safety items.
- Buttons should have clear action labels such as "Apply", "View Camps", "Contact Us", or "See Schedule".
- Use mobile-first layouts: single column first, then `sm`, `md`, and `lg` grids.
- Avoid decorative clutter that competes with real camp photos or key calls to action.

## Volunteer Camp Website Feature Ideas

Practical additions that fit this project:

- Hero section with one primary CTA for volunteer registration and one secondary CTA for camp history.
- About the camp, mission, values, and impact metrics.
- Volunteer application or registration flow with status, deadlines, and confirmation states.
- Event schedule, camp timeline, or preparation milestones.
- Deeper location pages or map filters that expand the current `/map` camp impact view.
- Requirements, eligibility, roles, and expected volunteer commitment.
- Packing list and preparation checklist.
- FAQ for applicants, parents, partners, and returning volunteers.
- Testimonials from volunteers, alumni, schools, or communities.
- Searchable/filterable gallery of camps and activities.
- Contact section with email, social links, location, and optionally a contact form.
- Sponsors, partners, and supporter acknowledgements.
- Safety information, emergency contacts, insurance/medical notes, and code of conduct.
- Donation or support section if the organization accepts support.
- Admin/content management for camps, registration windows, gallery images, FAQs, and announcements, likely backed by Supabase.

## Accessibility and UX Best Practices

- Keep keyboard navigation complete. `CampCard` already handles Enter/Space; use real buttons/links where possible for new clickable UI.
- Maintain a proper heading hierarchy: one page-level `h1`, then logical `h2`/`h3` sections.
- Provide descriptive alt text for camp and activity images. Avoid empty alt text unless the image is decorative.
- Preserve visible focus styles and sufficient color contrast, especially over hero photos.
- Label every form input and show clear validation, loading, success, and error states.
- For modals/popups, support Escape close, focus management, and a labelled close button. `ActivityPopup` is a candidate for improvement.
- Keep CTAs obvious and navigation simple. Add pages to `siteConfig.mainNav` only when they are ready.
- Use loading and error components consistently for Supabase-backed views.

## SEO and Performance

- `index.html` currently has a generic `<title>KH Website</title>` and no meta description or Open Graph tags. Add page titles, descriptions, social preview tags, and a proper favicon path before launch.
- Structure content with semantic sections, headings, lists, and descriptive link text.
- Keep route lazy loading in `src/App.tsx` for page-level code splitting.
- Use `LazyImage` or native `loading="lazy"` for non-critical images.
- Optimize large JPGs before adding them to `src/assets` or `public/camps`; avoid duplicating images unless there is a clear reason.
- Avoid large unused UI libraries; prefer the current Tailwind/Radix/lucide/react-icons stack.
- Watch bundle size when adding embeds, maps, analytics, or rich galleries.

## Testing Guidelines

Tests use Vitest, jsdom, React Testing Library, and `src/test/setup.ts`. Use `src/test/test-utils.tsx` when components need `BrowserRouter`.

- Put tests in colocated `__tests__` folders.
- Name specs `*.spec.ts` or `*.spec.tsx`.
- Cover new hooks, data transforms, search/filter behavior, route navigation, loading states, error states, and accessibility behavior.
- Run `yarn test:run` for focused changes and `yarn test:coverage` for broader feature work.

## Commit, PR, and CI Notes

Recent commits use short imperative messages, sometimes with Conventional Commit prefixes such as `feat(font): add font to project`. `CONTRIBUTING.md` recommends branching from `dev` with `feature/`, `fix/`, `refactor/`, or `docs/` prefixes.

Before opening or updating a PR:

- Run `yarn format`, `yarn lint`, `yarn typecheck`, `yarn test:run`, and `yarn build` when relevant.
- Include a summary, test plan, related issue links if available, and screenshots for UI changes.
- Wait for GitHub Actions to pass before requesting review.
- Do not merge your own PR.
- CI runs lint, typecheck, tests, and build on `dev` and `main`. Feature branches should merge into `dev`; `dev` then promotes into `main` when the code is production-ready. CI does not deploy to Vercel or require a Vercel token.

## Agent Workflow Rules

- Start by reading the relevant source, tests, config, and docs. Do not assume the README is fully current.
- Make minimal, focused changes and do not overwrite unrelated user work.
- Keep existing public routes and data contracts stable unless asked to change them.
- Update docs when commands, routes, environment variables, or user-visible behavior changes.
- Add or update tests for behavior changes when practical.
- Run available checks before finishing; if a check is skipped, explain why.
- If unsure, state assumptions in the final response and keep recommendations separate from facts.

## Future Improvement Roadmap

Short term:

- Add SEO metadata and Open Graph tags in `index.html` or introduce a route-aware metadata solution.
- Add a checked-in `.env.local.example` with placeholder Supabase keys.
- Decide whether `/activity` and `/contact` should appear in `siteConfig.mainNav` alongside the existing Home, Camp, and Map links.
- Improve `ActivityCard` and `ActivityPopup` accessibility.
- Review image duplication between `src/assets/images/camps` and `public/camps`.

Medium term:

- Build volunteer registration/apply pages with validation and clear confirmation states.
- Add FAQ, packing list, requirements, safety, schedule, and testimonial sections.
- Extend the map with province filters, richer detail pages, or Supabase-backed updates if historical data moves out of `KHdata.ts`.
- Add admin/content workflows for camps and announcements, likely through Supabase.
- Improve empty, loading, offline, and Supabase misconfiguration states.

Long term:

- Add a CMS or back-office integration for non-developer content updates.
- Add donation/support, sponsors, partner pages, and impact reporting.
- Add multilingual support if both Thai and English audiences are important.
- Add analytics, sitemap generation, structured data, and end-to-end tests.
- Consider richer gallery filtering and performance budgets for media-heavy pages.
