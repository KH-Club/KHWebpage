# Map Redesign Implementation Plan

**Branch:** `feature/map-redesign`  
**Route:** `/map`  
**Goal:** Redesign the map page from a plain dashboard into an interactive **Volunteer Camp Memory Map** (แผนที่ความทรงจำค่ายอาสา) — cinematic, emotional, and archive-like, not admin UI.

**Product framing:** Community memory for Kaihor Club (ค่ายหอ), not a personal “places I visited” tracker. KH camps across Thailand since ~1998; map shows where the club has worked.

---

## 1. Current state

> **Implementation status (2026-07-11):** Phases 1–4 plus immersive stage, map-first mobile layout, memory atlas, and anchored callout are **landed on `dev`**. See `docs/map-session-prep.md` for architecture, file map, and test baseline. The table below was the **pre-redesign** baseline used when this plan was written.

| Area | Pre-redesign (plan start) | Now (on `dev`) |
|------|---------------------------|----------------|
| Entry | `src/pages/Mappage/page.tsx` | Same; dual layout via `useMediaQuery` |
| Map | Static SVG — no pan/zoom | `d3-zoom` + controls + cinematic select + callout |
| Data | Static `campMapData` + `KHdata` + `provinces.ts` | Same source; + archive helpers + regions |
| Selection | Visited-only → side panel | Any province; desktop callout / mobile sheet; Escape |
| Visual | Generic blue/gray cards | Memory atlas stage, journey insights, explorer list |
| Tests | `MapPage.spec`, `campMapData.spec` | + `archiveList.spec` (24 tests total, green) |

**Baseline metrics (from current data; recompute at build/runtime):**

- Total provinces: 77  
- Visited: ~29  
- Camp records: ~42  
- Explored: ~38%  

Do not hardcode these in UI copy except as fallbacks; derive from `visitedProvinceSummaries` / `provinces.length`.

---

## 2. Design principles (non-negotiable)

1. **Map is the focal point** — hero and stats support exploration; they do not compete with the SVG.
2. **Evidence before slogans** — camp numbers, years, photos, visit counts carry the emotion.
3. **Thai-first** — Bai Jamjuree, generous line-height, no tight letter-spacing on Thai.
4. **Kaihor palette** (from root / `DESIGN.md`), not Bootstrap blue:

   | Role | Token |
   |------|--------|
   | Page bg | Mist `#F6FAFC` / `#F8FAFC` |
   | Surface | White `#FFFFFF` |
   | Primary CTA / visited mid | Horizon `#2478A8` / `#2563EB` family aligned to brand |
   | Visited strong | Kaihor ocean `#0E4F79` |
   | Visited deep / multi-visit | Deep ocean `#082A3D` / `#1D4ED8` |
   | Unvisited | Weathered gray `#E5E8EA` / `#E5E7EB` |
   | Text | Archive ink `#102033`, tide slate `#334B5F` |
   | Warm accent (progress stamp only) | Sand `#D8BF91`, amber `#B7792E` |

5. **Accessibility** — keyboard provinces, Esc close, focus trap in modal/sheet, contrast AA, reduced-motion paths.
6. **Public site is read-only** — no real “add camp” CMS action on this page. CTAs link to camp detail or contact, or are deferred.

---

## 3. Target UX summary

### Page structure

```
[ Hero: title + memory copy + progress + mode chips ]
[ Stats: visited | camps | total provinces | % explored ]
[ Map ~65%  |  Detail panel ~35% ]   desktop partial-map layout
[ Floating map controls + helper caption ]
[ Archive list: search · filters · sort · cards for all provinces ]
```

### Interaction model

| Action | Result |
|--------|--------|
| Hover province | Lift/glow + tooltip (name, status, visit count) |
| Click any province | Ripple → smooth zoom/pan to province → highlight → open detail |
| List card click | Same selection + zoom as map click |
| Mode chip: visited | Dim unvisited; optional fit to visited bounds |
| Mode chip: unvisited | Dim visited; emphasize gray provinces |
| Zoom +/− / home / fit | Map controls; pan bounds keep Thailand visible |
| Esc / backdrop | Clear selection or close sheet |

### Detail content

**Visited:** badge, name, region, visit count, latest camp, timeline of visits, “View camp” → `/camp/:campID`.  
**Unvisited:** badge, name, region, empty state copy, soft CTA (e.g. contact / follow) — not fake admin.

**Desktop:** right panel (persistent) or glass side sheet.  
**Mobile:** bottom sheet.

---

## 4. Out of scope (v1)

- Mapbox / Leaflet basemap / satellite tiles  
- 3D globe, audio, AR  
- Real create/edit camp from public map  
- “Set as next goal” persistence (optional local-only later)  
- Replacing Bai Jamjuree with Inter / LINE Seed  
- Supabase live map data (keep static `campMapData` unless product asks later)

---

## 5. Phased delivery

### Phase 1 — Skin + structure (visual memory archive)

**Goal:** Page no longer reads as an admin dashboard; structure matches target IA.

