import { KHCamps } from "@/assets/data/KHdata"
import { provinces } from "@/assets/data/provinces"
import { CampData } from "@/types/camp"
import {
	CampMapRegion,
	CampMapRegionInfo,
	CampVisit,
	MapStats,
	ProvinceSummary,
} from "../types"

export const fallbackCampMapImage = "/camps/homepagebackground.jpg"

export const mapRegions: Record<CampMapRegion, CampMapRegionInfo> = {
	north: {
		id: "north",
		label: "North",
		labelTh: "ภาคเหนือ",
		color: "#16a34a",
		selectedColor: "#15803d",
	},
	northeast: {
		id: "northeast",
		label: "Northeast",
		labelTh: "ภาคตะวันออกเฉียงเหนือ",
		color: "#f59e0b",
		selectedColor: "#d97706",
	},
	central: {
		id: "central",
		label: "Central",
		labelTh: "ภาคกลาง",
		color: "#2563eb",
		selectedColor: "#1d4ed8",
	},
	east: {
		id: "east",
		label: "East",
		labelTh: "ภาคตะวันออก",
		color: "#0d9488",
		selectedColor: "#0f766e",
	},
	west: {
		id: "west",
		label: "West",
		labelTh: "ภาคตะวันตก",
		color: "#e11d48",
		selectedColor: "#be123c",
	},
	south: {
		id: "south",
		label: "South",
		labelTh: "ภาคใต้",
		color: "#7c3aed",
		selectedColor: "#6d28d9",
	},
}

/**
 * Share of Thailand provinces with at least one camp record (0–100).
 */
export function getExplorePercent(
	visitedCount: number,
	totalProvinces: number,
): number {
	if (totalProvinces <= 0) return 0
	return Math.round((visitedCount / totalProvinces) * 100)
}

/**
 * Aggregate stats for the memory map hero and cards.
 */
export function getMapStats(
	summaries: ProvinceSummary[],
	totalProvinces: number,
): MapStats {
	const visitedCount = summaries.length
	const campRecords = summaries.reduce(
		(total, summary) => total + summary.visitCount,
		0,
	)
	const unvisitedCount = Math.max(totalProvinces - visitedCount, 0)

	return {
		visitedCount,
		campRecords,
		totalProvinces,
		unvisitedCount,
		explorePercent: getExplorePercent(visitedCount, totalProvinces),
	}
}

/**
 * Visit-intensity fill for choropleth (used in Phase 2 map engine).
 * 0 unvisited · 1 light · 2 mid · 3+ deep ocean.
 */
export function getVisitFill(visitCount: number): string {
	if (visitCount <= 0) return "#E5E7EB"
	if (visitCount === 1) return "#3B82F6"
	if (visitCount === 2) return "#2563EB"
	return "#1D4ED8"
}

const explicitProvinceAliases: Record<string, string> = {
	uttardit: "uttaradit",
}

const provinceNamesById = provinces.reduce<Record<string, string>>(
	(acc, province) => {
		acc[province.id] = province.name
		return acc
	},
	{},
)

const northProvinceIds = new Set([
	"chiangMai",
	"chiangRai",
	"kamphaengPhet",
	"lampang",
	"lamphun",
	"maeHongSon",
	"nan",
	"nakhonSawan",
	"phayao",
	"phichit",
	"phitsanulok",
	"phrae",
	"phetchabun",
	"sukhothai",
	"tak",
	"uthaiThani",
	"uttaradit",
])

const northeastProvinceIds = new Set([
	"amnatCharoen",
	"buengKan",
	"buriRam",
	"chaiyaphum",
	"kalasin",
	"khonKaen",
	"loei",
	"mahaSarakham",
	"mukdahan",
	"nakhonPhanom",
	"nakhonRatchasima",
	"nongBuaLamPhu",
	"nongKhai",
	"roiEt",
	"sakonNakhon",
	"siSaKet",
	"surin",
	"ubonRatchathani",
	"udonThani",
	"yasothon",
])

const eastProvinceIds = new Set([
	"chachoengsao",
	"chanthaburi",
	"chonBuri",
	"prachinBuri",
	"rayong",
	"saKaeo",
	"trat",
])

const westProvinceIds = new Set([
	"kanchanaburi",
	"phetchaburi",
	"prachuapKhiriKhan",
	"ratchaburi",
])

const southProvinceIds = new Set([
	"chumphon",
	"krabi",
	"nakhonSiThammarat",
	"narathiwat",
	"pattani",
	"phangnga",
	"phatthalung",
	"phuket",
	"ranong",
	"satun",
	"songkhla",
	"suratThani",
	"trang",
	"yala",
])

