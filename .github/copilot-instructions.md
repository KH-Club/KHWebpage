# Copilot Instructions for KH Webpage

## Project Scope

- This is the Kaihor Club volunteer camp website, built for browsing camps and activities, viewing camp details, and supporting future registration and participant management flows.
- Treat the site as a public-facing, mobile-first, Thai-centric web app.
- Keep all work within the existing Vite + React + TypeScript + Supabase stack.

## Current App Structure

- The app uses React Router with lazy-loaded pages in [src/App.tsx](src/App.tsx): Home, Camp list, Camp detail, Activity, and Contact.
- Shared layout lives in the header/footer components, with feature folders under [src/pages/](src/pages/) and reusable UI in [src/components/ui/](src/components/ui/).
- Supabase is currently used for camp data reads through [src/lib/supabase.ts](src/lib/supabase.ts), [src/services/campService.ts](src/services/campService.ts), and [src/hooks/useCamps/useCamps.ts](src/hooks/useCamps/useCamps.ts).
- Existing public flows are camp browsing, camp detail viewing, activity showcase content, and contact/social information.

## Code Analysis Requirement

- Before suggesting changes or new features, inspect the existing codebase structure, services, hooks, and types.
- Identify what is already implemented versus what is missing.
- Do not assume a feature exists until it is verified in code.
- When proposing improvements, reference existing files, hooks, or services explicitly.
- Extend current patterns instead of creating parallel implementations.

## Output Expectations

- When suggesting changes or improvements, start with a brief analysis of the current implementation.
- Clearly separate existing behavior, gaps, and proposed improvements.
- Group suggestions by features, UX/UI, and code structure when relevant.
- Keep responses structured, concise, and actionable.
- Avoid vague suggestions without implementation direction.

## Architecture Patterns

- Data flow must follow service -> hook -> component.
- Do not call Supabase directly inside components.
- Do not mix UI rendering with data transformation.
- Services own Supabase queries and data mapping.
- Hooks own loading, error, and state coordination.
- Components should focus on rendering and interaction only.

## Error Handling and Fallback UI

- Use [src/layouts/ErrorBoundary.tsx](src/layouts/ErrorBoundary.tsx) for unexpected render or runtime failures at the app/layout level.
- Use inline, actionable fallback UI inside pages and feature components for data-load, empty, or recoverable errors.
- Reserve toast notifications for transient actions such as submit/save feedback when that pattern already exists.
- Do not rely on toast messages alone for page-level errors.
- Error messages shown to users should be friendly and actionable, with retry or back navigation where appropriate.

## Working Principles

- Preserve the existing UI, route structure, and interaction patterns unless the user explicitly asks for a redesign.
- Reuse existing components, hooks, and service patterns before introducing new abstractions.
- Existing shadcn/ui components may be used when they fit the task, but prefer the project's current UI primitives and patterns first.
- Prefer small, focused changes that fit the current folder conventions.
- Do not introduce new frameworks, new backend services, or unrelated libraries.
- If a new feature is needed, integrate it into the current pages and services instead of creating a parallel architecture.

## Data and Supabase

- This project uses Vite environment variables, not Next.js-style variables.
- Use VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY for Supabase.
- Keep secrets out of tracked files. Put local values in .env.local and keep .env.local.example as the template.
- Before changing payloads or data flow, inspect the related service, hook, and type definitions first.
- Never assume database schema or field names.
- Always inspect existing types, services, or queries before using data.
- If schema is unclear, ask for clarification or infer conservatively based on existing usage.
- Do not invent tables, columns, or relationships.
- Keep database-to-frontend mapping inside the service layer, not inside page components.
- If new data entities are added, create a typed service layer and hook for them with loading and error states.
- Treat Supabase as the source of truth once a flow is wired up; do not keep silent duplicate data paths.

## Deployment Environment

- This project is deployed on Vercel.
- When discussing hosting or deployment config, assume Vercel-compatible behavior and SPA rewrites as defined in [vercel.json](vercel.json).
- Do not introduce Netlify or Next.js deployment assumptions unless the user explicitly asks for them.

