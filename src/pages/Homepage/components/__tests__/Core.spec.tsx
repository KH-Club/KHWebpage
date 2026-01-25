import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import Core from "../Core"

describe("Core", () => {
	it("renders section with correct id", () => {
		render(<Core />)

		const section = document.getElementById("core-section")
		expect(section).toBeInTheDocument()
		expect(section?.tagName).toBe("SECTION")
	})

	it("renders Our Activities card", () => {
		render(<Core />)

		expect(
			screen.getByRole("heading", { name: "Our Activities" }),
		).toBeInTheDocument()
	})

	it("renders Our Vision card", () => {
		render(<Core />)

		expect(
			screen.getByRole("heading", { name: "Our Vision" }),
		).toBeInTheDocument()
	})

	it("renders Our Values card", () => {
		render(<Core />)

		expect(
			screen.getByRole("heading", { name: "Our Values" }),
		).toBeInTheDocument()
	})

	it("renders activities list items", () => {
		render(<Core />)

		expect(
			screen.getByText(/ค่ายอาสาพัฒนาโรงเรียนเเละชุมชน \(ปลายปี\)/),
		).toBeInTheDocument()
		expect(
			screen.getByText(/ค่ายอาสาพัฒนาโรงเรียนเเละชุมชน \(กลางปี\)/),
		).toBeInTheDocument()
		expect(screen.getByText(/กิจกรรมจิตอาสา 1 Days Trip/)).toBeInTheDocument()
	})

	it("renders values list items", () => {
		render(<Core />)

		expect(
			screen.getByText(/พัฒนาเเละส่งเสริมความเป็นจิตอาสา/),
		).toBeInTheDocument()
		expect(
			screen.getByText(/พัฒนาเเละส่งเสริมการเรียนรู้ทักษะใหม่ๆ/),
		).toBeInTheDocument()
		expect(
			screen.getByText(/พัฒนาเเละส่งเสริมความสัมพันธ์ของคนในชมรม/),
		).toBeInTheDocument()
	})

	it("renders vision description", () => {
		render(<Core />)

		expect(
			screen.getByText(/ชมรมของเรามีวิสัยทัศน์ที่จะเป็นเเรงขับเคลื่อนเล็กๆ/),
		).toBeInTheDocument()
	})

	it("renders all three info cards", () => {
		render(<Core />)

		const headings = screen.getAllByRole("heading", { level: 2 })
		expect(headings).toHaveLength(3)
	})

	it("has grid layout for cards", () => {
		const { container } = render(<Core />)

		const grid = container.querySelector(".grid")
		expect(grid).toBeInTheDocument()
		expect(grid).toHaveClass("md:grid-cols-3")
	})
})
