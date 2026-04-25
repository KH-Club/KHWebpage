import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@/test/test-utils"
import MapPage from "../page"

describe("MapPage", () => {
	it("renders the interactive map and selects a province from the list", () => {
		render(<MapPage />)

		expect(
			screen.getByRole("heading", {
				name: /แผนที่ร่องรอยค่ายอาสาทั่วประเทศไทย/i,
			}),
		).toBeInTheDocument()
		expect(
			screen.getByRole("img", {
				name: /แผนที่จังหวัดที่ชมรมค่ายหอเคยไป/i,
			}),
		).toBeInTheDocument()

		fireEvent.click(
			screen.getByRole("button", {
				name: /เลือกจังหวัด Sakon Nakhon จากรายชื่อจังหวัดที่เคยไปแล้ว/i,
			}),
		)

		expect(
			screen.getByRole("heading", { name: "Sakon Nakhon" }),
		).toBeInTheDocument()
		expect(
			screen.getByRole("link", { name: /ดูรายละเอียดค่ายล่าสุด/i }),
		).toHaveAttribute("href", "/camp/54")
	})

	it("shows a simple visited/not visited legend without region labels", () => {
		render(<MapPage />)

		expect(screen.getByText("เคยไปแล้ว")).toBeInTheDocument()
		expect(screen.getByText("ยังไม่เคยไป")).toBeInTheDocument()
		expect(screen.queryByText("North")).not.toBeInTheDocument()
		expect(screen.queryByText("Northeast")).not.toBeInTheDocument()
	})

	it("clears selected province with Escape", () => {
		render(<MapPage />)

		fireEvent.click(
			screen.getByRole("button", {
				name: /เลือกจังหวัด Sakon Nakhon จากรายชื่อจังหวัดที่เคยไปแล้ว/i,
			}),
		)
		expect(
			screen.getByText(/ค่ายที่บันทึกไว้ในจังหวัดนี้/i),
		).toBeInTheDocument()

		fireEvent.keyDown(window, { key: "Escape" })

		expect(screen.getByText(/เลือกจังหวัดที่เคยไปแล้ว/i)).toBeInTheDocument()
	})

	it("selects a visited province from the SVG map with keyboard support", () => {
		render(<MapPage />)

		const sakonNakhonPath = screen.getByRole("button", {
			name: /Sakon Nakhon: มีบันทึกค่าย \d+ ครั้ง/i,
		})

		expect(sakonNakhonPath).toHaveAttribute("tabindex", "0")

		fireEvent.keyDown(sakonNakhonPath, { key: "Enter" })

		expect(
			screen.getByRole("heading", { name: "Sakon Nakhon" }),
		).toBeInTheDocument()
		expect(
			screen.queryByRole("button", {
				name: /Bangkok: มีบันทึกค่าย \d+ ครั้ง/i,
			}),
		).not.toBeInTheDocument()
	})
})
