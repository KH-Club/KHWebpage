import { useMemo } from "react"
import { CampSearch, ListView } from "./components"
import { useCamps, useSearch } from "@/hooks"
import { CampData } from "@/types/camp"

const CampPage = () => {
	const { camps, isLoading, error, totalCamps } = useCamps()

	const searchFields: (keyof CampData)[] = useMemo(
		() => ["name", "location", "campID", "province"],
		[],
	)

	const {
		query,
		setQuery,
		filteredItems: filteredCamps,
		isSearching,
		resultCount,
	} = useSearch({
		items: camps,
		searchFields,
		debounceMs: 300,
	})

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 px-6 py-12">
				<div className="container mx-auto">
					<div className="rounded-2xl bg-red-50 p-6 text-center">
						<p className="text-red-600">
							เกิดข้อผิดพลาดในการโหลดข้อมูล: {error.message}
						</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Content */}
			<div className="container mx-auto px-6 py-8 sm:py-12">
				{/* Search */}
				<CampSearch
					value={query}
					onChange={setQuery}
					isSearching={isSearching}
					resultCount={resultCount}
					totalCount={totalCamps}
				/>

				{/* Loading State */}
				{isLoading ? (
					<div className="flex h-64 items-center justify-center">
						<div className="flex flex-col items-center gap-4">
							<div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
							<p className="text-gray-500">กำลังโหลดข้อมูลค่าย...</p>
						</div>
					</div>
				) : (
					<ListView campsList={filteredCamps} />
				)}
			</div>
		</div>
	)
}

export default CampPage
