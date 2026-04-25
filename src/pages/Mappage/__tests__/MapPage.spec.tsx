import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@/test/test-utils"
import MapPage from "../page"

describe("MapPage", () => {
	it("renders the interactive map and selects a province from the list", () => {
		render(<MapPage />)

		expect(
			screen.getByRole("heading", {
				name: /Kaihor camp footprints across Thailand/i,
			}),
		).toBeInTheDocument()
		expect(
			screen.getByRole("img", { name: /Kaihor camp province map/i }),
		).toBeInTheDocument()

		fireEvent.click(
			screen.getByRole("button", {
				name: /Select Sakon Nakhon from visited province list/i,
			}),
		)

		expect(
			screen.getByRole("heading", { name: "Sakon Nakhon" }),
		).toBeInTheDocument()
		expect(
			screen.getByRole("link", { name: /View latest camp/i }),
		).toHaveAttribute("href", "/camp/54")
	})

	it("shows a simple visited/not visited legend without region labels", () => {
		render(<MapPage />)

		expect(screen.getByText("Visited")).toBeInTheDocument()
		expect(screen.getByText("Not visited yet")).toBeInTheDocument()
		expect(screen.queryByText("North")).not.toBeInTheDocument()
		expect(screen.queryByText("Northeast")).not.toBeInTheDocument()
	})

	it("clears selected province with Escape", () => {
		render(<MapPage />)

		fireEvent.click(
			screen.getByRole("button", {
				name: /Select Sakon Nakhon from visited province list/i,
			}),
		)
		expect(
			screen.getByText(/Recorded camps in this province/i),
		).toBeInTheDocument()

		fireEvent.keyDown(window, { key: "Escape" })

		expect(screen.getByText(/Select a visited province/i)).toBeInTheDocument()
	})

	it("selects a visited province from the SVG map with keyboard support", () => {
		render(<MapPage />)

		const sakonNakhonPath = screen.getByRole("button", {
			name: /Sakon Nakhon: \d+ recorded camp visits/i,
		})

		expect(sakonNakhonPath).toHaveAttribute("tabindex", "0")

		fireEvent.keyDown(sakonNakhonPath, { key: "Enter" })

		expect(
			screen.getByRole("heading", { name: "Sakon Nakhon" }),
		).toBeInTheDocument()
		expect(
			screen.queryByRole("button", {
				name: /Bangkok: \d+ recorded camp visits/i,
			}),
		).not.toBeInTheDocument()
	})
})
