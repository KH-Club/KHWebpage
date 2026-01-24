import { useMemo } from "react"
import { CampSearch, ListView } from "./components"
import { useCamps, useSearch } from "@/hooks"
import { CampData } from "@/types/camp"

const CampPage = () => {
	const { camps, isLoading, error } = useCamps()

	const searchFields: (keyof CampData)[] = useMemo(
		() => ["name", "location", "campID", "province"],
		[],
	)

	const {
		query,
		setQuery,
		filteredItems: filteredCamps,
		isSearching,
	} = useSearch({
		items: camps,
		searchFields,
		debounceMs: 300,
	})

	if (error) {
		return (
			<div className="container mx-auto p-6">
				<div className="rounded-lg bg-red-50 p-4 text-red-600">
					Error loading camps: {error.message}
				</div>
			</div>
		)
	}

	return (
		<div className="container mx-auto p-6">
			<CampSearch value={query} onChange={setQuery} isSearching={isSearching} />
			{isLoading ? (
				<div className="flex h-64 items-center justify-center">
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
				</div>
			) : (
				<ListView campsList={filteredCamps} />
			)}
		</div>
	)
}

export default CampPage
