import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { CampGallery } from "../CampGallery"

// Mock requestAnimationFrame for LazyImage
beforeEach(() => {
	vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
		cb(0)
		return 0
	})
})

describe("CampGallery", () => {
	it("renders gallery header", () => {
		render(<CampGallery campName="Test Camp" images={["/img1.jpg"]} />)

		expect(screen.getByText("รูปภาพกิจกรรม")).toBeInTheDocument()
	})

	it("renders single image when only one image provided", () => {
		render(<CampGallery campName="Test Camp" images={["/img1.jpg"]} />)

		const images = screen.getAllByRole("img")
		expect(images).toHaveLength(1)
		expect(images[0]).toHaveAttribute("alt", "Test Camp")
	})

	it("renders image count badge when multiple images", () => {
		render(
			<CampGallery
				campName="Test Camp"
				images={["/img1.jpg", "/img2.jpg", "/img3.jpg"]}
			/>,
		)

		expect(screen.getByText("3 รูป")).toBeInTheDocument()
	})

	it("does not render image count badge for single image", () => {
		render(<CampGallery campName="Test Camp" images={["/img1.jpg"]} />)

		expect(screen.queryByText("1 รูป")).not.toBeInTheDocument()
	})

	it("renders all images in gallery", () => {
		render(
			<CampGallery
				campName="Test Camp"
				images={["/img1.jpg", "/img2.jpg", "/img3.jpg"]}
			/>,
		)

		const images = screen.getAllByRole("img")
		expect(images).toHaveLength(3)
	})

	it("uses correct alt text for main image", () => {
		render(
			<CampGallery
				campName="Test Camp"
				images={["/main.jpg", "/gallery1.jpg"]}
			/>,
		)

		expect(screen.getByAltText("Test Camp - Main")).toBeInTheDocument()
	})

	it("uses correct alt text for gallery images", () => {
		render(
			<CampGallery
				campName="Test Camp"
				images={["/main.jpg", "/gallery1.jpg", "/gallery2.jpg"]}
			/>,
		)

		expect(screen.getByAltText("Test Camp - Image 2")).toBeInTheDocument()
		expect(screen.getByAltText("Test Camp - Image 3")).toBeInTheDocument()
	})

	it("renders with white background card for single image", () => {
		const { container } = render(
			<CampGallery campName="Test Camp" images={["/img1.jpg"]} />,
		)

		expect(container.querySelector(".bg-white")).toBeInTheDocument()
		expect(container.querySelector(".shadow-md")).toBeInTheDocument()
	})

	it("renders grid layout for multiple images", () => {
		const { container } = render(
			<CampGallery
				campName="Test Camp"
				images={["/img1.jpg", "/img2.jpg", "/img3.jpg"]}
			/>,
		)

		expect(container.querySelector(".grid")).toBeInTheDocument()
		expect(container.querySelector(".grid-cols-1")).toBeInTheDocument()
	})

	it("has hover effect on image containers", () => {
		const { container } = render(
			<CampGallery campName="Test Camp" images={["/img1.jpg", "/img2.jpg"]} />,
		)

		const groups = container.querySelectorAll(".group")
		expect(groups.length).toBeGreaterThan(0)
	})
})
