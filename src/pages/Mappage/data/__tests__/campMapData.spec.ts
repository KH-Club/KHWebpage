import { describe, expect, it } from "vitest"
import { provinces } from "@/assets/data/provinces"
import {
	buildProvinceSummaries,
	getExplorePercent,
	getMapStats,
	getProvinceDisplayName,
	getVisitFill,
	isRegionConfigured,
	toProvinceId,
	visitedProvinceSummaries,
} from "../campMapData"

describe("camp map data", () => {
	it("normalizes known camp province names to province geometry ids", () => {
		expect(toProvinceId("Uttaradit")).toBe("uttaradit")
		expect(toProvinceId("Uttardit")).toBe("uttaradit")
		expect(toProvinceId("Nong Bua Lamphu")).toBe("nongBuaLamPhu")
		expect(toProvinceId("Si Sa Ket")).toBe("siSaKet")
	})

	it("builds visited province summaries from real camp data", () => {
		const uttaradit = visitedProvinceSummaries.find(
			(summary) => summary.provinceId === "uttaradit",
		)

		expect(uttaradit).toBeDefined()
		expect(uttaradit?.provinceName).toBe(getProvinceDisplayName("uttaradit"))
		expect(uttaradit?.provinceName).not.toBe("Uttaradit")
		expect(uttaradit?.visitCount).toBe(2)
		expect(uttaradit?.latestVisit.campID).toBe(53)
		expect(uttaradit?.latestVisit.detailHref).toBe("/camp/53")
	})

	it("skips camps without province data", () => {
		const summaries = buildProvinceSummaries([
			{
				campID: 1,
				name: "",
				date: "",
				location: "",
				director: "",
				province: "",
				isMainCamp: false,
				imgSrc: [],
			},
		])

		expect(summaries).toEqual([])
	})

	it("has an explicit region classification for every visited province", () => {
		const unconfiguredProvinceIds = visitedProvinceSummaries
			.filter((summary) => !isRegionConfigured(summary.provinceId))
			.map((summary) => summary.provinceId)

		expect(unconfiguredProvinceIds).toEqual([])
	})

	it("does not include unused label paths in the province payload", () => {
		expect(provinces.some((province) => "labelPath" in province)).toBe(false)
	})

	it("computes explore percent from visited and total provinces", () => {
		expect(getExplorePercent(29, 77)).toBe(38)
		expect(getExplorePercent(0, 77)).toBe(0)
		expect(getExplorePercent(10, 0)).toBe(0)
	})

	it("aggregates map stats from province summaries", () => {
		const stats = getMapStats(visitedProvinceSummaries, provinces.length)

		expect(stats.visitedCount).toBe(visitedProvinceSummaries.length)
		expect(stats.totalProvinces).toBe(provinces.length)
		expect(stats.unvisitedCount).toBe(
			provinces.length - visitedProvinceSummaries.length,
		)
		expect(stats.campRecords).toBe(
			visitedProvinceSummaries.reduce((sum, s) => sum + s.visitCount, 0),
		)
		expect(stats.explorePercent).toBe(
			getExplorePercent(stats.visitedCount, stats.totalProvinces),
		)
	})

	it("returns visit-intensity fills for choropleth levels", () => {
		expect(getVisitFill(0)).toBe("#E5E7EB")
		expect(getVisitFill(1)).toBe("#3B82F6")
		expect(getVisitFill(2)).toBe("#2563EB")
		expect(getVisitFill(3)).toBe("#1D4ED8")
		expect(getVisitFill(5)).toBe("#1D4ED8")
	})
})
