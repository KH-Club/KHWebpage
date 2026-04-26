import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import CampVoices from "../CampVoices"
import { campVoices } from "../../data/campVoices"

describe("CampVoices", () => {
	it("renders as a labelled section with correct id", () => {
		render(<CampVoices />)

		const section = document.getElementById("camp-voices-section")
		const heading = screen.getByRole("heading", {
			level: 2,
			name: "เสียงจากค่าย",
		})

		expect(section).toBeInTheDocument()
		expect(section?.tagName).toBe("SECTION")
		expect(heading).toHaveAttribute("id", "camp-voices-heading")
		expect(section).toHaveAttribute("aria-labelledby", "camp-voices-heading")
		expect(screen.getByText("Camp Voices")).toBeInTheDocument()
	})

	it("renders all camp voices", () => {
		render(<CampVoices />)

		campVoices.forEach((voice) => {
			expect(
				screen.getByRole("heading", { level: 3, name: voice.name }),
			).toBeInTheDocument()
			expect(screen.getByText(voice.role)).toBeInTheDocument()
			expect(screen.getByText(voice.campYear)).toBeInTheDocument()
			expect(screen.getByText(voice.relation)).toBeInTheDocument()
			expect(screen.getByText(new RegExp(voice.quote))).toBeInTheDocument()
		})
	})

	it("renders one article card for each voice", () => {
		render(<CampVoices />)

		expect(screen.getAllByRole("article")).toHaveLength(campVoices.length)
	})

	it("renders fallback avatars when images are not provided", () => {
		render(<CampVoices />)

		const fallbackAvatars = screen.getAllByTestId("camp-voice-fallback-avatar")

		expect(fallbackAvatars).toHaveLength(campVoices.length)
		campVoices.forEach((voice) => {
			expect(
				screen.getByLabelText(`อวาตาร์สำรองของ ${voice.name}`),
			).toBeInTheDocument()
		})
	})
})
