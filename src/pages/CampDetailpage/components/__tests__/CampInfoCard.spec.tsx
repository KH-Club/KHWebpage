import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { CampInfoCard } from "../CampInfoCard"

describe("CampInfoCard", () => {
	const defaultProps = {
		icon: <span data-testid="test-icon">Icon</span>,
		iconBgColor: "bg-blue-100",
		title: "Test Title",
		value: "Test Value",
	}

	it("renders title correctly", () => {
		render(<CampInfoCard {...defaultProps} />)

		expect(screen.getByText("Test Title")).toBeInTheDocument()
	})

	it("renders value correctly", () => {
		render(<CampInfoCard {...defaultProps} />)

		expect(screen.getByText("Test Value")).toBeInTheDocument()
	})

	it("renders icon", () => {
		render(<CampInfoCard {...defaultProps} />)

		expect(screen.getByTestId("test-icon")).toBeInTheDocument()
	})

	it("applies icon background color", () => {
		const { container } = render(<CampInfoCard {...defaultProps} />)

		const iconContainer = container.querySelector(".bg-blue-100")
		expect(iconContainer).toBeInTheDocument()
	})

	it("has correct card styling", () => {
		const { container } = render(<CampInfoCard {...defaultProps} />)

		expect(container.firstChild).toHaveClass("rounded-2xl")
		expect(container.firstChild).toHaveClass("bg-white")
		expect(container.firstChild).toHaveClass("p-6")
		expect(container.firstChild).toHaveClass("shadow-md")
	})

	it("renders title as h3 with correct styling", () => {
		render(<CampInfoCard {...defaultProps} />)

		const title = screen.getByText("Test Title")
		expect(title.tagName).toBe("H3")
		expect(title).toHaveClass("font-semibold")
		expect(title).toHaveClass("text-gray-900")
	})

	it("renders value with correct styling", () => {
		render(<CampInfoCard {...defaultProps} />)

		const value = screen.getByText("Test Value")
		expect(value.tagName).toBe("P")
		expect(value).toHaveClass("text-gray-700")
	})

	it("works with different icon background colors", () => {
		const { container, rerender } = render(
			<CampInfoCard {...defaultProps} iconBgColor="bg-green-100" />,
		)
		expect(container.querySelector(".bg-green-100")).toBeInTheDocument()

		rerender(<CampInfoCard {...defaultProps} iconBgColor="bg-purple-100" />)
		expect(container.querySelector(".bg-purple-100")).toBeInTheDocument()
	})

	it("renders long text values correctly", () => {
		const longValue =
			"This is a very long value that should still render correctly"
		render(<CampInfoCard {...defaultProps} value={longValue} />)

		expect(screen.getByText(longValue)).toBeInTheDocument()
	})
})
