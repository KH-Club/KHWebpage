import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { AnimatedCounter } from "../AnimatedCounter"

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn()

beforeEach(() => {
	mockIntersectionObserver.mockImplementation(() => ({
		observe: vi.fn(),
		disconnect: vi.fn(),
		unobserve: vi.fn(),
	}))

	vi.stubGlobal("IntersectionObserver", mockIntersectionObserver)
})

afterEach(() => {
	vi.restoreAllMocks()
})

describe("AnimatedCounter", () => {
	it("renders with initial count of 0", () => {
		render(<AnimatedCounter end={100} />)

		expect(screen.getByText("0")).toBeInTheDocument()
	})

	it("displays prefix correctly", () => {
		render(<AnimatedCounter end={100} prefix="$" />)

		expect(screen.getByText(/\$/)).toBeInTheDocument()
	})

	it("displays suffix correctly", () => {
		render(<AnimatedCounter end={100} suffix="+" />)

		expect(screen.getByText(/\+/)).toBeInTheDocument()
	})

	it("displays label when provided", () => {
		render(<AnimatedCounter end={100} label="Years" />)

		expect(screen.getByText("Years")).toBeInTheDocument()
	})

	it("displays sublabel when provided", () => {
		render(<AnimatedCounter end={100} sublabel="of experience" />)

		expect(screen.getByText("of experience")).toBeInTheDocument()
	})

	it("does not display label when not provided", () => {
		const { container } = render(<AnimatedCounter end={100} />)

		// Should only have the counter div, not label divs
		const textElements = container.querySelectorAll(".text-lg")
		expect(textElements.length).toBe(0)
	})

	it("applies custom className", () => {
		const { container } = render(
			<AnimatedCounter end={100} className="custom-class" />,
		)

		expect(container.firstChild).toHaveClass("custom-class")
	})

	it("applies custom labelClassName", () => {
		render(
			<AnimatedCounter end={100} label="Test" labelClassName="label-class" />,
		)

		expect(screen.getByText("Test")).toHaveClass("label-class")
	})

	it("has text-center class by default", () => {
		const { container } = render(<AnimatedCounter end={100} />)

		expect(container.firstChild).toHaveClass("text-center")
	})

	it("renders with prefix and suffix together", () => {
		render(<AnimatedCounter end={100} prefix=">" suffix="+" />)

		const counterDiv = document.querySelector(".text-4xl")
		expect(counterDiv?.textContent).toContain(">")
		expect(counterDiv?.textContent).toContain("+")
	})

	it("creates intersection observer on mount", () => {
		render(<AnimatedCounter end={100} />)

		expect(mockIntersectionObserver).toHaveBeenCalledTimes(1)
		expect(mockIntersectionObserver).toHaveBeenCalledWith(
			expect.any(Function),
			{ threshold: 0.1 },
		)
	})

	it("observes the component element", () => {
		const observeMock = vi.fn()
		mockIntersectionObserver.mockImplementation(() => ({
			observe: observeMock,
			disconnect: vi.fn(),
		}))

		render(<AnimatedCounter end={100} />)

		expect(observeMock).toHaveBeenCalledTimes(1)
	})

	it("cleans up observer on unmount", () => {
		const disconnectMock = vi.fn()

		mockIntersectionObserver.mockImplementation(() => ({
			observe: vi.fn(),
			disconnect: disconnectMock,
		}))

		const { unmount } = render(<AnimatedCounter end={100} />)
		unmount()

		expect(disconnectMock).toHaveBeenCalled()
	})

	it("renders with all props", () => {
		render(
			<AnimatedCounter
				end={50}
				duration={1000}
				prefix="$"
				suffix="+"
				label="Total"
				sublabel="items"
				className="custom"
				labelClassName="label-custom"
			/>,
		)

		expect(screen.getByText("Total")).toBeInTheDocument()
		expect(screen.getByText("items")).toBeInTheDocument()
		expect(screen.getByText(/\$/)).toBeInTheDocument()
		expect(screen.getByText(/\+/)).toBeInTheDocument()
	})
})