| Task | Files (expected) |
|------|------------------|
| Hero with soft gradient, title, dynamic stats copy | `page.tsx`, new `MapHero.tsx` |
| Progress: `visited / 77` + % explored (bar or ring) | `MapHero.tsx` or `MapProgress.tsx` |
| Mode chips (UI + state only; filter wiring can soft-land) | `page.tsx` state: `mapMode: 'all' \| 'visited' \| 'unvisited'` |
| Premium stats cards (4) with icons + hover | `MapStats.tsx` |
| Redesign empty detail panel | `ProvinceDetailPanel.tsx` |
| Apply Kaihor surfaces/radii/spacing to legend + list shell | existing components |
| Use `AnimatedCounter` where numbers appear if suitable | reuse `@/components/ui` |

**Acceptance**

- [ ] Title positions page as memory map / journey, not “admin map”
- [ ] Stats derived from data (not only hardcoded marketing numbers)
- [ ] Empty panel explains click-to-explore
- [ ] Mobile: hero + stats readable at 375px
- [ ] Existing tests updated; `yarn test:run` + `yarn typecheck` pass

---

### Phase 2 — Map engine (alive SVG)

**Goal:** Map is interactive and the visual center.

| Task | Files (expected) |
|------|------------------|
| Pan, wheel zoom, pinch zoom | `ThailandProvinceMap.tsx` + hook e.g. `useMapViewport.ts` |
| Floating controls: +, −, home, fit Thailand | `MapControls.tsx` |
| Visit-intensity fills (0 / 1 / 2 / 3+) | map styles helper |
| Hover tooltip (portal or SVG-adjacent) | `ProvinceTooltip.tsx` |
| Unvisited provinces clickable | map event handlers |
| Helper caption under map | `ThailandProvinceMap` footer |
| Constrain pan so Thailand cannot fully leave viewport | zoom transform bounds |

**Tech choice**

- Prefer **`d3-zoom`** on a transform group wrapping existing province paths (precise zoom-to-bbox later).
- Alternative: `svg-pan-zoom` if d3 dependency cost is undesired — pick one in Phase 2 PR and document.
- Avoid new map libraries (Mapbox/react-simple-maps) unless SVG approach fails.

**Acceptance**

- [ ] Drag + scroll zoom work on desktop; pinch on touch
- [ ] Controls reset and fit Thailand
- [ ] Hover tooltip for visited and unvisited
- [ ] Intensity scale readable; legend still simple (visited / not + note on intensity)
- [ ] Keyboard: focusable provinces (all or visited+unvisited with clear labels)

---

### Phase 3 — Cinematic select + detail sheet

**Goal:** Click feels like “traveling into” a province.

| Task | Files (expected) |
|------|------------------|
| Click sequence: ripple → ease zoom (~500–700ms) → select glow | map + motion |
| Dim non-selected provinces lightly while selected | CSS / fill override |
| Desktop detail: enhanced panel or glass side sheet | `ProvinceDetailPanel` / `ProvinceDetailSheet` |
| Mobile: bottom sheet | Vaul or lightweight Motion sheet |
| Visited timeline UI | panel body |
| Unvisited empty state + CTAs | panel body |
| Focus trap + Esc + backdrop close | sheet a11y |
| List ↔ map two-way selection + zoom | `VisitedProvinceList` → expand to all provinces |

**Tech choice**

- **Motion** (`framer-motion` / `motion`) for enter/exit and reduced-motion fallbacks.
- Bottom sheet: **vaul** or Radix Dialog + custom slide; keep bundle small.

**Acceptance**

- [ ] Selecting province from map or list centers/zooms smoothly
- [ ] Visited shows timeline + link to camp detail when `detailHref` / camp ID exists
- [ ] Unvisited shows empty state (no crash, no fake visits)
- [ ] Mobile sheet is thumb-friendly; desktop panel usable without sheet if preferred
- [ ] `prefers-reduced-motion`: skip long zoom; still open detail

---

### Phase 4 — Archive list + polish

**Goal:** Bottom list is a full index of Thailand, not only visited cards.

| Task | Files (expected) |
|------|------------------|
| Extend list to **all 77** provinces | new `ProvinceArchiveList.tsx` (replace or evolve `VisitedProvinceList`) |
| Search, region filter, status filter, sort | list controls |
| Card designs for visited vs unvisited | list cards |
| Page-load stagger (hero → stats → map fills) | Motion / CSS |
| Count-up on stats / modal visit count | `AnimatedCounter` |
| Reduced-motion + final a11y pass | global map CSS |
| Tests for filters, selection, map modes | `__tests__` |

**Sort options:** most visited · recently visited · alphabetical · region.

**Acceptance**

- [ ] Search/filter/sort work and stay synced with selection when a card is clicked
- [ ] Filter “unvisited” / mode chip “unvisited” consistent
- [ ] No layout thrash; list animations optional and skippable
- [ ] CI: `yarn format`, `yarn lint`, `yarn typecheck`, `yarn test:run`, `yarn build`

---

## 6. Suggested file layout (after redesign)

