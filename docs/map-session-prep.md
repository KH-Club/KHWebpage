# Map session prep

**Date:** 2026-07-11  
**Repo:** `KHWebpage` (git root)  
**Active branch at prep:** `dev` @ `c0763fe` (`feat(seo): add site metadata`)  
**Map work status:** Memory atlas redesign is **already on `dev`** (ancestor commits through `82a3dbe`). Branch `feature/map-redesign` points at that tip and is behind `dev` (missing news/activities, feature flags, SEO).

Prefer **new map work from current `dev`**, not from the stale remote tip of `feature/map-redesign` (`origin/feature/map-redesign` is gone).

---

## Product framing

- Route: `/map` — Volunteer Camp Memory Map (แผนที่ความทรงจำค่ายอาสา)
- Club geographic archive (Kaihor / ค่ายหอ), not a personal tracker
- Thai-first archival UX; Kaihor palette (mist / horizon / ocean)
- Public site is **read-only** (no CMS create from map)
- Plan of record: `docs/map-redesign-plan.md` (phases 1–4 + later immersive/mobile/atlas polish)

---

## Runtime stack (map-relevant)

| Concern | Choice |
|--------|--------|
| App | Vite + React 18 + TypeScript + Tailwind |
| Package manager | Yarn |
| Pan/zoom | `d3-zoom` + `d3-selection` + `d3-transition` via `useMapViewport` |
| Motion | `motion` |
| Mobile sheet | `vaul` (`ProvinceDetailSheet`) |
| Icons | `lucide-react` + `react-icons` |
| Data | Static: `KHdata` → `campMapData` + SVG ids from `provinces.ts` |
| Tests | Vitest + Testing Library + jsdom |

---

## Architecture (current)

```
page.tsx
  state: selectedProvinceId, mapMode ("all" | "visited" | "unvisited")
  layout: useMediaQuery
    < 768px  → MobileMapExperience (summary → map → insights → archive + sheet)
    ≥ 768px  → MapStage (immersive atlas) + JourneyInsights + ProvinceArchiveList
```

| Layer | Role |
|-------|------|
| `page.tsx` | Selection + mode state; Escape clears selection; exclusive mobile vs desktop trees |
| `ThailandProvinceMap.tsx` | SVG provinces, fills, hover tooltip, ripple, selection dim, callout, controls |
| `useMapViewport.ts` | d3-zoom transform on content group; zoomIn/Out/home/fit/zoomToElement |
| `campMapData.ts` | Summaries, regions, stats, visit fills, province id aliases |
| `archiveList.ts` | All-77 cards, filter/sort, mapMode ↔ statusFilter bridge |
| `ProvinceMapCallout.tsx` | Anchored detail card near selected province (tablet/desktop map) |
| `ProvinceDetailSheet.tsx` | Mobile bottom sheet for selection |
| `ProvinceArchiveList.tsx` | Search, region, status, sort; explorer variant |
| `App.tsx` | Footer hidden on `/map` below `lg` so sheet/map are not crowded |

**Shared selection contract** (passed into stage/mobile):

- `stats`, `mapMode`, `onMapModeChange`
- `selectedProvinceId`, `onSelectProvince`
- `selectedSummary` | `unvisitedProvince`
- `onClearSelection`

---

## File map

```
src/pages/Mappage/
  page.tsx
  types.ts
  hooks/
    useMapViewport.ts
    useMediaQuery.ts
  data/
    campMapData.ts
    archiveList.ts
    __tests__/campMapData.spec.ts
    __tests__/archiveList.spec.ts
  components/
    MapStage.tsx              # desktop/tablet immersive stage shell
    MapStageHero.tsx
    MapStageLegend.tsx
    MapAtmosphere.tsx
    ThailandProvinceMap.tsx   # core SVG engine
    MapControls.tsx
    ProvinceTooltip.tsx
    ProvinceMapCallout.tsx
    MobileMapExperience.tsx
    MobileMapSummary.tsx
    ProvinceDetailSheet.tsx
    ProvinceDetailContent.tsx
    ProvinceDetailPanel.tsx   # legacy/side panel pieces may still exist
    ProvinceArchiveList.tsx
    JourneyInsights.tsx
    MapHero.tsx / MapStats.tsx / MapLegend.tsx / MapStoryCard.tsx / VisitedProvinceList.tsx
      # earlier phase components; some superseded by stage/mobile variants
  __tests__/
    MapPage.spec.tsx
docs/
  map-redesign-plan.md
  map-session-prep.md          # this file
```

---

## Data notes

- Visited summaries: `buildProvinceSummaries(KHCamps)` → `visitedProvinceSummaries`
- Known alias: `Uttardit` → `uttaradit` in `campMapData`
- Regions: north / northeast / central / east / west / south (`getRegionForProvince`)
- Intensity fills (`getVisitFill`): 0 gray · 1 light · 2 mid · 3+ deep blue
- Stats derived at runtime (`getMapStats`); do not hardcode marketing counts in UI
- Legend should stay simple for users: visited vs not (intensity is secondary)

---

## Delivery history (map commits, oldest → newest)

Phases 1–4, immersive stage, mobile app layout, memory atlas, polish, callout:

1. Plan + hero/stats + mode types  
2. d3-zoom + controls + unvisited click  
3. Cinematic select, detail content, sheet, list↔map zoom  
4. Full archive list + filters + region classification  
5. Immersive glass stage + Escape/story tests  
6. Compact mobile nav; map-first mobile experience  
7. Memory atlas redesign + journey polish  
8. Anchored province callout; remove anchor dot  

Later on `dev` (not map-specific): camp voices, news/activities, feature flags, SEO metadata.

---

## Baseline verification (2026-07-11)

```text
yarn test:run src/pages/Mappage
  Test Files  3 passed
  Tests       24 passed
```

Specs:

- `campMapData.spec.ts` — 8  
- `archiveList.spec.ts` — 5  
- `MapPage.spec.tsx` — 11  

---

## Constraints for future map work

1. Preserve data contracts and static `campMapData` unless product asks for Supabase.  
2. Preserve interactions: pan/zoom, mode chips, list↔map selection, Escape, sheets/callouts.  
3. Keep dual layout exclusive (no dual-mounted desktop+mobile trees that break a11y tests).  
4. Thai-first copy; Bai Jamjuree; no tight letter-spacing on Thai.  
5. Prefer Kaihor palette over generic SaaS blue.  
6. Commit each meaningful step (user request for this session).  
7. Run `yarn test:run` (map path) and `yarn typecheck` before finishing map PRs.

---

## Out of scope (still)

- Mapbox / Leaflet / satellite tiles  
- 3D / audio / AR  
- Public create-camp CMS  
- Replacing Bai Jamjuree  
- Live Supabase map feed (unless product requests)

---

## Ready next

No open map task from the previous session. When a new direction is chosen:

1. Branch from latest `dev` (e.g. `feature/map-<topic>`).  
2. Touch only `Mappage/*` (+ shared header/footer if required).  
3. Update tests + this prep / plan docs if UX contracts change.  
4. Commit per step.

Possible directions (product choice, not committed work):

- Visual/UX iteration on the memory atlas  
- Further mobile polish  
- Camp detail deep-links / richer timeline media  
- Performance pass on SVG + motion  
- Align leftover Phase-1 components (`MapHero`, etc.) with stage variants or remove dead UI
