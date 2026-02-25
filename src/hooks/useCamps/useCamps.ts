import { useState, useEffect, useCallback } from "react"
import { CampData } from "@/types/camp"
import {
	fetchCampsFromSupabase,
	fetchCampByIdFromSupabase,
} from "@/services/campService"

// Cache for camp data to avoid refetching
let cachedCamps: CampData[] | null = null

/**
 * Hook for fetching and managing camps data from Supabase
 */
export function useCamps() {
	const [camps, setCamps] = useState<CampData[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	const fetchCamps = useCallback(async () => {
		try {
			// Return cached data if available
			if (cachedCamps) {
				setCamps(cachedCamps)
				setIsLoading(false)
				return
			}

			const data = await fetchCampsFromSupabase()
			cachedCamps = data
			setCamps(data)
			setError(null)
		} catch (err) {
			console.error("Failed to fetch camps:", err)
			setError(err instanceof Error ? err : new Error("Failed to load camps"))
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchCamps()
	}, [fetchCamps])

	const refetch = useCallback(async () => {
		setIsLoading(true)
		setError(null)
		// Clear cache and refetch
		cachedCamps = null
		await fetchCamps()
	}, [fetchCamps])

	return {
		camps,
		isLoading,
		error,
		refetch,
		totalCamps: camps.length,
	}
}

/**
 * Hook for fetching a single camp by ID from Supabase
 */
export function useCampDetail(campID: number | undefined) {
	const [camp, setCamp] = useState<CampData | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		if (campID === undefined || isNaN(campID)) {
			setError(new Error("Invalid camp ID"))
			setIsLoading(false)
			return
		}

		const fetchCamp = async () => {
			try {
				const data = await fetchCampByIdFromSupabase(campID)
				if (!data) {
					setError(new Error(`Camp with ID ${campID} not found`))
				} else {
					setCamp(data)
					setError(null)
				}
			} catch (err) {
				console.error("Failed to fetch camp:", err)
				setError(err instanceof Error ? err : new Error("Failed to load camp"))
			} finally {
				setIsLoading(false)
			}
		}

		fetchCamp()
	}, [campID])

	return {
		camp,
		isLoading,
		error,
	}
}

/**
 * Get all camps data (for static/sync usage - fetches from cache)
 * @deprecated Use useCamps hook instead for async data fetching
 */
export const getCampsData = (): CampData[] => {
	return cachedCamps || []
}

/**
 * Get a single camp by ID from cache
 * @deprecated Use useCampDetail hook instead for async data fetching
 */
export const getCampById = (campID: number): CampData | undefined => {
	const camps = getCampsData()
	return camps.find((camp) => camp.campID === campID)
}

export default useCamps
