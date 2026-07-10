# PRODUCT.md

## Product Vision

Kaihor / ค่ายหอ should become the definitive public digital home of a long-running volunteer camp community, preserving its history while helping new generations understand, trust, and join the work.

The website is not a KH55 microsite. It is the living archive and invitation for Kaihor as a whole: many camps, many provinces, many students, many alumni, and many communities connected through volunteer work over time.

## Product Purpose

The public website exists to:

- Explain what Kaihor is and why it exists.
- Show evidence of real camp work through photos, places, projects, records, and stories.
- Preserve camp history across generations in a way that is easy to browse.
- Help prospective volunteers understand whether Kaihor is meaningful, credible, and approachable.
- Help alumni reconnect with the continuity of the camp.
- Help communities, schools, parents, supporters, and partners understand the people and values behind the work.
- Create clear paths to participate, contact, follow, or support the current chapter when those paths are open.

## Product Diagnosis

The current public website already has strong raw material:

- A real photo-led homepage.
- A Supabase-backed camp archive.
- Individual camp detail pages with galleries.
- A province map that can show where Kaihor has worked.
- Alumni and student voices that make the site more human.
- A Thai-ready typeface and existing public routes.

The current weakness is narrative direction. The site still behaves like a polished activity landing page: hero, stats, cards, camp list, map. It does not yet fully communicate Kaihor as a long-running institution with memory, continuity, relationships, and impact across generations.

The next product direction should make the existing features feel like an archive and community story, not just a set of pages.

## Brand Narrative

Kaihor began as a volunteer camp community connected to student life and has continued through many generations. Each camp is one chapter in a larger pattern: students preparing together, traveling to real places, working with schools and communities, learning from local people, and carrying those memories forward as alumni.

The public story should make this continuity visible. Visitors should feel that Kaihor is not a one-year project or a temporary event. It is a community with a long memory, renewed by each generation.

The main narrative:

1. Kaihor is a volunteer camp community built across time.
2. Its work happens through real students, real communities, and real places.
3. Each camp leaves records, relationships, stories, skills, and responsibility.
4. KH55 is the current chapter inside that continuing story.
5. The public site helps people understand the past, trust the present, and join the future.

## Kaihor And KH55

Kaihor is the parent identity.

KH55 is the current or latest chapter. It should be visible, useful, and timely, but it must not replace the wider Kaihor identity.

Use KH55 for:

- Current camp announcements.
- Application or participation periods.
- Current location, project focus, preparation updates, and deadline CTAs.
- A highlighted "current chapter" module on the homepage.
- Links to KH55-specific details when visitors need operational information.

Do not use KH55 as:

- The site-wide brand.
- The only hero message.
- The only source of imagery.
- A replacement for Kaihor history.
- The only reason the site exists.

Preferred language:

- "KH55, the current chapter of Kaihor"
- "This year's camp"
- "Latest chapter"
- "Kaihor across generations"
- "ค่ายหอ across generations"

## User Types

Prospective student volunteers:
Need to understand what Kaihor does, whether the work feels meaningful, what participation requires, and how to join when applications are open.

Current members:
Need shared context, camp history, photos, project references, locations, and a public site they can confidently share.

Alumni:
Need to reconnect with past camps, see continuity, find familiar places and memories, and feel proud that the camp continues.

Schools and communities:
Need credibility, examples of past work, respectful representation, contact paths, and a clear sense of how Kaihor collaborates.

Parents and supporters:
Need reassurance, safety context, practical information, photos of real activity, and understandable language.

Partners, sponsors, and public visitors:
Need to understand the scale, values, outcomes, and seriousness of the camp before deciding to support or share it.

## Core User Journeys

Discover Kaihor:
A first-time visitor lands on the homepage and quickly understands that Kaihor is a long-running volunteer camp community, not only KH55.

Explore the archive:
A visitor browses camps by number, year, province, location, photos, director, and project context. The archive should feel like a memory system, not a database dump.

Understand impact:
A parent, partner, or new volunteer sees projects, maps, stories, and photos that explain what the camp has done and who it has touched.

Read human stories:
Students, alumni, and community voices explain what camp meant in plain, specific language.

Find the current chapter:
A visitor can find KH55 or the latest camp, understand its status, and follow the correct action path without making KH55 the whole identity.

Participate or contact:
When applications, volunteer signups, partnerships, or contact channels are available, the next step is clear and direct.

Return and reconnect:
Alumni and members can come back to find records, photos, map locations, and stories from different generations.

## Core Information Architecture

The public website should prioritize narrative browsing before conversion.

Recommended primary navigation:

- Home
- Camps
- Map
- Stories
- Current Chapter
- About
- Contact

Current route mapping:

