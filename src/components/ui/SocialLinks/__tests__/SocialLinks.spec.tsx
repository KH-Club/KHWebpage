import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { SocialLinks } from "../SocialLinks"

// Mock the site config
vi.mock("@/config/site", () => ({
	siteConfig: {
		links: {
			facebook: "https://facebook.com/test",
			instagram: "https://instagram.com/test",
		},
	},
}))

describe("SocialLinks", () => {
	it("renders Facebook and Instagram links", () => {
		render(<SocialLinks />)

		const facebookLink = screen.getByLabelText("Visit our Facebook page")
		const instagramLink = screen.getByLabelText("Visit our Instagram page")

		expect(facebookLink).toBeInTheDocument()
		expect(instagramLink).toBeInTheDocument()
	})

	it("has correct href attributes", () => {
		render(<SocialLinks />)

		const facebookLink = screen.getByLabelText("Visit our Facebook page")
		const instagramLink = screen.getByLabelText("Visit our Instagram page")

		expect(facebookLink).toHaveAttribute("href", "https://facebook.com/test")
		expect(instagramLink).toHaveAttribute("href", "https://instagram.com/test")
	})

	it("opens links in new tab", () => {
		render(<SocialLinks />)

		const links = screen.getAllByRole("link")

		links.forEach((link) => {
			expect(link).toHaveAttribute("target", "_blank")
			expect(link).toHaveAttribute("rel", "noopener noreferrer")
		})
	})

	it("shows only icons by default (variant=icon)", () => {
		render(<SocialLinks />)

		// Should not show text labels
		expect(screen.queryByText("Facebook")).not.toBeInTheDocument()
		expect(screen.queryByText("Instagram")).not.toBeInTheDocument()
	})

	it("shows text labels when variant is text", () => {
		render(<SocialLinks variant="text" />)

		expect(screen.getByText("Facebook")).toBeInTheDocument()
		expect(screen.getByText("Instagram")).toBeInTheDocument()
	})

	it("shows both icons and labels when variant is both", () => {
		render(<SocialLinks variant="both" />)

		expect(screen.getByText("Facebook")).toBeInTheDocument()
		expect(screen.getByText("Instagram")).toBeInTheDocument()
	})

	it("shows labels when showLabels is true", () => {
		render(<SocialLinks showLabels={true} />)

		expect(screen.getByText("Facebook")).toBeInTheDocument()
		expect(screen.getByText("Instagram")).toBeInTheDocument()
	})

	it("applies custom className", () => {
		const { container } = render(<SocialLinks className="custom-class" />)

		expect(container.firstChild).toHaveClass("custom-class")
	})

	it("has correct aria-labels for accessibility", () => {
		render(<SocialLinks />)

		expect(screen.getByLabelText("Visit our Facebook page")).toBeInTheDocument()
		expect(
			screen.getByLabelText("Visit our Instagram page"),
		).toBeInTheDocument()
	})

	it("applies base styling classes", () => {
		const { container } = render(<SocialLinks />)

		expect(container.firstChild).toHaveClass("flex")
		expect(container.firstChild).toHaveClass("items-center")
		expect(container.firstChild).toHaveClass("space-x-4")
	})

	it("links have hover transition class", () => {
		render(<SocialLinks />)

		const links = screen.getAllByRole("link")

		links.forEach((link) => {
			expect(link).toHaveClass("transition-opacity")
			expect(link).toHaveClass("hover:opacity-70")
		})
	})

	it("renders exactly 2 social links", () => {
		render(<SocialLinks />)

		const links = screen.getAllByRole("link")
		expect(links).toHaveLength(2)
	})
})
