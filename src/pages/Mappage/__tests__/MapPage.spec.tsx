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
	it("renders immersive stage and selects a province from the explorer", async () => {
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
			await screen.findByRole("heading", { name: sakonNakhon.provinceName }),
		).toBeInTheDocument()
		expect(screen.getByRole("link", { name: /ดูความทรงจำ/i })).toHaveAttribute(
			"href",
			"/camp/54",
		)
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
		expect(
			await screen.findByRole("dialog", {
				name: new RegExp(`รายละเอียดจังหวัด${sakonNakhon.provinceName}`),
			}),
		).toBeInTheDocument()

		fireEvent.keyDown(window, { key: "Escape" })

		// Anchored callout may animate out via AnimatePresence
		await waitFor(() => {
			expect(
				screen.queryByRole("dialog", {
					name: new RegExp(`รายละเอียดจังหวัด${sakonNakhon.provinceName}`),
				}),
			).not.toBeInTheDocument()
		})
	})

	it("closes the anchored callout from its close button and empty map space", async () => {
		const sakonNakhon = getRequiredProvinceSummary("sakonNakhon")
		render(<MapPage />)

		const mapRegion = screen.getByRole("region", {
			name: /แผนที่จังหวัดที่ชมรมค่ายหอเคยไป/i,
		})
		const provincePath = within(mapRegion).getByRole("button", {
			name: new RegExp(escapeRegExp(sakonNakhon.provinceName), "i"),
		})

		fireEvent.click(provincePath)
		await screen.findByRole("dialog")
		fireEvent.click(
			screen.getByRole("button", { name: /ปิดรายละเอียดจังหวัด/i }),
		)
		await waitFor(() =>
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
		)

		fireEvent.click(provincePath)
		await screen.findByRole("dialog")
		const mapSvg = mapRegion.querySelector('svg[viewBox="0 0 1400 2500"]')
		expect(mapSvg).not.toBeNull()
		fireEvent.click(mapSvg as SVGSVGElement)
		await waitFor(() =>
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
		)
	})

	it("selects a visited province from the SVG map with keyboard support", async () => {
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
			await screen.findByRole("heading", { name: sakonNakhon.provinceName }),
		).toBeInTheDocument()
	})

	it("exposes unvisited provinces as selectable map controls", async () => {
		const bangkokName = getProvinceDisplayName("bangkok", "Bangkok")

		render(<MapPage />)

		const bangkokPath = screen.getByRole("button", {
			name: new RegExp(`${escapeRegExp(bangkokName)}: ยังไม่เคยไป`, "i"),
		})

		expect(bangkokPath).toHaveAttribute("tabindex", "0")
		fireEvent.click(bangkokPath)

		expect(
			await screen.findByRole("heading", { name: bangkokName }),
		).toBeInTheDocument()
		expect(screen.getByText(/ยังไม่มีบันทึกค่าย/i)).toBeInTheDocument()
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

	it("zooms focus when selecting a province from the list", async () => {
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

		expect(await screen.findByText(/ร่องรอยล่าสุด/i)).toBeInTheDocument()
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