- `/`: Kaihor overview, history, impact, current chapter, voices, archive entry points.
- `/camp`: Camp archive with search and filters.
- `/camp/:campID`: Individual camp record with story, metadata, photos, project context, and location.
- `/map`: Places Kaihor has reached, province-level camp history, and geographic memory.
- `/activity`: Activity or project-type overview when the route is ready for public use.
- `/contact`: Contact, social links, participation paths, and partner inquiries.

Future routes may include:

- `/stories`
- `/history`
- `/current`
- `/join`
- `/support`
- `/faq`

## Public Website Scope

In scope:

- Public storytelling and brand identity.
- Camp archive browsing.
- Camp detail pages.
- Province map and place-based discovery.
- Student, alumni, and community voices.
- Current chapter module for KH55 or the latest camp.
- Contact and participation paths.
- Public content quality, accessibility, responsive behavior, SEO, and performance.

Out of scope for this product direction:

- Admin/backoffice interface design.
- Internal camp management tools.
- Private member-only workflows.
- Financial operations unless they are shown as public donation or support content.

Admin data can influence public UX only where it affects the quality, reliability, or structure of public content.

## Content Model

The public experience should be built around these content types:

- Camp: number, year, chapter name, location, province, dates, director, project types, summary, photos, related stories.
- Place: province, community, school, visit history, latest camp, map position, representative photo.
- Story: student voice, alumni voice, community voice, teacher voice, parent/supporter voice.
- Project: construction, teaching, welfare, food, community relationship, local collaboration, preparation.
- Current chapter: KH55 status, location, timeline, application state, deadlines, updates, contact.
- Impact evidence: camp count, provinces reached, schools or communities served, years active, volunteers involved.

## Future Scalability

The site should support Kaihor beyond one camp cycle.

Plan for:

- Adding KH56, KH57, and future chapters without redesigning the identity.
- Browsing by generation, year, province, and project type.
- More story formats, including long-form interviews and photo essays.
- Community and school profiles when appropriate.
- Public application windows that can open and close.
- Multilingual or Thai-first with English support if needed.
- SEO-friendly pages for camp history, map locations, and stories.
- Image optimization for large photo archives.
- CMS or Supabase editorial workflows that preserve public content quality.

## Success Metrics

Clarity:
Visitors understand within the first screen that Kaihor is a multi-generation volunteer camp community, not only KH55.

Trust:
Parents, partners, and first-time students can find real evidence: photos, places, dates, stories, and contact paths.

Exploration:
Visitors move from homepage into camps, map, stories, or current chapter pages.

Archive value:
Alumni and members can find past camps and recognize the continuity of the organization.

Participation:
When joining is open, visitors can find the correct next step quickly.

Story depth:
The site includes voices from students, alumni, and communities, not only organizational statements.

Accessibility:
Public pages meet WCAG AA minimum, support keyboard navigation, preserve Thai readability, and work well on mobile.

Performance:
Photo-led pages remain fast, stable, and usable on mobile networks.

Freshness:
The current chapter is updated without making the whole site feel outdated after the camp year ends.

## Product Principles

Evidence before slogans:
Use real photos, dates, places, names, maps, and stories before abstract claims.

Story before conversion:
Visitors should understand Kaihor before being asked to join, contact, or apply.

Thai-first readability:
Thai content must be comfortable to scan, read, and share. English can support but should not dominate.

History is interface:
Camp numbers, years, maps, timelines, and archives are not secondary details. They are part of the product experience.

Real people over decoration:
The emotional center is students, alumni, teachers, communities, and places.

Current chapter in context:
KH55 should feel important because it continues Kaihor, not because it replaces Kaihor.

## Anti-References

Avoid:

- Generic student club templates.
- Startup-style SaaS landing pages.
- Corporate blue dashboards.
- Event microsites that expire after one year.
- Overly gray institutional layouts.
- Fantasy visuals, childish decoration, mascot-led identity, or decorative illustrations as the main language.
- Stock-photo-like imagery that does not show real camp life.
- Claims of impact without evidence.
- Navigation that hides participation or contact paths.
- Designs that make Kaihor look like KH55 only.

## Accessibility And Thai-First Readability

- Use valid UTF-8 Thai text everywhere.
- Maintain readable line length for Thai and English long-form content.
- Avoid tight letter spacing on Thai.
- Keep body text at 16px or larger.
- Use high-contrast text, especially over photos and blue backgrounds.
- Provide meaningful alt text for all real photos.
- Make map regions, cards, filters, menus, and CTAs keyboard accessible.
- Use visible focus states.
- Respect reduced motion preferences.
- Avoid hover-only interactions.
- Make mobile layouts first-class, not compressed desktop layouts.
