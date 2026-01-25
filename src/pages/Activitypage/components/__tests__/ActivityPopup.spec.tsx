import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import ActivityPopup from "../ActivityPopup"

describe("ActivityPopup", () => {
	const defaultProps = {
		name: "Test Activity",
		imgSrc: "/test-image.jpg",
		description: "Test description text",
		onClose: vi.fn(),
	}

	it("renders activity name as heading", () => {
		render(<ActivityPopup {...defaultProps} />)

		expect(
			screen.getByRole("heading", { name: "Test Activity" }),
		).toBeInTheDocument()
	})

	it("renders image with correct src and alt", () => {
		render(<ActivityPopup {...defaultProps} />)

		const img = screen.getByRole("img")
		expect(img).toHaveAttribute("src", "/test-image.jpg")
		expect(img).toHaveAttribute("alt", "Test Activity")
	})

	it("renders description", () => {
		render(<ActivityPopup {...defaultProps} />)

		expect(screen.getByText("Test description text")).toBeInTheDocument()
	})

	it("renders close button", () => {
		render(<ActivityPopup {...defaultProps} />)

		expect(screen.getByRole("button")).toBeInTheDocument()
	})

	it("calls onClose when close button is clicked", () => {
		const onClose = vi.fn()
		render(<ActivityPopup {...defaultProps} onClose={onClose} />)

		const closeButton = screen.getByRole("button")
		fireEvent.click(closeButton)

		expect(onClose).toHaveBeenCalledTimes(1)
	})

	it("has fixed positioning for modal overlay", () => {
		const { container } = render(<ActivityPopup {...defaultProps} />)

		expect(container.firstChild).toHaveClass("fixed")
		expect(container.firstChild).toHaveClass("inset-0")
		expect(container.firstChild).toHaveClass("z-50")
	})

	it("has dark background overlay", () => {
		const { container } = render(<ActivityPopup {...defaultProps} />)

		expect(container.firstChild).toHaveClass("bg-black")
		expect(container.firstChild).toHaveClass("bg-opacity-75")
	})

	it("has centered content", () => {
		const { container } = render(<ActivityPopup {...defaultProps} />)

		expect(container.firstChild).toHaveClass("flex")
		expect(container.firstChild).toHaveClass("items-center")
		expect(container.firstChild).toHaveClass("justify-center")
	})

	it("has white background for content card", () => {
		const { container } = render(<ActivityPopup {...defaultProps} />)

		const card = container.querySelector(".bg-white")
		expect(card).toBeInTheDocument()
	})

	it("close button shows × character", () => {
		render(<ActivityPopup {...defaultProps} />)

		const closeButton = screen.getByRole("button")
		expect(closeButton).toHaveTextContent("×")
	})
})
