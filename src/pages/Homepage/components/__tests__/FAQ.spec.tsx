import { describe, it, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import FAQSection from "../FAQSection"

describe("FAQSection", () => {
	it("renders the FAQ section header", () => {
		render(<FAQSection />)

		expect(screen.getByText("FAQ")).toBeInTheDocument()
		expect(
			screen.getByRole("heading", { level: 2, name: "คำถามที่พบบ่อย" }),
		).toBeInTheDocument()
	})

	it("renders all FAQ questions as accessible buttons", () => {
		render(<FAQSection />)

		expect(
			screen.getByRole("button", { name: "ใครสมัครค่ายได้บ้าง?" }),
		).toBeInTheDocument()
		expect(
			screen.getByRole("button", {
				name: "ต้องมีประสบการณ์ออกค่ายมาก่อนไหม?",
			}),
		).toBeInTheDocument()
		expect(
			screen.getByRole("button", { name: "มีค่าใช้จ่ายในการเข้าร่วมไหม?" }),
		).toBeInTheDocument()
		expect(
			screen.getByRole("button", { name: "ต้องเตรียมอะไรไปบ้าง?" }),
		).toBeInTheDocument()
		expect(
			screen.getByRole("button", { name: "เรื่องความปลอดภัยดูแลอย่างไร?" }),
		).toBeInTheDocument()
	})

	it("keeps one item open at a time", () => {
		render(<FAQSection />)

		const firstQuestion = screen.getByRole("button", {
			name: "ใครสมัครค่ายได้บ้าง?",
		})
		const secondQuestion = screen.getByRole("button", {
			name: "ต้องมีประสบการณ์ออกค่ายมาก่อนไหม?",
		})

		expect(firstQuestion).toHaveAttribute("aria-expanded", "true")
		expect(secondQuestion).toHaveAttribute("aria-expanded", "false")

		fireEvent.click(secondQuestion)

		expect(firstQuestion).toHaveAttribute("aria-expanded", "false")
		expect(secondQuestion).toHaveAttribute("aria-expanded", "true")
		expect(
			screen.getByText("ทีมงานจะช่วยแนะนำบทบาทและเตรียมความพร้อมก่อนลงพื้นที่"),
		).toBeInTheDocument()
	})
})
