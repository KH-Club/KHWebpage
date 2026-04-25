import { KHCamps } from "@/assets/data/KHdata"
import { provinces } from "@/assets/data/provinces"
import { CampData } from "@/types/camp"
import {
	CampMapRegion,
	CampMapRegionInfo,
	CampVisit,
	ProvinceSummary,
} from "../types"

export const fallbackCampMapImage = "/camps/homepagebackground.jpg"

export const mapRegions: Record<CampMapRegion, CampMapRegionInfo> = {
	north: {
		id: "north",
		label: "North",
		color: "#16a34a",
		selectedColor: "#15803d",
	},
	northeast: {
		id: "northeast",
		label: "Northeast",
		color: "#f59e0b",
		selectedColor: "#d97706",
	},
	central: {
		id: "central",
		label: "Central",
		color: "#2563eb",
		selectedColor: "#1d4ed8",
	},
	east: {
		id: "east",
		label: "East",
		color: "#0d9488",
		selectedColor: "#0f766e",
	},
	west: {
		id: "west",
		label: "West",
		color: "#e11d48",
		selectedColor: "#be123c",
	},
	south: {
		id: "south",
		label: "South",
		color: "#7c3aed",
		selectedColor: "#6d28d9",
	},
}

const explicitProvinceAliases: Record<string, string> = {
	uttardit: "uttaradit",
}

const northProvinceIds = new Set([
	"chiangMai",
	"lampang",
	"lamphun",
	"nan",
	"phayao",
	"phichit",
	"phitsanulok",
	"phrae",
	"sukhothai",
	"tak",
	"uttaradit",
	"phetchabun",
])

const northeastProvinceIds = new Set([
	"amnatCharoen",
	"chaiyaphum",
	"kalasin",
	"loei",
	"nongBuaLamPhu",
	"nongKhai",
	"sakonNakhon",
	"siSaKet",
	"surin",
	"ubonRatchathani",
	"udonThani",
])

const eastProvinceIds = new Set(["chachoengsao", "prachinBuri"])
const westProvinceIds = new Set(["kanchanaburi", "prachuapKhiriKhan"])
const southProvinceIds = new Set(["chumphon", "suratThani"])
const centralProvinceIds = new Set(["lopburi", "phetchaburi"])

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
	const name = camp.name || `Camp ${camp.campID}`
	const imageSrc = camp.imgSrc.find(Boolean)

	return {
		campID: camp.campID,
		name,
		date: camp.date || "Date not recorded",
		location: camp.location || "Location details not recorded",
		director: camp.director || "Director not recorded",
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
			provinceName: camp.province === "Uttardit" ? "Uttaradit" : camp.province,
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
				description: `${latestVisit.location}. Latest recorded project: ${latestVisit.name}.`,
				imageSrc: latestVisit.imageSrc ?? fallbackCampMapImage,
			}
		})
		.sort((a, b) => a.provinceName.localeCompare(b.provinceName))
}

export const visitedProvinceSummaries = buildProvinceSummaries(KHCamps)

export const visitedProvinceSummaryById = new Map(
	visitedProvinceSummaries.map((summary) => [summary.provinceId, summary]),
)
