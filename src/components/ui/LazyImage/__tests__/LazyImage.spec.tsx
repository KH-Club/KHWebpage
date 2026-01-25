import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { LazyImage } from "../LazyImage"

// Mock requestAnimationFrame
beforeEach(() => {
	vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
		cb(0)
		return 0
	})
})

describe("LazyImage", () => {
	const defaultProps = {
		src: "/test-image.jpg",
		alt: "Test image",
	}

	it("renders with correct src and alt", () => {
		render(<LazyImage {...defaultProps} />)

		const img = screen.getByRole("img", { name: "Test image" })
		expect(img).toBeInTheDocument()
		expect(img).toHaveAttribute("src", "/test-image.jpg")
		expect(img).toHaveAttribute("alt", "Test image")
	})

	it("has lazy loading attribute", () => {
		render(<LazyImage {...defaultProps} />)

		const img = screen.getByRole("img")
		expect(img).toHaveAttribute("loading", "lazy")
	})

	it("shows loading spinner by default when loading", () => {
		render(<LazyImage {...defaultProps} />)

		// Loading spinner should be visible initially
		const spinner = document.querySelector(".animate-spin")
		expect(spinner).toBeInTheDocument()
	})

	it("hides loading spinner when showLoadingSpinner is false", () => {
		render(<LazyImage {...defaultProps} showLoadingSpinner={false} />)

		const spinner = document.querySelector(".animate-spin")
		expect(spinner).not.toBeInTheDocument()
	})

	it("hides loading state after image loads", async () => {
		render(<LazyImage {...defaultProps} />)

		const img = screen.getByRole("img")
		fireEvent.load(img)

		await waitFor(() => {
			expect(img).toHaveClass("opacity-100")
		})
	})

	it("shows opacity-0 while loading", () => {
		render(<LazyImage {...defaultProps} />)

		const img = screen.getByRole("img")
		expect(img).toHaveClass("opacity-0")
	})

	it("uses fallback src on error", async () => {
		const fallbackSrc = "/fallback.jpg"
		render(<LazyImage {...defaultProps} fallbackSrc={fallbackSrc} />)

		const img = screen.getByRole("img")
		fireEvent.error(img)

		await waitFor(() => {
			expect(img).toHaveAttribute("src", fallbackSrc)
		})
	})

	it("uses default fallback src when not provided", async () => {
		render(<LazyImage {...defaultProps} />)

		const img = screen.getByRole("img")
		fireEvent.error(img)

		await waitFor(() => {
			expect(img).toHaveAttribute("src", "/camps/homepagebackground.jpg")
		})
	})

	it("does not use fallback twice on multiple errors", async () => {
		const fallbackSrc = "/fallback.jpg"
		render(<LazyImage {...defaultProps} fallbackSrc={fallbackSrc} />)

		const img = screen.getByRole("img")

		// First error - should switch to fallback
		fireEvent.error(img)
		await waitFor(() => {
			expect(img).toHaveAttribute("src", fallbackSrc)
		})

		// Second error - should stay on fallback
		fireEvent.error(img)
		await waitFor(() => {
			expect(img).toHaveAttribute("src", fallbackSrc)
		})
	})

	it("applies aspectRatio classes correctly", () => {
		const { rerender, container } = render(
			<LazyImage {...defaultProps} aspectRatio="square" />,
		)
		expect(container.firstChild).toHaveClass("aspect-square")

		rerender(<LazyImage {...defaultProps} aspectRatio="video" />)
		expect(container.firstChild).toHaveClass("aspect-video")

		rerender(<LazyImage {...defaultProps} aspectRatio="auto" />)
		expect(container.firstChild).not.toHaveClass("aspect-square")
		expect(container.firstChild).not.toHaveClass("aspect-video")
	})

	it("applies custom className to image", () => {
		render(<LazyImage {...defaultProps} className="custom-class" />)

		const img = screen.getByRole("img")
		expect(img).toHaveClass("custom-class")
	})

	it("applies custom wrapperClassName to container", () => {
		const { container } = render(
			<LazyImage {...defaultProps} wrapperClassName="wrapper-class" />,
		)

		expect(container.firstChild).toHaveClass("wrapper-class")
	})

	it("passes through additional props to img element", () => {
		render(<LazyImage {...defaultProps} data-testid="test-img" width={200} />)

		const img = screen.getByTestId("test-img")
		expect(img).toHaveAttribute("width", "200")
	})
})
