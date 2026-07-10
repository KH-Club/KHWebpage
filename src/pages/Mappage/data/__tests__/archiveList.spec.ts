import { describe, expect, it } from "vitest"
import { provinces } from "@/assets/data/provinces"
import {
	allArchiveProvinceCards,
	buildArchiveProvinceCards,
	filterAndSortArchiveCards,
} from "../archiveList"
import { visitedProvinceSummaries } from "../campMapData"

describe("archive list data", () => {
	it("builds one card per Thailand province", () => {
		const cards = buildArchiveProvinceCards()
		expect(cards).toHaveLength(provinces.length)
		expect(allArchiveProvinceCards).toHaveLength(provinces.length)
	})

	it("marks visited provinces with visit counts from camp data", () => {
		const cards = buildArchiveProvinceCards()
		const visitedIds = new Set(
			visitedProvinceSummaries.map((summary) => summary.provinceId),
		)
		const visitedCards = cards.filter((card) => card.isVisited)

		expect(visitedCards.length).toBe(visitedProvinceSummaries.length)
		for (const card of visitedCards) {
			expect(visitedIds.has(card.provinceId)).toBe(true)
			expect(card.visitCount).toBeGreaterThan(0)
			expect(card.latestVisitName).toBeTruthy()
		}
	})

	it("filters by status and search query", () => {
		const unvisited = filterAndSortArchiveCards(allArchiveProvinceCards, {
			query: "",
			region: "all",
			status: "unvisited",
			sort: "alphabetical",
		})
		expect(unvisited.every((card) => !card.isVisited)).toBe(true)
		expect(unvisited.length).toBe(
			provinces.length - visitedProvinceSummaries.length,
		)

		const sakon = filterAndSortArchiveCards(allArchiveProvinceCards, {
			query: "สกล",
			region: "all",
			status: "all",
			sort: "alphabetical",
		})
		expect(sakon.some((card) => card.provinceId === "sakonNakhon")).toBe(true)
	})

	it("sorts by most visited first", () => {
		const sorted = filterAndSortArchiveCards(allArchiveProvinceCards, {
			query: "",
			region: "all",
			status: "visited",
			sort: "mostVisited",
		})

		for (let i = 1; i < sorted.length; i += 1) {
			expect(sorted[i - 1].visitCount).toBeGreaterThanOrEqual(
				sorted[i].visitCount,
			)
		}
	})

	it("puts unvisited provinces after visited when sorting by recent", () => {
		const sorted = filterAndSortArchiveCards(allArchiveProvinceCards, {
			query: "",
			region: "all",
			status: "all",
			sort: "recentlyVisited",
		})

		const firstUnvisitedIndex = sorted.findIndex((card) => !card.isVisited)
		if (firstUnvisitedIndex === -1) return

		const visitedAfter = sorted
			.slice(firstUnvisitedIndex)
			.some((card) => card.isVisited)
		expect(visitedAfter).toBe(false)
	})
})
