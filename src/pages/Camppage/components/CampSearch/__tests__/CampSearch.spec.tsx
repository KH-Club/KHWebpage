import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import CampSearch from "../CampSearch"

describe("CampSearch component", () => {
	it("should render input field", () => {
		const handleChange = vi.fn()
		render(<CampSearch value="" onChange={handleChange} />)

		expect(screen.getByRole("textbox")).toBeInTheDocument()
	})

	it("should display placeholder text", () => {
		const handleChange = vi.fn()
		render(<CampSearch value="" onChange={handleChange} />)

		expect(
			screen.getByPlaceholderText("Search camps by name or location..."),
		).toBeInTheDocument()
	})

	it("should display custom placeholder", () => {
		const handleChange = vi.fn()
		render(
			<CampSearch
				value=""
				onChange={handleChange}
				placeholder="Custom placeholder"
			/>,
		)

		expect(
			screen.getByPlaceholderText("Custom placeholder"),
		).toBeInTheDocument()
	})

	it("should display current value", () => {
		const handleChange = vi.fn()
		render(<CampSearch value="test query" onChange={handleChange} />)

		expect(screen.getByRole("textbox")).toHaveValue("test query")
	})

	it("should call onChange when input changes", () => {
		const handleChange = vi.fn()
		render(<CampSearch value="" onChange={handleChange} />)

		const input = screen.getByRole("textbox")
		fireEvent.change(input, { target: { value: "new value" } })

		expect(handleChange).toHaveBeenCalledWith("new value")
	})

	it("should show loading indicator when searching", () => {
		const handleChange = vi.fn()
		const { container } = render(
			<CampSearch value="" onChange={handleChange} isSearching={true} />,
		)

		expect(container.querySelector(".animate-spin")).toBeInTheDocument()
	})

	it("should not show loading indicator when not searching", () => {
		const handleChange = vi.fn()
		const { container } = render(
			<CampSearch value="" onChange={handleChange} isSearching={false} />,
		)

		expect(container.querySelector(".animate-spin")).not.toBeInTheDocument()
	})

	it("should have accessible label", () => {
		const handleChange = vi.fn()
		render(<CampSearch value="" onChange={handleChange} />)

		expect(screen.getByRole("textbox")).toHaveAttribute(
			"aria-label",
			"Search camps",
		)
	})
})
