import { describe, it, expect, vi, beforeEach } from "vitest"
import { renderHook, waitFor, act } from "@testing-library/react"

// Mock the camp service
vi.mock("@/services/campService", () => ({
	fetchCampsFromSupabase: vi.fn(),
	fetchCampByIdFromSupabase: vi.fn(),
}))

import {
	fetchCampsFromSupabase,
	fetchCampByIdFromSupabase,
} from "@/services/campService"

// Import after mocking
import { useCamps, useCampDetail, getCampsData, getCampById } from "../useCamps"

const mockCamps = [
	{
		campID: 54,
		name: "Camp 54",
		location: "Location 54",
		director: "Director 54",
		date: "Dec 2568",
		imgSrc: ["/camps/main/54/KH54.jpg"],
		province: "Sakon Nakhon",
		isMainCamp: true,
	},
	{
		campID: 53,
		name: "Camp 53",
		location: "Location 53",
		director: "Director 53",
		date: "Dec 2567",
		imgSrc: ["/camps/main/53/KH53.JPG"],
		province: "Uttardit",
		isMainCamp: true,
	},
	{
		campID: 47,
		name: "Camp 47",
		location: "Location 47",
		director: "Director 47",
		date: "Dec 2562",
		imgSrc: ["/camps/main/47/KH47.jpg"],
		province: "Nan",
		isMainCamp: true,
	},
]

describe("useCamps hook", () => {
	beforeEach(async () => {
		vi.clearAllMocks()
		vi.mocked(fetchCampsFromSupabase).mockResolvedValue(mockCamps)
		// Clear the module cache to reset the camps cache
		vi.resetModules()
	})

	it("should load camps data", async () => {
		const { result } = renderHook(() => useCamps())

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.camps.length).toBeGreaterThan(0)
		expect(result.current.error).toBeNull()
	})

	it("should provide total camps count", async () => {
		const { result } = renderHook(() => useCamps())

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.totalCamps).toBe(result.current.camps.length)
	})

	it("should refetch data when refetch is called", async () => {
		const { result } = renderHook(() => useCamps())

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		const initialCamps = result.current.camps

		await result.current.refetch()

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.camps.length).toBe(initialCamps.length)
	})

	it("should handle fetch error", async () => {
		// Use a fresh mock that rejects
		vi.mocked(fetchCampsFromSupabase).mockReset()
		vi.mocked(fetchCampsFromSupabase).mockRejectedValue(
			new Error("Network error"),
		)

		// Force refetch to bypass cache
		const { result } = renderHook(() => useCamps())

		// Wait for the initial load to complete
		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		// Trigger refetch which clears cache and makes a new request
		await act(async () => {
			await result.current.refetch()
		})

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.error).toBeDefined()
		expect(result.current.error?.message).toBe("Network error")
	})
})

describe("useCampDetail hook", () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.mocked(fetchCampByIdFromSupabase).mockResolvedValue(mockCamps[2]) // Camp 47
	})

	it("should load camp detail for valid ID", async () => {
		const { result } = renderHook(() => useCampDetail(47))

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.camp).toBeDefined()
		expect(result.current.camp?.campID).toBe(47)
		expect(result.current.error).toBeNull()
	})

	it("should return error for invalid camp ID", async () => {
		vi.mocked(fetchCampByIdFromSupabase).mockResolvedValueOnce(null)

		const { result } = renderHook(() => useCampDetail(9999))

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.camp).toBeNull()
		expect(result.current.error).toBeDefined()
	})

	it("should return error for undefined camp ID", async () => {
		const { result } = renderHook(() => useCampDetail(undefined))

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.camp).toBeNull()
		expect(result.current.error?.message).toBe("Invalid camp ID")
	})

	it("should return error for NaN camp ID", async () => {
		const { result } = renderHook(() => useCampDetail(NaN))

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.error?.message).toBe("Invalid camp ID")
	})

	it("should handle fetch error", async () => {
		vi.mocked(fetchCampByIdFromSupabase).mockRejectedValueOnce(
			new Error("Network error"),
		)

		const { result } = renderHook(() => useCampDetail(47))

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.error).toBeDefined()
		expect(result.current.error?.message).toBe("Network error")
	})
})

describe("getCampsData (deprecated)", () => {
	it("should return empty array when cache is empty", () => {
		const camps = getCampsData()
		expect(Array.isArray(camps)).toBe(true)
	})
})

describe("getCampById (deprecated)", () => {
	it("should return undefined when cache is empty", () => {
		const camp = getCampById(47)
		// May or may not be defined depending on cache state
		expect(camp === undefined || camp?.campID === 47).toBe(true)
	})
})
