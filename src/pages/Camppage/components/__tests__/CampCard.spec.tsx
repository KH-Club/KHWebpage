import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@/test/test-utils"
import CampCard from "../CampCard"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual("react-router-dom")
	return {
		...actual,
		useNavigate: () => mockNavigate,
	}
})

describe("CampCard component", () => {
	const defaultProps = {
		id: 47,
		name: "Test Camp",
		imgSrc: "/test-image.jpg",
		location: "Bangkok",
		director: "John Doe",
		date: "ธ.ค. 2562",
	}

	beforeEach(() => {
		mockNavigate.mockClear()
	})

	it("should render camp information", () => {
		render(<CampCard {...defaultProps} />)

		// Camp number badge
		expect(screen.getByText(/ครั้งที่ 47/)).toBeInTheDocument()
		// Camp name in title
		expect(screen.getByText(/"Test Camp"/)).toBeInTheDocument()
		// Location
		expect(screen.getByText("Bangkok")).toBeInTheDocument()
		// Director with new prefix
		expect(screen.getByText(/ผอ\.ค่าย: John Doe/)).toBeInTheDocument()
		// Date in badge
		expect(screen.getByText("ธ.ค. 2562")).toBeInTheDocument()
	})

	it("should render image", () => {
		render(<CampCard {...defaultProps} />)

		const img = screen.getByAltText("Camp 47 Test Camp")
		expect(img).toBeInTheDocument()
	})

	it("should navigate to camp detail on click", () => {
		render(<CampCard {...defaultProps} />)

		const card = screen.getByRole("button")
		fireEvent.click(card)

		expect(mockNavigate).toHaveBeenCalledWith("/camp/47")
	})

	it("should navigate on keyboard Enter", () => {
		render(<CampCard {...defaultProps} />)

		const card = screen.getByRole("button")
		fireEvent.keyDown(card, { key: "Enter" })

		expect(mockNavigate).toHaveBeenCalledWith("/camp/47")
	})

	it("should navigate on keyboard Space", () => {
		render(<CampCard {...defaultProps} />)

		const card = screen.getByRole("button")
		fireEvent.keyDown(card, { key: " " })

		expect(mockNavigate).toHaveBeenCalledWith("/camp/47")
	})

	it("should show fallback title when name is empty", () => {
		render(<CampCard {...defaultProps} name="" />)

		// Should show fallback title
		expect(screen.getByText(/ค่ายหอ ครั้งที่ 47/)).toBeInTheDocument()
	})

	it("should have proper accessibility attributes", () => {
		render(<CampCard {...defaultProps} />)

		const card = screen.getByRole("button")
		expect(card).toHaveAttribute("tabIndex", "0")
		expect(card).toHaveAttribute(
			"aria-label",
			"View details for camp 47 Test Camp",
		)
	})
})
