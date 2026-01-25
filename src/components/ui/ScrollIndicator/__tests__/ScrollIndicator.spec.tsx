import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ScrollIndicator } from "../ScrollIndicator"

describe("ScrollIndicator", () => {
	it("renders with default text", () => {
		render(<ScrollIndicator />)

		expect(screen.getByText("Scroll to explore")).toBeInTheDocument()
	})

	it("renders with custom text", () => {
		render(<ScrollIndicator text="Scroll down" />)

		expect(screen.getByText("Scroll down")).toBeInTheDocument()
		expect(screen.queryByText("Scroll to explore")).not.toBeInTheDocument()
	})

	it("applies base styling classes", () => {
		const { container } = render(<ScrollIndicator />)

		expect(container.firstChild).toHaveClass("flex")
		expect(container.firstChild).toHaveClass("flex-col")
		expect(container.firstChild).toHaveClass("items-center")
		expect(container.firstChild).toHaveClass("gap-2")
	})

	it("applies custom className", () => {
		const { container } = render(<ScrollIndicator className="custom-class" />)

		expect(container.firstChild).toHaveClass("custom-class")
	})

	it("preserves base classes when adding custom className", () => {
		const { container } = render(<ScrollIndicator className="custom-class" />)

		expect(container.firstChild).toHaveClass("flex")
		expect(container.firstChild).toHaveClass("custom-class")
	})

	it("has text with uppercase styling", () => {
		render(<ScrollIndicator />)

		const text = screen.getByText("Scroll to explore")
		expect(text).toHaveClass("uppercase")
		expect(text).toHaveClass("tracking-widest")
	})

	it("contains animated bounce element", () => {
		const { container } = render(<ScrollIndicator />)

		const bounceElement = container.querySelector(".animate-bounce")
		expect(bounceElement).toBeInTheDocument()
	})

	it("has scroll indicator container with border", () => {
		const { container } = render(<ScrollIndicator />)

		const indicatorContainer = container.querySelector(".border-2")
		expect(indicatorContainer).toBeInTheDocument()
		expect(indicatorContainer).toHaveClass("rounded-full")
	})

	it("renders empty text correctly", () => {
		render(<ScrollIndicator text="" />)

		const { container } = render(<ScrollIndicator text="" />)
		const textElement = container.querySelector(".uppercase")
		expect(textElement?.textContent).toBe("")
	})
})
