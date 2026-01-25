import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import ActivityCard from "../ActivityCard"

describe("ActivityCard", () => {
	const defaultProps = {
		name: "Test Activity",
		imgSrc: "/test-image.jpg",
		description: "Test description",
		onClick: vi.fn(),
	}

	it("renders activity name", () => {
		render(<ActivityCard {...defaultProps} />)

		expect(screen.getByText("Test Activity")).toBeInTheDocument()
	})

	it("renders image with correct src and alt", () => {
		render(<ActivityCard {...defaultProps} />)

		const img = screen.getByRole("img")
		expect(img).toHaveAttribute("src", "/test-image.jpg")
		expect(img).toHaveAttribute("alt", "Test Activity")
	})

	it("calls onClick when card is clicked", () => {
		const onClick = vi.fn()
		render(<ActivityCard {...defaultProps} onClick={onClick} />)

		const card = screen.getByText("Test Activity").closest("div")
		fireEvent.click(card!)

		expect(onClick).toHaveBeenCalledTimes(1)
	})

	it("has cursor-pointer class for clickable indication", () => {
		const { container } = render(<ActivityCard {...defaultProps} />)

		expect(container.firstChild).toHaveClass("cursor-pointer")
	})

	it("has hover scale effect", () => {
		const { container } = render(<ActivityCard {...defaultProps} />)

		expect(container.firstChild).toHaveClass("hover:scale-105")
	})

	it("renders with overlay for text visibility", () => {
		const { container } = render(<ActivityCard {...defaultProps} />)

		const overlay = container.querySelector(".bg-black")
		expect(overlay).toBeInTheDocument()
		expect(overlay).toHaveClass("bg-opacity-50")
	})

	it("displays name in white text", () => {
		render(<ActivityCard {...defaultProps} />)

		const name = screen.getByText("Test Activity")
		expect(name).toHaveClass("text-white")
	})

	it("image has proper styling", () => {
		render(<ActivityCard {...defaultProps} />)

		const img = screen.getByRole("img")
		expect(img).toHaveClass("h-64")
		expect(img).toHaveClass("w-full")
		expect(img).toHaveClass("rounded-lg")
		expect(img).toHaveClass("object-cover")
	})
})
