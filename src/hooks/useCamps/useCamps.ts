import { useState, useEffect, useCallback } from "react"
import { CampData } from "@/types/camp"
import { KHCamps } from "@/assets/data/KHdata"

// Cache for camp data to avoid recomputing
let cachedCamps: CampData[] | null = null

/**
 * Transform raw camp data with default values
 */
const transformCampData = (camp: CampData): CampData => ({
	campID: camp.campID,
	name: camp.name,
	location: camp.location || "-",
	director: camp.director || "-",
	date: camp.date || "-",
	imgSrc: camp.imgSrc?.length ? camp.imgSrc : ["/camps/homepagebackground.jpg"],
	province: camp.province || "-",
	isMainCamp: true,
})

/**
 * Get all camps data (with caching)
 */
export const getCampsData = (): CampData[] => {
	if (cachedCamps) {
		return cachedCamps
	}
	cachedCamps = KHCamps.map(transformCampData).reverse()
	return cachedCamps
}

/**
 * Get a single camp by ID
 */
export const getCampById = (campID: number): CampData | undefined => {
	const camps = getCampsData()
	return camps.find((camp) => camp.campID === campID)
}

/**
 * Hook for fetching and managing camps data
 */
export function useCamps() {
	const [camps, setCamps] = useState<CampData[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		try {
			const data = getCampsData()
			setCamps(data)
			setIsLoading(false)
		} catch (err) {
			setError(err instanceof Error ? err : new Error("Failed to load camps"))
			setIsLoading(false)
		}
	}, [])

	const refetch = useCallback(() => {
		setIsLoading(true)
		setError(null)
		try {
			// Clear cache and refetch
			cachedCamps = null
			const data = getCampsData()
			setCamps(data)
		} catch (err) {
			setError(err instanceof Error ? err : new Error("Failed to load camps"))
		} finally {
			setIsLoading(false)
		}
	}, [])

	return {
		camps,
		isLoading,
		error,
		refetch,
		totalCamps: camps.length,
	}
}

/**
 * Hook for fetching a single camp by ID
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

		try {
			const data = getCampById(campID)
			if (!data) {
				setError(new Error(`Camp with ID ${campID} not found`))
			} else {
				setCamp(data)
			}
			setIsLoading(false)
		} catch (err) {
			setError(err instanceof Error ? err : new Error("Failed to load camp"))
			setIsLoading(false)
		}
	}, [campID])

	return {
		camp,
		isLoading,
		error,
	}
}

export default useCamps
