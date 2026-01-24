import { useState, useCallback, useMemo, useEffect, useRef } from "react"

/**
 * Debounce a value
 */
function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])

	return debouncedValue
}

interface UseSearchOptions<T> {
	items: T[]
	searchFields: (keyof T)[]
	debounceMs?: number
}

interface UseSearchReturn<T> {
	query: string
	setQuery: (query: string) => void
	filteredItems: T[]
	isSearching: boolean
	clearSearch: () => void
	resultCount: number
}

/**
 * Generic search hook with debouncing
 */
export function useSearch<T>({
	items,
	searchFields,
	debounceMs = 300,
}: UseSearchOptions<T>): UseSearchReturn<T> {
	const [query, setQuery] = useState("")
	const debouncedQuery = useDebounce(query, debounceMs)
	const [isSearching, setIsSearching] = useState(false)

	// Track if we're waiting for debounce
	const prevQueryRef = useRef(query)
	useEffect(() => {
		if (query !== debouncedQuery) {
			setIsSearching(true)
		} else {
			setIsSearching(false)
		}
		prevQueryRef.current = query
	}, [query, debouncedQuery])

	const filteredItems = useMemo(() => {
		if (!debouncedQuery.trim()) {
			return items
		}

		const lowerQuery = debouncedQuery.toLowerCase().trim()

		return items.filter((item) => {
			return searchFields.some((field) => {
				const value = item[field]
				if (value === null || value === undefined) return false
				return String(value).toLowerCase().includes(lowerQuery)
			})
		})
	}, [items, searchFields, debouncedQuery])

	const clearSearch = useCallback(() => {
		setQuery("")
	}, [])

	return {
		query,
		setQuery,
		filteredItems,
		isSearching,
		clearSearch,
		resultCount: filteredItems.length,
	}
}

export { useDebounce }
export default useSearch
