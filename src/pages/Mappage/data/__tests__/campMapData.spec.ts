import { describe, expect, it } from "vitest"
import {
	buildProvinceSummaries,
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
		expect(uttaradit?.provinceName).toBe("Uttaradit")
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
})
