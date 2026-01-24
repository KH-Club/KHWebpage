import { describe, it, expect } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { useCamps, useCampDetail, getCampsData, getCampById } from "../useCamps"

describe("getCampsData", () => {
  it("should return an array of camps", () => {
    const camps = getCampsData()
    expect(Array.isArray(camps)).toBe(true)
    expect(camps.length).toBeGreaterThan(0)
  })

  it("should return camps in reverse order (newest first)", () => {
    const camps = getCampsData()
    // First camp should have higher campID than last
    expect(camps[0].campID).toBeGreaterThan(camps[camps.length - 1].campID)
  })

  it("should have default values for missing fields", () => {
    const camps = getCampsData()
    camps.forEach(camp => {
      expect(camp.location).toBeDefined()
      expect(camp.director).toBeDefined()
      expect(camp.date).toBeDefined()
      expect(camp.imgSrc).toBeDefined()
      expect(camp.imgSrc.length).toBeGreaterThan(0)
    })
  })
})

describe("getCampById", () => {
  it("should return a camp when valid ID is provided", () => {
    const camp = getCampById(47)
    expect(camp).toBeDefined()
    expect(camp?.campID).toBe(47)
  })

  it("should return undefined for non-existent camp ID", () => {
    const camp = getCampById(9999)
    expect(camp).toBeUndefined()
  })
})

describe("useCamps hook", () => {
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

    result.current.refetch()

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.camps.length).toBe(initialCamps.length)
  })
})

describe("useCampDetail hook", () => {
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
})
