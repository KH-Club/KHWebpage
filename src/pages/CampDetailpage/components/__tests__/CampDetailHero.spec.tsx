import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { CampDetailHero } from "../CampDetailHero"

describe("CampDetailHero", () => {
	const defaultProps = {
		campID: "50",
		campName: "Test Camp",
		location: "Test Location",
		mainImage: "/test-image.jpg",
		onBack: vi.fn(),
	}

	it("renders camp name with quotes", () => {
		render(<CampDetailHero {...defaultProps} />)

		expect(screen.getByText('"Test Camp"')).toBeInTheDocument()
	})

	it("renders default title when campName is not provided", () => {
		render(<CampDetailHero {...defaultProps} campName={undefined} />)

		expect(screen.getByText("ค่ายหอ ครั้งที่ 50")).toBeInTheDocument()
	})

	it("renders location", () => {
		render(<CampDetailHero {...defaultProps} />)

		expect(screen.getByText("Test Location")).toBeInTheDocument()
	})

	it("renders camp badge with camp ID", () => {
		render(<CampDetailHero {...defaultProps} />)

		expect(screen.getByText("ครั้งที่ 50")).toBeInTheDocument()
	})

	it("renders back button", () => {
		render(<CampDetailHero {...defaultProps} />)

		expect(screen.getByRole("button", { name: /go back/i })).toBeInTheDocument()
	})

	it("calls onBack when back button is clicked", () => {
		const onBack = vi.fn()
		render(<CampDetailHero {...defaultProps} onBack={onBack} />)

		const backButton = screen.getByRole("button", { name: /go back/i })
		fireEvent.click(backButton)

		expect(onBack).toHaveBeenCalledTimes(1)
	})

	it("sets background image correctly", () => {
		render(<CampDetailHero {...defaultProps} />)

		const background = screen.getByTestId("hero-background")
		expect(background).toHaveStyle({
			backgroundImage: "url(/test-image.jpg)",
		})
	})

	it("renders with correct structure", () => {
		const { container } = render(<CampDetailHero {...defaultProps} />)

		// Check main container has proper height classes
		expect(container.firstChild).toHaveClass("h-[50vh]")
		expect(container.firstChild).toHaveClass("min-h-[400px]")
	})

	it("renders h1 heading for camp name", () => {
		render(<CampDetailHero {...defaultProps} />)

		const heading = screen.getByRole("heading", { level: 1 })
		expect(heading).toHaveTextContent('"Test Camp"')
	})
})
