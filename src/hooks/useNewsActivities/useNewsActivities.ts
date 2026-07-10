import { useCallback, useEffect, useState } from "react"
import { fetchPublishedNewsActivities } from "@/services/newsActivityService"
import { NewsActivity } from "@/types/newsActivity"

let cachedNewsActivities: NewsActivity[] | null = null

export function useNewsActivities() {
	const [newsActivities, setNewsActivities] = useState<NewsActivity[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	const fetchNewsActivities = useCallback(async () => {
		try {
			if (cachedNewsActivities) {
				setNewsActivities(cachedNewsActivities)
				setIsLoading(false)
				return
			}

			const data = await fetchPublishedNewsActivities()

			cachedNewsActivities = data
			setNewsActivities(data)
			setError(null)
		} catch (err) {
			console.error("Failed to fetch news and activities:", err)
			cachedNewsActivities = null
			setNewsActivities([])
			setError(err instanceof Error ? err : new Error("Unknown error"))
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchNewsActivities()
	}, [fetchNewsActivities])

	const refetch = useCallback(async () => {
		setIsLoading(true)
		setError(null)
		cachedNewsActivities = null
		await fetchNewsActivities()
	}, [fetchNewsActivities])

	return {
		newsActivities,
		isLoading,
		error,
		refetch,
		totalNewsActivities: newsActivities.length,
	}
}
