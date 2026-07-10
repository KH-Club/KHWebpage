import { fireEvent, render, screen, within } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
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

	it("renders as a labelled editorial section", () => {
		render(<CampVoices />)

		const section = document.getElementById("camp-voices-section")
		const heading = screen.getByRole("heading", {
			level: 2,
			name: "เสียงที่ยังอยู่หลังค่ายจบ",
		})

		expect(section).toBeInTheDocument()
		expect(section?.tagName).toBe("SECTION")
		expect(heading).toHaveAttribute("id", "camp-voices-heading")
		expect(section).toHaveAttribute("aria-labelledby", "camp-voices-heading")
		expect(screen.getByText("CAMP VOICES")).toBeInTheDocument()
		expect(
			screen.getByText(
				"เรื่องเล่าจากคนที่เคยร่วมเดินทาง ลงมือทำ และเติบโตไปกับค่ายหอ",
			),
		).toBeInTheDocument()
	})

	it("renders one featured story and the remaining compact stories", () => {
		render(<CampVoices />)

		expect(screen.getAllByRole("article")).toHaveLength(mockVoices.length)
		mockVoices.forEach((voice) => {
			const heading = screen.getByRole("heading", {
				level: 3,
				name: voice.name,
			})
			const article = heading.closest("article")

			expect(article).toBeInTheDocument()
			expect(article).toHaveTextContent(voice.role)
			expect(article).toHaveTextContent(voice.campYear)
			expect(article).toHaveTextContent(voice.relation)
			expect(article).toHaveTextContent(voice.quote)
		})
	})

	it("opens a story modal and supports next, previous, and escape navigation", () => {
		render(<CampVoices />)

		fireEvent.click(
			screen.getByRole("button", {
				name: "เปิดเรื่องราวของ Student Volunteer",
			}),
		)

		let dialog = screen.getByRole("dialog", {
			name: "เรื่องราวของ Student Volunteer",
		})
		expect(within(dialog).getByText("1 / 2")).toBeInTheDocument()

		fireEvent.click(within(dialog).getByRole("button", { name: "เรื่องถัดไป" }))

		dialog = screen.getByRole("dialog", {
			name: "เรื่องราวของ Alumni Member",
		})
		expect(within(dialog).getByText("2 / 2")).toBeInTheDocument()

		fireEvent.click(
			within(dialog).getByRole("button", { name: "เรื่องก่อนหน้า" }),
		)
		expect(
			screen.getByRole("dialog", { name: "เรื่องราวของ Student Volunteer" }),
		).toBeInTheDocument()

		fireEvent.keyDown(window, { key: "Escape" })
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
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

		expect(
			screen.getByText("ยังไม่มีเสียงจากค่ายที่เผยแพร่"),
		).toBeInTheDocument()
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
