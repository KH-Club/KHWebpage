import { memo, ChangeEvent, useCallback } from "react"

export interface CampSearchProps {
	value: string
	onChange: (value: string) => void
	isSearching?: boolean
	placeholder?: string
}

const CampSearch = memo(function CampSearch({
	value,
	onChange,
	isSearching = false,
	placeholder = "Search camps by name or location...",
}: CampSearchProps) {
	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			onChange(e.target.value)
		},
		[onChange],
	)

	return (
		<div className="relative mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-md">
			<input
				type="text"
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
				aria-label="Search camps"
			/>
			{isSearching && (
				<div className="absolute right-6 top-1/2 -translate-y-1/2">
					<div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
				</div>
			)}
		</div>
	)
})

export default CampSearch
