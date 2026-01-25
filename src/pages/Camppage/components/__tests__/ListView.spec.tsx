import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import ListView from "../ListView"
import { CampData } from "@/types/camp"

// Mock requestAnimationFrame for LazyImage
beforeEach(() => {
	vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
		cb(0)
		return 0
	})
})

const mockCamps: CampData[] = [
	{
		campID: 50,
		name: "Test Camp 1",
		location: "Location 1",
		province: "Province 1",
		director: "Director 1",
		date: "Jan 2024",
		imgSrc: ["/img1.jpg"],
	},
	{
		campID: 51,
		name: "Test Camp 2",
		location: "Location 2",
		province: "Province 2",
		director: "Director 2",
		date: "Feb 2024",
		imgSrc: ["/img2.jpg"],
	},
]

const renderWithRouter = (component: React.ReactNode) => {
	return render(<MemoryRouter>{component}</MemoryRouter>)
}

describe("ListView", () => {
	it("renders camp cards when camps are provided", () => {
		renderWithRouter(<ListView campsList={mockCamps} />)

		expect(screen.getByText('"Test Camp 1"')).toBeInTheDocument()
		expect(screen.getByText('"Test Camp 2"')).toBeInTheDocument()
	})

	it("renders empty state when no camps", () => {
		renderWithRouter(<ListView campsList={[]} />)

		expect(screen.getByText("ไม่พบค่ายที่ค้นหา")).toBeInTheDocument()
		expect(
			screen.getByText("ลองค้นหาด้วยคำอื่น หรือล้างการค้นหา"),
		).toBeInTheDocument()
	})

	it("renders search icon in empty state", () => {
		const { container } = renderWithRouter(<ListView campsList={[]} />)

		// FiSearch renders as an svg
		const svg = container.querySelector("svg")
		expect(svg).toBeInTheDocument()
	})

	it("renders correct number of camp cards", () => {
		renderWithRouter(<ListView campsList={mockCamps} />)

		const cards = screen.getAllByText(/ดูรายละเอียด/)
		expect(cards).toHaveLength(2)
	})

	it("has list role for accessibility", () => {
		renderWithRouter(<ListView campsList={mockCamps} />)

		expect(screen.getByRole("list")).toBeInTheDocument()
	})

	it("has aria-label for camp list", () => {
		renderWithRouter(<ListView campsList={mockCamps} />)

		expect(screen.getByLabelText("Camp list")).toBeInTheDocument()
	})

	it("renders grid layout", () => {
		const { container } = renderWithRouter(<ListView campsList={mockCamps} />)

		const grid = container.querySelector(".grid")
		expect(grid).toBeInTheDocument()
		expect(grid).toHaveClass("grid-cols-1")
		expect(grid).toHaveClass("sm:grid-cols-2")
		expect(grid).toHaveClass("lg:grid-cols-3")
	})

	it("displays camp locations", () => {
		renderWithRouter(<ListView campsList={mockCamps} />)

		expect(screen.getByText("Location 1")).toBeInTheDocument()
		expect(screen.getByText("Location 2")).toBeInTheDocument()
	})

	it("displays camp directors", () => {
		renderWithRouter(<ListView campsList={mockCamps} />)

		expect(screen.getByText(/Director 1/)).toBeInTheDocument()
		expect(screen.getByText(/Director 2/)).toBeInTheDocument()
	})

	it("empty state has centered layout", () => {
		const { container } = renderWithRouter(<ListView campsList={[]} />)

		expect(container.firstChild).toHaveClass("flex")
		expect(container.firstChild).toHaveClass("items-center")
		expect(container.firstChild).toHaveClass("justify-center")
	})
})
