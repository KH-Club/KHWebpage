import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { CampDetailLoading } from "../CampDetailLoading"

describe("CampDetailLoading", () => {
	it("renders loading text", () => {
		render(<CampDetailLoading />)

		expect(screen.getByText("กำลังโหลดข้อมูลค่าย...")).toBeInTheDocument()
	})

	it("renders loading spinner", () => {
		render(<CampDetailLoading />)

		expect(screen.getByRole("status")).toBeInTheDocument()
	})

	it("spinner has correct accessibility label", () => {
		render(<CampDetailLoading />)

		expect(screen.getByLabelText("Loading")).toBeInTheDocument()
	})

	it("has centered layout", () => {
		const { container } = render(<CampDetailLoading />)

		expect(container.firstChild).toHaveClass("flex")
		expect(container.firstChild).toHaveClass("items-center")
		expect(container.firstChild).toHaveClass("justify-center")
	})

	it("has minimum full screen height", () => {
		const { container } = render(<CampDetailLoading />)

		expect(container.firstChild).toHaveClass("min-h-screen")
	})

	it("spinner has animation class", () => {
		render(<CampDetailLoading />)

		const spinner = screen.getByRole("status")
		expect(spinner).toHaveClass("animate-spin")
	})

	it("has gray background", () => {
		const { container } = render(<CampDetailLoading />)

		expect(container.firstChild).toHaveClass("bg-gray-50")
	})
})
