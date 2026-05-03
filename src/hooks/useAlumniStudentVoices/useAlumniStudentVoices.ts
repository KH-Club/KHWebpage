import { useCallback, useEffect, useState } from "react"
import { fetchPublishedAlumniStudentVoices } from "@/services/alumniStudentVoiceService"
import { AlumniStudentVoice } from "@/types/alumniStudentVoice"

let cachedVoices: AlumniStudentVoice[] | null = null

export function useAlumniStudentVoices() {
	const [voices, setVoices] = useState<AlumniStudentVoice[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	const fetchVoices = useCallback(async () => {
		try {
			if (cachedVoices) {
				setVoices(cachedVoices)
				setIsLoading(false)
				return
			}

			const data = await fetchPublishedAlumniStudentVoices()
			cachedVoices = data
			setVoices(data)
			setError(null)
		} catch (err) {
			console.error("Failed to fetch alumni/student voices:", err)
			setError(
				err instanceof Error
					? err
					: new Error("Failed to load alumni/student voices"),
			)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchVoices()
	}, [fetchVoices])

	const refetch = useCallback(async () => {
		setIsLoading(true)
		setError(null)
		cachedVoices = null
		await fetchVoices()
	}, [fetchVoices])

	return {
		voices,
		isLoading,
		error,
		refetch,
		totalVoices: voices.length,
	}
}
