import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render } from "@testing-library/react"
import InstagramEmbed from "../InstagramEmbled"

describe("InstagramEmbed", () => {
	let appendChildSpy: ReturnType<typeof vi.spyOn>

	beforeEach(() => {
		// Use spy instead of mock to allow actual DOM operations
		appendChildSpy = vi.spyOn(document.body, "appendChild")
		vi.spyOn(document.body, "removeChild")
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it("renders with correct structure", () => {
		const { container } = render(<InstagramEmbed subUrl="test123" />)

		expect(container.firstChild).toHaveClass("flex")
		expect(container.firstChild).toHaveClass("justify-center")
	})

	it("includes Instagram embed blockquote", () => {
		const { container } = render(<InstagramEmbed subUrl="test123" />)

		const html = container.innerHTML
		expect(html).toContain("instagram-media")
	})

	it("includes the subUrl in the embed", () => {
		const { container } = render(<InstagramEmbed subUrl="ABC123XYZ" />)

		const html = container.innerHTML
		expect(html).toContain("ABC123XYZ")
	})

	it("loads Instagram embed script on mount", () => {
		render(<InstagramEmbed subUrl="test123" />)

		// Check that a script was appended
		const scriptCalls = appendChildSpy.mock.calls.filter((call) => {
			const element = call[0] as HTMLElement
			return element.tagName === "SCRIPT"
		})
		expect(scriptCalls.length).toBeGreaterThan(0)
	})

	it("includes link to Instagram post", () => {
		const { container } = render(<InstagramEmbed subUrl="testPost" />)

		const html = container.innerHTML
		expect(html).toContain("instagram.com/p/testPost")
	})

	it("includes kaihor.official reference", () => {
		const { container } = render(<InstagramEmbed subUrl="test123" />)

		const html = container.innerHTML
		expect(html).toContain("kaihor.official")
	})

	it("renders Instagram embed HTML", () => {
		const { container } = render(<InstagramEmbed subUrl="test123" />)

		// Check that dangerouslySetInnerHTML rendered content
		expect(container.querySelector("blockquote")).toBeInTheDocument()
	})
})
