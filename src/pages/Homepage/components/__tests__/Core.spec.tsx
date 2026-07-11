import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Core from "../Core"

describe("Core", () => {
	it("renders the core section", () => {
		render(<Core />)
		expect(document.getElementById("core-section")).toBeInTheDocument()
	})

	it.each(["Our Activities", "Our Vision", "Our Values"])(
		"renders %s",
		(title) => {
			render(<Core />)
			expect(screen.getByRole("heading", { name: title })).toBeInTheDocument()
		},
	)

	it("renders the activity options", () => {
		render(<Core />)
		expect(
			screen.getByText("ค่ายอาสาพัฒนาโรงเรียนและชุมชน (ปลายปี)"),
		).toBeInTheDocument()
		expect(
			screen.getByText("ค่ายอาสาพัฒนาโรงเรียนและชุมชน (กลางปี)"),
		).toBeInTheDocument()
		expect(screen.getByText("กิจกรรมจิตอาสา 1 Days Trip")).toBeInTheDocument()
	})

	it("renders the club values", () => {
		render(<Core />)
		expect(screen.getByText("ช่วยเหลือสังคมด้วยหัวใจอาสา")).toBeInTheDocument()
		expect(
			screen.getByText("เรียนรู้ทักษะใหม่จากการลงมือทำ"),
		).toBeInTheDocument()
		expect(
			screen.getByText("สร้างความสัมพันธ์ของคนในชมรมและชุมชน"),
		).toBeInTheDocument()
	})

	it("renders the revised vision description", () => {
		render(<Core />)
		expect(
			screen.getByText(/เราอยากเป็นแรงขับเคลื่อนเล็ก ๆ/),
		).toBeInTheDocument()
	})

	it("uses the responsive three-column layout", () => {
		const { container } = render(<Core />)
		expect(container.querySelector(".core-values-grid")).toHaveClass(
			"md:grid-cols-3",
		)
	})
})
