import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import LandingView from "../LandingView"

// Mock useCamps hook
vi.mock("@/hooks", () => ({
	useCamps: () => ({
		totalCamps: 53,
		camps: [],
		isLoading: false,
		error: null,
	}),
}))

// Mock siteConfig with full config
vi.mock("@/config/site", () => ({
	siteConfig: {
		foundingYear: 1998,
		links: {
			facebook: "https://facebook.com/test",
			instagram: "https://instagram.com/test",
		},
	},
}))

// Mock IntersectionObserver for AnimatedCounter
const mockIntersectionObserver = vi.fn()
beforeEach(() => {
	mockIntersectionObserver.mockImplementation(() => ({
		observe: vi.fn(),
		disconnect: vi.fn(),
		unobserve: vi.fn(),
	}))
	vi.stubGlobal("IntersectionObserver", mockIntersectionObserver)
})

const renderWithRouter = (component: React.ReactNode) => {
	return render(<MemoryRouter>{component}</MemoryRouter>)
}

describe("LandingView", () => {
	it("renders main title KAIHOR", () => {
		renderWithRouter(<LandingView />)

		expect(screen.getByText("KAIHOR")).toBeInTheDocument()
	})

	it("renders Thai title", () => {
		renderWithRouter(<LandingView />)

		expect(screen.getByText("ค่ายหอ")).toBeInTheDocument()
	})

	it("renders subtitle", () => {
		renderWithRouter(<LandingView />)

		expect(
			screen.getByText("ชมรมค่ายอาสาสมัครนิสิตหอพักจุฬาลงกรณ์มหาวิทยาลัย"),
		).toBeInTheDocument()
	})

	it("renders Since badge with founding year", () => {
		renderWithRouter(<LandingView />)

		expect(screen.getByText("Since 1998")).toBeInTheDocument()
	})

	it("renders about us button", () => {
		renderWithRouter(<LandingView />)

		expect(screen.getByText("เกี่ยวกับเรา")).toBeInTheDocument()
	})

	it("renders explore camps button", () => {
		renderWithRouter(<LandingView />)

		expect(screen.getByText("สำรวจค่ายของเรา")).toBeInTheDocument()
	})

	it("renders as section with home id", () => {
		renderWithRouter(<LandingView />)

		const section = document.getElementById("home")
		expect(section).toBeInTheDocument()
		expect(section?.tagName).toBe("SECTION")
	})

	it("renders description text", () => {
		renderWithRouter(<LandingView />)

		expect(
			screen.getByText(/ครอบครัวที่พร้อมจะออกไปช่วยเหลือสังคม/),
		).toBeInTheDocument()
	})

	it("has full screen height", () => {
		renderWithRouter(<LandingView />)

		const section = document.getElementById("home")
		expect(section).toHaveClass("h-screen")
	})

	it("renders scroll indicator", () => {
		renderWithRouter(<LandingView />)

		expect(screen.getByText("เลื่อนลงเพื่อดูเพิ่มเติม")).toBeInTheDocument()
	})

	it("renders animated counters section", () => {
		renderWithRouter(<LandingView />)

		// Check for counter labels
		expect(screen.getByText("ค่าย")).toBeInTheDocument()
		expect(screen.getByText("ปี")).toBeInTheDocument()
	})

	it("has h1 heading", () => {
		renderWithRouter(<LandingView />)

		const h1 = screen.getByRole("heading", { level: 1 })
		expect(h1).toContainHTML("KAIHOR")
	})

	it("renders link to camp page", () => {
		renderWithRouter(<LandingView />)

		const link = screen.getByLabelText("Explore our camps")
		expect(link).toHaveAttribute("href", "/camp")
	})
})