```
src/pages/Mappage/
  page.tsx                 # composition + selection/mode state
  types.ts                 # extend if needed (MapMode, tooltip model)
  data/
    campMapData.ts         # keep as source of summaries; add helpers if needed
  components/
    MapHero.tsx
    MapStats.tsx
    MapProgress.tsx        # optional split
    ThailandProvinceMap.tsx
    MapControls.tsx
    ProvinceTooltip.tsx
    ProvinceDetailPanel.tsx
    ProvinceDetailSheet.tsx  # mobile / optional desktop
    ProvinceArchiveList.tsx
  hooks/
    useMapViewport.ts
    useProvinceSelection.ts  # optional: selection + zoom orchestration
  __tests__/
    MapPage.spec.tsx
    ...
docs/
  map-redesign-plan.md     # this file
```

Keep page-specific UI under `Mappage/`; only promote to `src/components/ui` if reused elsewhere.

---

## 7. Data contracts

Reuse and lightly extend existing types in `types.ts` / `campMapData.ts`:

```ts
// Conceptual — implement only what each phase needs
type MapMode = "all" | "visited" | "unvisited"

// ProvinceSummary already has:
// provinceId, provinceName, region, visits, visitCount, latestVisit, description, imageSrc
```

**Helpers to add as needed:**

- `getExplorePercent(visited, total)`
- `getVisitFill(visitCount)` intensity color
- `getAllProvinceCards()` — visited summaries + unvisited stubs from `provinces`
- Region label Thai strings for UI (today region labels are English in `mapRegions`)

**Camp links:** prefer `/camp/${campID}` when ID is valid; keep optional `detailHref` on `CampVisit` if already used.

---

## 8. Copy guidelines (Thai-first)

| Slot | Direction |
|------|-----------|
| H1 | แผนที่ความทรงจำค่ายอาสา / Volunteer Camp Memory Map |
| Hero support | Provinces with memories · camps recorded · still waiting for a first story |
| Empty panel | เลือกจังหวัด → click map to zoom and see camp history |
| Visited badge | เคยไปแล้ว |
| Unvisited badge | ยังไม่เคยไป |
| Map helper | ลากเพื่อเลื่อน · เลื่อนเพื่อซูม · คลิกจังหวัดเพื่อดูรายละเอียด |
| Primary actions | ดูรายละเอียดค่าย · ติดต่อ / follow social — not “Add camp” on public |

Wire mode chips to real behavior in Phase 2–3. Label hero chips:

- สำรวจจังหวัดที่เคยไป  
- แสดงจังหวัดที่ยังไม่เคยไป  

Defer or retarget “Add new camp record” to contact or hide until CMS deep-link exists.

---

## 9. Dependencies

| Package | Phase | Purpose |
|---------|-------|---------|
| `d3-zoom` (+ `d3-selection` if needed) | 2 | Pan/zoom + zoom-to-bbox |
| `motion` or `framer-motion` | 3–4 | Sheet, stagger, reduced motion |
| `vaul` (optional) | 3 | Mobile bottom sheet |

Install only when the phase starts. Prefer Yarn. No service-role or new backend.

---

## 10. Testing plan

| Layer | Cover |
|-------|--------|
| Unit | Intensity helper, explore %, filter/sort pure functions |
| Component | Empty panel, visited/unvisited detail, list filters |
| Page | Selection state, Escape, mode chips, keyboard open |
| Manual | Desktop pan/zoom, mobile pinch + bottom sheet, reduced motion |

Update `MapPage.spec.tsx` whenever DOM structure / labels change.

---

## 11. Definition of done (feature branch)

1. All four phases complete **or** product explicitly ships a subset (e.g. P1–P3) with remaining items listed as follow-ups in the PR.  
2. `/map` feels like a memory archive: progress, intensity map, zoom-to-province, dual visited/unvisited detail, searchable list.  
3. Aligns with `DESIGN.md` / `PRODUCT.md` (map as geographic memory).  
4. Checks green: format, lint, typecheck, test:run, build.  
5. PR into `dev` with screenshots (desktop + mobile) and short test plan.

---

## 12. Implementation order (PR strategy)

| PR | Scope |
|----|--------|
| PR1 | Phase 1 only — safe visual redesign, no new deps |
| PR2 | Phase 2 — map engine + tooltips + intensity |
| PR3 | Phase 3 — cinematic select + sheets |
| PR4 | Phase 4 — full archive list + polish |

Single stacked branch `feature/map-redesign` is fine if PRs are sequential commits; split PRs if review load is high.

---

## 13. Open decisions (resolve during build)

1. Desktop: persistent panel only vs panel + modal glass card. **Default:** persistent panel desktop, bottom sheet mobile.  
2. Zoom library: `d3-zoom` vs `svg-pan-zoom`. **Default:** `d3-zoom`.  
3. Thai region labels: add now vs keep English region chips. **Default:** Thai labels in UI.  
4. Hero “add camp” chip: hide vs link to `/contact`. **Default:** hide on public.  
5. Unvisited clickable intensity of dimming in “visited only” mode. **Default:** strong dim, still keyboard-reachable if needed for a11y.

---

## 14. Next step

Start **Phase 1** on `feature/map-redesign`: implement `MapHero`, `MapStats`, progress, empty panel redesign, and Kaihor visual tokens without changing map interaction yet.
