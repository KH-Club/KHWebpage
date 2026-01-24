import { memo, ChangeEvent, useCallback } from "react"
import { FiSearch, FiX } from "react-icons/fi"

export interface CampSearchProps {
	value: string
	onChange: (value: string) => void
	isSearching?: boolean
	placeholder?: string
	resultCount?: number
	totalCount?: number
}

const CampSearch = memo(function CampSearch({
	value,
	onChange,
	isSearching = false,
	placeholder = "ค้นหาค่ายด้วยชื่อ, สถานที่, หรือจังหวัด...",
	resultCount,
	totalCount,
}: CampSearchProps) {
	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			onChange(e.target.value)
		},
		[onChange],
	)

	const handleClear = useCallback(() => {
		onChange("")
	}, [onChange])

	const showResultCount = value.length > 0 && resultCount !== undefined

	return (
		<div className="mb-8">
			<div className="relative">
				{/* Search Icon */}
				<div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
					<FiSearch className="h-5 w-5" />
				</div>

				{/* Input */}
				<input
					type="text"
					value={value}
					onChange={handleChange}
					placeholder={placeholder}
					className="w-full rounded-xl border-2 border-gray-200 bg-white px-12 py-4 text-base transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
					aria-label="Search camps"
				/>

				{/* Clear Button or Loading Spinner */}
				{value.length > 0 && (
					<div className="absolute right-4 top-1/2 -translate-y-1/2">
						{isSearching ? (
							<div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
						) : (
							<button
								onClick={handleClear}
								className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
								aria-label="Clear search"
							>
								<FiX className="h-5 w-5" />
							</button>
						)}
					</div>
				)}
			</div>

			{/* Result Count */}
			{showResultCount && (
				<p className="mt-3 text-sm text-gray-500">
					พบ <span className="font-semibold text-blue-600">{resultCount}</span>{" "}
					ค่าย
					{totalCount && resultCount !== totalCount && (
						<span> จากทั้งหมด {totalCount} ค่าย</span>
					)}
				</p>
			)}
		</div>
	)
})

export default CampSearch
