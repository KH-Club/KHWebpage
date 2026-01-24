import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useSearch, useDebounce } from "../useSearch"

interface TestItem {
	id: number
	name: string
	location: string
}

const testItems: TestItem[] = [
	{ id: 1, name: "Camp Alpha", location: "Bangkok" },
	{ id: 2, name: "Camp Beta", location: "Chiang Mai" },
	{ id: 3, name: "Camp Gamma", location: "Bangkok" },
	{ id: 4, name: "Delta Event", location: "Phuket" },
]

describe("useDebounce", () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it("should return initial value immediately", () => {
		const { result } = renderHook(() => useDebounce("initial", 300))
		expect(result.current).toBe("initial")
	})

	it("should debounce value changes", async () => {
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 300),
			{ initialProps: { value: "initial" } },
		)

		expect(result.current).toBe("initial")

		rerender({ value: "updated" })
		expect(result.current).toBe("initial")

		act(() => {
			vi.advanceTimersByTime(300)
		})

		expect(result.current).toBe("updated")
	})

	it("should cancel previous timeout on new value", async () => {
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 300),
			{ initialProps: { value: "first" } },
		)

		rerender({ value: "second" })
		act(() => {
			vi.advanceTimersByTime(150)
		})

		rerender({ value: "third" })
		act(() => {
			vi.advanceTimersByTime(150)
		})

		// Should still be "first" as 300ms hasn't passed since "third"
		expect(result.current).toBe("first")

		act(() => {
			vi.advanceTimersByTime(150)
		})

		expect(result.current).toBe("third")
	})
})

describe("useSearch", () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it("should return all items when query is empty", () => {
		const { result } = renderHook(() =>
			useSearch({
				items: testItems,
				searchFields: ["name", "location"],
				debounceMs: 0,
			}),
		)

		expect(result.current.filteredItems).toHaveLength(testItems.length)
		expect(result.current.resultCount).toBe(testItems.length)
	})

	it("should filter items by search query", async () => {
		const { result } = renderHook(() =>
			useSearch({
				items: testItems,
				searchFields: ["name", "location"],
				debounceMs: 0,
			}),
		)

		act(() => {
			result.current.setQuery("Camp")
		})

		act(() => {
			vi.advanceTimersByTime(0)
		})

		expect(result.current.filteredItems).toHaveLength(3)
	})

	it("should filter by location field", async () => {
		const { result } = renderHook(() =>
			useSearch({
				items: testItems,
				searchFields: ["location"],
				debounceMs: 0,
			}),
		)

		act(() => {
			result.current.setQuery("Bangkok")
		})

		act(() => {
			vi.advanceTimersByTime(0)
		})

		expect(result.current.filteredItems).toHaveLength(2)
	})

	it("should be case insensitive", async () => {
		const { result } = renderHook(() =>
			useSearch({
				items: testItems,
				searchFields: ["name"],
				debounceMs: 0,
			}),
		)

		act(() => {
			result.current.setQuery("ALPHA")
		})

		act(() => {
			vi.advanceTimersByTime(0)
		})

		expect(result.current.filteredItems).toHaveLength(1)
		expect(result.current.filteredItems[0].name).toBe("Camp Alpha")
	})

	it("should clear search when clearSearch is called", async () => {
		const { result } = renderHook(() =>
			useSearch({
				items: testItems,
				searchFields: ["name"],
				debounceMs: 0,
			}),
		)

		act(() => {
			result.current.setQuery("Alpha")
		})

		act(() => {
			vi.advanceTimersByTime(0)
		})

		expect(result.current.filteredItems).toHaveLength(1)

		act(() => {
			result.current.clearSearch()
		})

		act(() => {
			vi.advanceTimersByTime(0)
		})

		expect(result.current.query).toBe("")
		expect(result.current.filteredItems).toHaveLength(testItems.length)
	})

	it("should debounce search query", async () => {
		const { result } = renderHook(() =>
			useSearch({
				items: testItems,
				searchFields: ["name"],
				debounceMs: 300,
			}),
		)

		act(() => {
			result.current.setQuery("Alpha")
		})

		// Before debounce, should still show all items
		expect(result.current.filteredItems).toHaveLength(testItems.length)

		act(() => {
			vi.advanceTimersByTime(300)
		})

		expect(result.current.filteredItems).toHaveLength(1)
	})

	it("should return empty array when no items match", async () => {
		const { result } = renderHook(() =>
			useSearch({
				items: testItems,
				searchFields: ["name"],
				debounceMs: 0,
			}),
		)

		act(() => {
			result.current.setQuery("NonExistent")
		})

		act(() => {
			vi.advanceTimersByTime(0)
		})

		expect(result.current.filteredItems).toHaveLength(0)
		expect(result.current.resultCount).toBe(0)
	})
})
