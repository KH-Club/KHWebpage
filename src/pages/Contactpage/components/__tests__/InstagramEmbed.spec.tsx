import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { render } from "@testing-library/react"
import InstagramEmbed from "../InstagramEmbled"

describe("InstagramEmbed", () => {
	let appendChildSpy: ReturnType<typeof vi.spyOn>

	beforeEach(() => {
		document.getElementById("instagram-embed-script")?.remove()
		appendChildSpy = vi.spyOn(document.body, "appendChild")
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it("renders with correct structure", () => {
		const { container } = render(<InstagramEmbed subUrl="test123" />)

		expect(container.firstChild).toHaveClass("flex", "justify-center")
	})

	it("includes Instagram embed blockquote", () => {
		const { container } = render(<InstagramEmbed subUrl="test123" />)

		expect(container.querySelector("blockquote")).toHaveClass("instagram-media")
	})

	it("includes the subUrl in the embed", () => {
		const { container } = render(<InstagramEmbed subUrl="ABC123XYZ" />)

		expect(container.querySelector("blockquote")).toHaveAttribute(
			"data-instgrm-permalink",
			expect.stringContaining("ABC123XYZ"),
		)
	})

	it("loads Instagram embed script on mount", () => {
		render(<InstagramEmbed subUrl="test123" />)

		const scriptCalls = appendChildSpy.mock.calls.filter((call) => {
			const element = call[0] as HTMLElement
			return element.tagName === "SCRIPT"
		})
		expect(scriptCalls.length).toBeGreaterThan(0)
	})

	it("reuses the Instagram script across embeds", () => {
		const { rerender } = render(<InstagramEmbed subUrl="first" />)
		rerender(<InstagramEmbed subUrl="second" />)

		const scriptCalls = appendChildSpy.mock.calls.filter((call) => {
			const element = call[0] as HTMLElement
			return element.tagName === "SCRIPT"
		})
		expect(scriptCalls).toHaveLength(1)
	})

	it("includes link to Instagram post", () => {
		const { container } = render(<InstagramEmbed subUrl="testPost" />)

		expect(container.querySelector("a")).toHaveAttribute(
			"href",
			"https://www.instagram.com/p/testPost/",
		)
	})

	it("includes kaihor.official reference", () => {
		const { container } = render(<InstagramEmbed subUrl="test123" />)

		expect(container).toHaveTextContent("@kaihor.official")
	})

	it("renders Instagram embed HTML", () => {
		const { container } = render(<InstagramEmbed subUrl="test123" />)

		expect(container.querySelector("blockquote")).toBeInTheDocument()
	})
})
