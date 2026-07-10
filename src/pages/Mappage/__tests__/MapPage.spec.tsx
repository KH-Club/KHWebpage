import { describe, expect, it } from "vitest"
import { fireEvent, render, screen, waitFor, within } from "@/test/test-utils"
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
	it("renders immersive stage and selects a province from the explorer", () => {
		const sakonNakhon = getRequiredProvinceSummary("sakonNakhon")

		render(<MapPage />)

		expect(
			screen.getByRole("heading", {
				name: /ร่องรอยค่ายหอทั่วไทย/i,
			}),
		).toBeInTheDocument()
		expect(
			screen.getByRole("region", {
				name: /เวทีแผนที่ความทรงจำ/i,
			}),
		).toBeInTheDocument()
		expect(
			screen.getByRole("region", {
				name: /แผนที่จังหวัดที่ชมรมค่ายหอเคยไป/i,
			}),
		).toBeInTheDocument()

		const archiveList = screen.getByRole("region", {
			name: /สำรวจจังหวัดทั่วประเทศไทย|เลือกจังหวัดเพื่อดูรายละเอียด/i,
		})

		fireEvent.click(
			within(archiveList).getByRole("button", {
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

	it("renders inline journey progress and map mode controls", () => {
		render(<MapPage />)

		expect(screen.getByRole("progressbar")).toBeInTheDocument()

		const modeGroup = screen.getByRole("group", {
			name: /ตัวกรองมุมมองแผนที่/i,
		})
		const visitedChip = within(modeGroup).getByRole("button", {
			name: /^เคยไปแล้ว$/i,
		})
		const unvisitedChip = within(modeGroup).getByRole("button", {
			name: /ยังไม่เคยไป/i,
		})
		expect(visitedChip).toBeInTheDocument()
		expect(unvisitedChip).toBeInTheDocument()

		fireEvent.click(visitedChip)
		expect(visitedChip).toHaveAttribute("aria-pressed", "true")
	})

	it("clears selected province with Escape", async () => {
		const sakonNakhon = getRequiredProvinceSummary("sakonNakhon")

		render(<MapPage />)

		const archiveList = screen.getByRole("region", {
			name: /สำรวจจังหวัดทั่วประเทศไทย|เลือกจังหวัดเพื่อดูรายละเอียด/i,
		})

		fireEvent.click(
			within(archiveList).getByRole("button", {
				name: new RegExp(escapeRegExp(sakonNakhon.provinceName), "i"),
			}),
		)
		expect(screen.getByText(/ไทม์ไลน์ค่ายในจังหวัดนี้/i)).toBeInTheDocument()

		fireEvent.keyDown(window, { key: "Escape" })

		// Floating story card may animate out via AnimatePresence
		await waitFor(() => {
			expect(
				screen.queryByText(/ไทม์ไลน์ค่ายในจังหวัดนี้/i),
			).not.toBeInTheDocument()
		})
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
			within(toolbar).getByRole("button", { name: /พอดีทั้งประเทศไทย/i }),
		).toBeInTheDocument()
	})

	it("zooms focus when selecting a province from the list", () => {
		const sakonNakhon = getRequiredProvinceSummary("sakonNakhon")

		render(<MapPage />)

		const archiveList = screen.getByRole("region", {
			name: /สำรวจจังหวัดทั่วประเทศไทย|เลือกจังหวัดเพื่อดูรายละเอียด/i,
		})

		fireEvent.click(
			within(archiveList).getByRole("button", {
				name: new RegExp(escapeRegExp(sakonNakhon.provinceName), "i"),
			}),
		)

		expect(screen.getByText(/ไทม์ไลน์ค่ายในจังหวัดนี้/i)).toBeInTheDocument()
		expect(
			screen.getByRole("button", { name: /ปิดรายละเอียดจังหวัด/i }),
		).toBeInTheDocument()
	})

	it("filters archive list by status and search", async () => {
		const bangkokName = getProvinceDisplayName("bangkok", "Bangkok")

		render(<MapPage />)

		const archiveList = screen.getByRole("region", {
			name: /สำรวจจังหวัดทั่วประเทศไทย|เลือกจังหวัดเพื่อดูรายละเอียด/i,
		})

		// Status tabs (explorer) — pick unvisited
		const unvisitedTab = within(archiveList).getByRole("tab", {
			name: /ยังไม่เคยไป/i,
		})
		fireEvent.click(unvisitedTab)

		const search = within(archiveList).getByPlaceholderText(/ค้นหาจังหวัด/i)
		fireEvent.change(search, { target: { value: bangkokName } })

		await waitFor(() => {
			expect(
				within(archiveList).getByRole("button", {
					name: new RegExp(`${escapeRegExp(bangkokName)}.*ยังไม่เคยไป`, "i"),
				}),
			).toBeInTheDocument()
		})
	})
})
