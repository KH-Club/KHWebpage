import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { useAlumniStudentVoices } from "@/hooks"
import { AlumniStudentVoice } from "@/types/alumniStudentVoice"
import CampVoices from "../CampVoices"

vi.mock("@/hooks", () => ({
	useAlumniStudentVoices: vi.fn(),
}))

const mockVoices: AlumniStudentVoice[] = [
	{
		id: 1,
		name: "Student Volunteer",
		role: "Current volunteer",
		relation: "Student",
		campYear: "Academic year 2567",
		quote: "Camp helped me learn from real communities.",
		imageAlt: "Student volunteer portrait",
	},
	{
		id: 2,
		name: "Alumni Member",
		role: "Alumni",
		relation: "Former club member",
		campYear: "Camp 52",
		quote: "The people and teamwork are what I remember most.",
		imageAlt: "Alumni member portrait",
	},
]

const mockUseAlumniStudentVoices = vi.mocked(useAlumniStudentVoices)

describe("CampVoices", () => {
	beforeEach(() => {
		mockUseAlumniStudentVoices.mockReturnValue({
			voices: mockVoices,
			isLoading: false,
			error: null,
			refetch: vi.fn(),
			totalVoices: mockVoices.length,
		})
	})

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

	it("renders all published voices from Supabase data", () => {
		render(<CampVoices />)

		mockVoices.forEach((voice) => {
			expect(
				screen.getByRole("heading", { level: 3, name: voice.name }),
			).toBeInTheDocument()
			expect(screen.getByText(voice.role)).toBeInTheDocument()
			expect(screen.getByText(voice.campYear)).toBeInTheDocument()
			expect(screen.getByText(voice.relation)).toBeInTheDocument()
			expect(
				screen.getByText((content) => content.includes(voice.quote)),
			).toBeInTheDocument()
		})
	})

	it("renders one article card for each voice", () => {
		render(<CampVoices />)

		expect(screen.getAllByRole("article")).toHaveLength(mockVoices.length)
	})

	it("renders fallback avatars when images are not provided", () => {
		render(<CampVoices />)

		const fallbackAvatars = screen.getAllByTestId("camp-voice-fallback-avatar")

		expect(fallbackAvatars).toHaveLength(mockVoices.length)
		mockVoices.forEach((voice) => {
			expect(
				screen.getByLabelText(`อวาตาร์สำรองของ ${voice.name}`),
			).toBeInTheDocument()
		})
	})

	it("renders a loading state while voices are fetched", () => {
		mockUseAlumniStudentVoices.mockReturnValue({
			voices: [],
			isLoading: true,
			error: null,
			refetch: vi.fn(),
			totalVoices: 0,
		})

		render(<CampVoices />)

		expect(screen.getByLabelText("Loading camp voices")).toBeInTheDocument()
	})

	it("renders an empty state when no voices are published", () => {
		mockUseAlumniStudentVoices.mockReturnValue({
			voices: [],
			isLoading: false,
			error: null,
			refetch: vi.fn(),
			totalVoices: 0,
		})

		render(<CampVoices />)

		expect(screen.getByText("ยังไม่มีเสียงจากค่ายที่เผยแพร่")).toBeInTheDocument()
	})

	it("renders an error state when loading voices fails", () => {
		mockUseAlumniStudentVoices.mockReturnValue({
			voices: [],
			isLoading: false,
			error: new Error("Network error"),
			refetch: vi.fn(),
			totalVoices: 0,
		})

		render(<CampVoices />)

		expect(
			screen.getByText("ไม่สามารถโหลดเสียงจากค่ายได้ในขณะนี้"),
		).toBeInTheDocument()
	})
})
