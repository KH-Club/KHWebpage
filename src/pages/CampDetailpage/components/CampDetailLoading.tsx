import { memo } from "react"

export const CampDetailLoading = memo(function CampDetailLoading() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="flex flex-col items-center gap-4">
				<div
					className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
					role="status"
					aria-label="Loading"
				/>
				<p className="text-gray-500">กำลังโหลดข้อมูลค่าย...</p>
			</div>
		</div>
	)
})

export default CampDetailLoading
