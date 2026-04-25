import { describe, expect, it } from "vitest"
import { fireEvent, render, screen, within } from "@/test/test-utils"
import {
	getProvinceDisplayName,
	visitedProvinceSummaryById,
} from "../data/campMapData"
import MapPage from "../page"

function escapeRegExp(value: string) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function getRequiredProvinceSummary(provinceId: string) {
	const summary = visitedProvinceSummaryById.get(provinceId)

	if (!summary) {
		throw new Error(`Expected ${provinceId} to be a visited province`)
	}

	return summary
}

describe("MapPage", () => {
	it("renders the interactive map and selects a province from the list", () => {
		const sakonNakhon = getRequiredProvinceSummary("sakonNakhon")

		render(<MapPage />)

		expect(
			screen.getByRole("heading", {
				name: /แผนที่ร่องรอยค่ายอาสาทั่วประเทศไทย/i,
			}),
		).toBeInTheDocument()
		expect(
			screen.getByRole("region", {
				name: /แผนที่จังหวัดที่ชมรมค่ายหอเคยไป/i,
			}),
		).toBeInTheDocument()

		const visitedProvinceList = screen.getByRole("region", {
			name: /เลือกจังหวัดเพื่อดูรายละเอียด/i,
		})

		fireEvent.click(
			within(visitedProvinceList).getByRole("button", {
				name: new RegExp(escapeRegExp(sakonNakhon.provinceName), "i"),
			}),
		)

		expect(
			screen.getByRole("heading", { name: sakonNakhon.provinceName }),
		).toBeInTheDocument()
		expect(
			screen.getByRole("link", { name: /ดูรายละเอียดค่ายล่าสุด/i }),
		).toHaveAttribute("href", "/camp/54")
	})

	it("keeps province controls exposed inside a labelled map region", () => {
		const sakonNakhon = getRequiredProvinceSummary("sakonNakhon")

		render(<MapPage />)

		const mapRegion = screen.getByRole("region", {
			name: /แผนที่จังหวัดที่ชมรมค่ายหอเคยไป/i,
		})

		expect(within(mapRegion).queryByRole("img")).not.toBeInTheDocument()
		expect(
			within(mapRegion).getByRole("button", {
				name: new RegExp(
					`${escapeRegExp(sakonNakhon.provinceName)}: .*${
						sakonNakhon.visitCount
					}`,
					"i",
				),
			}),
		).toBeInTheDocument()
	})

	it("shows a simple visited/not visited legend without region labels", () => {
		render(<MapPage />)

		expect(screen.getByText("เคยไปแล้ว")).toBeInTheDocument()
		expect(screen.getByText("ยังไม่เคยไป")).toBeInTheDocument()
		expect(screen.queryByText("North")).not.toBeInTheDocument()
		expect(screen.queryByText("Northeast")).not.toBeInTheDocument()
	})

	it("clears selected province with Escape", () => {
		const sakonNakhon = getRequiredProvinceSummary("sakonNakhon")

		render(<MapPage />)

		const visitedProvinceList = screen.getByRole("region", {
			name: /เลือกจังหวัดเพื่อดูรายละเอียด/i,
		})

		fireEvent.click(
			within(visitedProvinceList).getByRole("button", {
				name: new RegExp(escapeRegExp(sakonNakhon.provinceName), "i"),
			}),
		)
		expect(
			screen.getByText(/ค่ายที่บันทึกไว้ในจังหวัดนี้/i),
		).toBeInTheDocument()

		fireEvent.keyDown(window, { key: "Escape" })

		expect(screen.getByText(/เลือกจังหวัดที่เคยไปแล้ว/i)).toBeInTheDocument()
	})

	it("selects a visited province from the SVG map with keyboard support", () => {
		const sakonNakhon = getRequiredProvinceSummary("sakonNakhon")
		const bangkokName = getProvinceDisplayName("bangkok", "Bangkok")

		render(<MapPage />)

		const sakonNakhonPath = screen.getByRole("button", {
			name: new RegExp(
				`${escapeRegExp(sakonNakhon.provinceName)}: .*${
					sakonNakhon.visitCount
				}`,
				"i",
			),
		})

		expect(sakonNakhonPath).toHaveAttribute("tabindex", "0")

		fireEvent.keyDown(sakonNakhonPath, { key: "Enter" })

		expect(
			screen.getByRole("heading", { name: sakonNakhon.provinceName }),
		).toBeInTheDocument()
		expect(
			screen.queryByRole("button", {
				name: new RegExp(`${escapeRegExp(bangkokName)}:`, "i"),
			}),
		).not.toBeInTheDocument()
	})
})
