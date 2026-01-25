import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import About from "../About"

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual("react-router-dom")
	return {
		...actual,
		useNavigate: () => mockNavigate,
	}
})

// Mock requestAnimationFrame for LazyImage
beforeEach(() => {
	vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
		cb(0)
		return 0
	})
	mockNavigate.mockClear()
})

const renderWithRouter = (component: React.ReactNode) => {
	return render(<MemoryRouter>{component}</MemoryRouter>)
}

describe("About", () => {
	it("renders section header", () => {
		renderWithRouter(<About />)

		expect(screen.getByText("เกี่ยวกับเรา")).toBeInTheDocument()
		expect(screen.getByText("ค่ายหอคืออะไร?")).toBeInTheDocument()
	})

	it("renders as a section with correct id", () => {
		renderWithRouter(<About />)

		const section = document.getElementById("about-section")
		expect(section).toBeInTheDocument()
		expect(section?.tagName).toBe("SECTION")
	})

	it("renders activity images", () => {
		renderWithRouter(<About />)

		const images = screen.getAllByRole("img")
		expect(images.length).toBe(4)
	})

	it("renders description text", () => {
		renderWithRouter(<About />)

		expect(screen.getByText(/ค่ายรวมจุฬาฯอาสาพัฒนาชนบท/)).toBeInTheDocument()
	})

	it("renders activity tags", () => {
		renderWithRouter(<About />)

		expect(screen.getByText("โครงงานก่อสร้าง")).toBeInTheDocument()
		expect(screen.getByText("โครงสวัสดิการ")).toBeInTheDocument()
		expect(screen.getByText("โครงอาสาพัฒนา")).toBeInTheDocument()
		expect(screen.getByText("โครงเด็ก")).toBeInTheDocument()
		expect(screen.getByText("โครงสัมพันธ์ชุมชน")).toBeInTheDocument()
		expect(screen.getByText("โครงสร้างสรรค์ผลิตภัณฑ์ชุมชน")).toBeInTheDocument()
	})

	it("renders CTA button", () => {
		renderWithRouter(<About />)

		expect(
			screen.getByRole("button", { name: /ดูค่ายทั้งหมด/i }),
		).toBeInTheDocument()
	})

	it("navigates to /camp when CTA button is clicked", () => {
		renderWithRouter(<About />)

		const button = screen.getByRole("button", { name: /ดูค่ายทั้งหมด/i })
		fireEvent.click(button)

		expect(mockNavigate).toHaveBeenCalledWith("/camp")
	})

	it("has proper heading hierarchy", () => {
		renderWithRouter(<About />)

		const h2 = screen.getByRole("heading", { level: 2 })
		expect(h2).toHaveTextContent("ค่ายหอคืออะไร?")
	})
})