## Performance Considerations

- Avoid redundant data fetching if data is already available in hooks or state.
- Reuse existing queries and cache where possible.
- Prefer lightweight components and avoid unnecessary re-renders.
- Be mindful of Supabase query cost and frequency.

## Feature Guidance for This Site

- Prioritize features that match a volunteer camp platform: camp discovery, camp detail enrichment, registration flow, participant management, role-based access, and clear contact/CTA surfaces.
- Keep Thai copy readable and practical for volunteers, while preserving existing English labels where the app already uses them.
- If role-based access is introduced, keep public, staff, and admin concerns separated.
- If a feature needs filtering or search, follow the existing search pattern rather than inventing a new data layer.

## Copy Tone

- Use polite, concise Thai copy by default.
- Keep the tone friendly and practical, not overly formal.
- Preserve English labels where they already exist or where the product term is more natural in English.
- Prefer clear calls to action over clever wording.

## Domain-Specific Features

- Common volunteer camp patterns include camp capacity and quota tracking, registration deadlines and status, participant confirmation and waitlist handling, camp schedule or timeline display, and organizer or staff contact per camp.
- Prioritize these patterns when they are missing and relevant.

## Auth and Role Guidance

- Treat the public website and the backoffice as separate concerns unless a feature explicitly needs to bridge them.
- Do not add login, role checks, or permission logic to the public site unless there is a clear user-facing requirement.
- If role-aware behavior is needed, keep it abstracted and reusable instead of hardcoding staff/admin logic inside pages.
- Prefer a simple public browsing flow by default, and let the backoffice own operational workflows such as approvals, edits, and participant management.
- Never duplicate backoffice auth or permission rules in the public app without a concrete integration plan.

## UI and Behavior

- Keep loading, empty, and error states visible and actionable.
- Make primary actions obvious, especially for camp browsing, registration, and contact.
- Preserve the current visual language: Tailwind-driven layouts, rounded cards, clear spacing, and the existing header/footer style.
- Reuse shared UI primitives such as Button, LazyImage, InfoCard, AnimatedCounter, and ScrollIndicator when they already fit the task.

## Code Style

- Match the repository formatting: tabs, no semicolons, and Prettier-based formatting.
- Keep import order and Tailwind class order consistent with the existing tooling.
- Prefer feature folders with one component or hook per folder, following the existing page and UI structure.
- Use barrel exports only where they already fit the repository’s current pattern.

## TypeScript Strictness

- Keep TypeScript strict and work with the existing compiler settings in [tsconfig.json](tsconfig.json).
- Avoid `any`; prefer precise types or `unknown` for untrusted values, then narrow before use.
- Prefer explicit return types on exported functions, hooks, and services when they improve clarity.
- Do not add `@ts-ignore` or similar suppressions unless there is no practical alternative and the reason is clear.

## Testing and Validation

- Add or update Vitest and React Testing Library coverage when changing behavior.
- Prefer targeted tests for hooks, services, utilities, and visible component behavior.
- Prioritize tests for hooks and services first; page-component tests are secondary unless the page contains important user flow logic.
- When adding or changing logic, identify what should be tested before writing code.
- Ensure tests reflect real user behavior, not just implementation details.
- Run type checking and relevant tests when the change affects shared data flow or Supabase integration.
- If a service or hook changes, add coverage that reflects the new contract instead of relying only on page tests.

## What To Avoid

- Do not guess field names, payload shapes, or table behavior if the service layer does not already define them.
- Do not move logic into page components if it belongs in a hook or service.
- Do not add unrelated UI refactors when the request is about data, behavior, or structure.
- Do not refactor unrelated parts of the codebase.
- Limit changes to the scope of the task unless explicitly instructed.
- If a larger refactor is beneficial, suggest it separately instead of applying it directly.
- Do not keep unfinished scaffolding around if it no longer serves the current site direction.
