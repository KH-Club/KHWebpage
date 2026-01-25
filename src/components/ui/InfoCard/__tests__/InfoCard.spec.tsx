import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { InfoCard } from "../InfoCard"

describe("InfoCard", () => {
	it("renders title correctly", () => {
		render(<InfoCard title="Test Title" />)

		expect(screen.getByText("Test Title")).toBeInTheDocument()
	})

	it("renders title as h2 element", () => {
		render(<InfoCard title="Test Title" />)

		const heading = screen.getByRole("heading", { level: 2 })
		expect(heading).toHaveTextContent("Test Title")
	})

	it("renders description when provided", () => {
		render(<InfoCard title="Title" description="Test description" />)

		expect(screen.getByText("Test description")).toBeInTheDocument()
	})

	it("does not render description when not provided", () => {
		const { container } = render(<InfoCard title="Title" />)

		const paragraphs = container.querySelectorAll("p")
		expect(paragraphs.length).toBe(0)
	})

	it("renders children when provided", () => {
		render(
			<InfoCard title="Title">
				<span data-testid="child">Child content</span>
			</InfoCard>,
		)

		expect(screen.getByTestId("child")).toBeInTheDocument()
		expect(screen.getByText("Child content")).toBeInTheDocument()
	})

	it("renders both description and children", () => {
		render(
			<InfoCard title="Title" description="Description">
				<span>Child</span>
			</InfoCard>,
		)

		expect(screen.getByText("Description")).toBeInTheDocument()
		expect(screen.getByText("Child")).toBeInTheDocument()
	})

	it("applies hover effect classes by default", () => {
		const { container } = render(<InfoCard title="Title" />)

		expect(container.firstChild).toHaveClass("hover:scale-105")
		expect(container.firstChild).toHaveClass("hover:bg-blue-500")
	})

	it("removes hover effect classes when hoverEffect is false", () => {
		const { container } = render(<InfoCard title="Title" hoverEffect={false} />)

		expect(container.firstChild).not.toHaveClass("hover:scale-105")
		expect(container.firstChild).not.toHaveClass("hover:bg-blue-500")
	})

	it("applies base styling classes", () => {
		const { container } = render(<InfoCard title="Title" />)

		expect(container.firstChild).toHaveClass("rounded-lg")
		expect(container.firstChild).toHaveClass("bg-white")
		expect(container.firstChild).toHaveClass("p-6")
		expect(container.firstChild).toHaveClass("shadow-md")
	})

	it("applies custom className", () => {
		const { container } = render(
			<InfoCard title="Title" className="custom-class" />,
		)

		expect(container.firstChild).toHaveClass("custom-class")
	})

	it("preserves base classes when adding custom className", () => {
		const { container } = render(
			<InfoCard title="Title" className="custom-class" />,
		)

		expect(container.firstChild).toHaveClass("rounded-lg")
		expect(container.firstChild).toHaveClass("custom-class")
	})

	it("renders complex children correctly", () => {
		render(
			<InfoCard title="Title">
				<ul>
					<li>Item 1</li>
					<li>Item 2</li>
				</ul>
			</InfoCard>,
		)

		expect(screen.getByText("Item 1")).toBeInTheDocument()
		expect(screen.getByText("Item 2")).toBeInTheDocument()
	})
})