const centralProvinceIds = new Set([
	"angThong",
	"bangkok",
	"chaiNat",
	"lopburi",
	"nakhonNayok",
	"nakhonPathom",
	"nonthaburi",
	"pathumThani",
	"phraNakhonSiAyutthaya",
	"samutPrakan",
	"samutSakhon",
	"samutSongkhram",
	"saraburi",
	"singBuri",
	"suphanBuri",
])

export const configuredRegionProvinceIds = new Set([
	...northProvinceIds,
	...northeastProvinceIds,
	...centralProvinceIds,
	...eastProvinceIds,
	...westProvinceIds,
	...southProvinceIds,
])

export function isRegionConfigured(provinceId: string) {
	return configuredRegionProvinceIds.has(provinceId)
}

const provinceIdsByComparableKey = provinces.reduce<Record<string, string>>(
	(acc, province) => {
		acc[toComparableKey(province.id)] = province.id
		return acc
	},
	{},
)

export function toComparableKey(value: string) {
	return value
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "")
}

export function toProvinceId(value: string) {
	const comparableKey = toComparableKey(value)
	const aliasedKey = explicitProvinceAliases[comparableKey] ?? comparableKey

	return provinceIdsByComparableKey[aliasedKey]
}

export function getProvinceDisplayName(provinceId: string, fallback?: string) {
	return provinceNamesById[provinceId] ?? fallback ?? provinceId
}

export function getRegionForProvince(provinceId: string): CampMapRegion {
	if (northProvinceIds.has(provinceId)) {
		return "north"
	}

	if (northeastProvinceIds.has(provinceId)) {
		return "northeast"
	}

	if (eastProvinceIds.has(provinceId)) {
		return "east"
	}

	if (westProvinceIds.has(provinceId)) {
		return "west"
	}

	if (southProvinceIds.has(provinceId)) {
		return "south"
	}

	if (centralProvinceIds.has(provinceId)) {
		return "central"
	}

	console.warn(
		`Camp map region is not configured for province id: ${provinceId}`,
	)
	return "central"
}

export function buildCampVisit(camp: CampData): CampVisit {
	const name = camp.name || `ค่ายครั้งที่ ${camp.campID}`
	const imageSrc = camp.imgSrc.find(Boolean)

	return {
		campID: camp.campID,
		name,
		date: camp.date || "ยังไม่มีข้อมูลวันที่",
		location: camp.location || "ยังไม่มีข้อมูลสถานที่",
		director: camp.director || "ยังไม่มีข้อมูลผู้อำนวยค่าย",
		imageSrc,
		detailHref: Number.isFinite(camp.campID)
			? `/camp/${camp.campID}`
			: undefined,
	}
}

export function buildProvinceSummaries(camps: CampData[]): ProvinceSummary[] {
	const groupedVisits = new Map<
		string,
		{ provinceName: string; visits: CampVisit[] }
	>()

	camps.forEach((camp) => {
		if (!camp.province.trim()) {
			return
		}

		const provinceId = toProvinceId(camp.province)

		if (!provinceId) {
			return
		}

		const existing = groupedVisits.get(provinceId)
		const visit = buildCampVisit(camp)

		if (existing) {
			existing.visits.push(visit)
			return
		}

		groupedVisits.set(provinceId, {
			provinceName: getProvinceDisplayName(
				provinceId,
				camp.province === "Uttardit" ? "Uttaradit" : camp.province,
			),
			visits: [visit],
		})
	})

	return Array.from(groupedVisits.entries())
		.map(([provinceId, group]) => {
			const visits = [...group.visits].sort((a, b) => b.campID - a.campID)
			const latestVisit = visits[0]

			return {
				provinceId,
				provinceName: group.provinceName,
				region: getRegionForProvince(provinceId),
				visits,
				visitCount: visits.length,
				latestVisit,
				description: `${latestVisit.location} โครงการล่าสุดที่บันทึกไว้: ${latestVisit.name}`,
				imageSrc: latestVisit.imageSrc ?? fallbackCampMapImage,
			}
		})
		.sort((a, b) => a.provinceName.localeCompare(b.provinceName, "th"))
}

export const visitedProvinceSummaries = buildProvinceSummaries(KHCamps)

export const visitedProvinceSummaryById = new Map(
	visitedProvinceSummaries.map((summary) => [summary.provinceId, summary]),
)
