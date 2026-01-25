import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { CampDetailError } from "../CampDetailError"

describe("CampDetailError", () => {
	const defaultProps = {
		onBack: vi.fn(),
	}

	it("renders error title", () => {
		render(<CampDetailError {...defaultProps} />)

		expect(screen.getByText("ไม่พบข้อมูลค่าย")).toBeInTheDocument()
	})

	it("renders default error message when no message provided", () => {
		render(<CampDetailError {...defaultProps} />)

		expect(
			screen.getByText("ไม่พบค่ายที่คุณต้องการ กรุณาลองใหม่อีกครั้ง"),
		).toBeInTheDocument()
	})

	it("renders custom error message when provided", () => {
		render(<CampDetailError {...defaultProps} message="Custom error message" />)

		expect(screen.getByText("Custom error message")).toBeInTheDocument()
	})

	it("renders back button", () => {
		render(<CampDetailError {...defaultProps} />)

		expect(
			screen.getByRole("button", { name: /กลับไปหน้าค่ายทั้งหมด/i }),
		).toBeInTheDocument()
	})

	it("calls onBack when button is clicked", () => {
		const onBack = vi.fn()
		render(<CampDetailError onBack={onBack} />)

		const button = screen.getByRole("button", {
			name: /กลับไปหน้าค่ายทั้งหมด/i,
		})
		fireEvent.click(button)

		expect(onBack).toHaveBeenCalledTimes(1)
	})

	it("renders sad face emoji", () => {
		render(<CampDetailError {...defaultProps} />)

		expect(screen.getByLabelText("Sad face")).toBeInTheDocument()
	})

	it("has centered layout", () => {
		const { container } = render(<CampDetailError {...defaultProps} />)

		expect(container.firstChild).toHaveClass("flex")
		expect(container.firstChild).toHaveClass("items-center")
		expect(container.firstChild).toHaveClass("justify-center")
	})

	it("has card styling", () => {
		const { container } = render(<CampDetailError {...defaultProps} />)

		const card = container.querySelector(".rounded-2xl")
		expect(card).toBeInTheDocument()
		expect(card).toHaveClass("bg-white")
		expect(card).toHaveClass("shadow-lg")
	})

	it("has minimum full screen height", () => {
		const { container } = render(<CampDetailError {...defaultProps} />)

		expect(container.firstChild).toHaveClass("min-h-screen")
	})

	it("renders error icon container with red background", () => {
		const { container } = render(<CampDetailError {...defaultProps} />)

		const iconContainer = container.querySelector(".bg-red-100")
		expect(iconContainer).toBeInTheDocument()
	})
})
