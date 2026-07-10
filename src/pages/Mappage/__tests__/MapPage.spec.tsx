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
				name: /แผนที่ความทรงจำค่ายอาสา/i,
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

		const legend = screen.getByLabelText(/คำอธิบายแผนที่/i)
		expect(within(legend).getByText("เคยไปแล้ว")).toBeInTheDocument()
		expect(within(legend).getByText("ยังไม่เคยไป")).toBeInTheDocument()
		expect(screen.queryByText("North")).not.toBeInTheDocument()
		expect(screen.queryByText("Northeast")).not.toBeInTheDocument()
	})

	it("renders memory map stats and mode chips", () => {
		render(<MapPage />)

		expect(
			screen.getByLabelText(/สถิติแผนที่ความทรงจำ/i),
		).toBeInTheDocument()
		expect(
			screen.getByRole("button", { name: /สำรวจจังหวัดที่เคยไป/i }),
		).toBeInTheDocument()
		expect(
			screen.getByRole("button", { name: /แสดงจังหวัดที่ยังไม่เคยไป/i }),
		).toBeInTheDocument()

		const visitedChip = screen.getByRole("button", {
			name: /สำรวจจังหวัดที่เคยไป/i,
		})
		fireEvent.click(visitedChip)
		expect(visitedChip).toHaveAttribute("aria-pressed", "true")
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
		expect(screen.getByText(/ไทม์ไลน์ค่ายในจังหวัดนี้/i)).toBeInTheDocument()

		fireEvent.keyDown(window, { key: "Escape" })

		expect(
			screen.getByRole("heading", { name: /^เลือกจังหวัด$/i }),
		).toBeInTheDocument()
		expect(
			screen.queryByText(/ไทม์ไลน์ค่ายในจังหวัดนี้/i),
		).not.toBeInTheDocument()
	})

	it("selects a visited province from the SVG map with keyboard support", () => {
		const sakonNakhon = getRequiredProvinceSummary("sakonNakhon")

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
	})

	it("exposes unvisited provinces as selectable map controls", () => {
		const bangkokName = getProvinceDisplayName("bangkok", "Bangkok")

		render(<MapPage />)

		const bangkokPath = screen.getByRole("button", {
			name: new RegExp(`${escapeRegExp(bangkokName)}: ยังไม่เคยไป`, "i"),
		})

		expect(bangkokPath).toHaveAttribute("tabindex", "0")
		fireEvent.click(bangkokPath)

		expect(
			screen.getByRole("heading", { name: bangkokName }),
		).toBeInTheDocument()
		expect(screen.getByText(/ยังไม่มีบันทึกค่ายอาสา/i)).toBeInTheDocument()
	})

	it("renders map zoom controls", () => {
		render(<MapPage />)

		const toolbar = screen.getByRole("toolbar", {
			name: /ตัวควบคุมแผนที่/i,
		})
		expect(
			within(toolbar).getByRole("button", { name: /ขยายแผนที่/i }),
		).toBeInTheDocument()
		expect(
			within(toolbar).getByRole("button", { name: /ย่อแผนที่/i }),
		).toBeInTheDocument()
		expect(
			within(toolbar).getByRole("button", { name: /รีเซ็ตมุมมองแผนที่/i }),
		).toBeInTheDocument()
		expect(
			within(toolbar).getByRole("button", { name: /พอดีทั้งประเทศไทย/i }),
		).toBeInTheDocument()
	})

	it("zooms focus when selecting a province from the list", () => {
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

		// Desktop panel shows timeline after list-driven selection
		expect(screen.getByText(/ไทม์ไลน์ค่ายในจังหวัดนี้/i)).toBeInTheDocument()
		expect(
			screen.getByRole("button", { name: /ปิดรายละเอียดจังหวัด/i }),
		).toBeInTheDocument()
	})
})
