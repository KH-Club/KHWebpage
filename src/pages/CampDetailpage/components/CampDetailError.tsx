import { memo } from "react"
import { Button } from "@/components/ui"

export interface CampDetailErrorProps {
	message?: string
	onBack: () => void
}

export const CampDetailError = memo(function CampDetailError({
	message,
	onBack,
}: CampDetailErrorProps) {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
			<div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
				<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
					<span className="text-3xl" role="img" aria-label="Sad face">
						😕
					</span>
				</div>
				<h2 className="mb-2 text-xl font-bold text-gray-900">
					ไม่พบข้อมูลค่าย
				</h2>
				<p className="mb-6 text-gray-500">
					{message || "ไม่พบค่ายที่คุณต้องการ กรุณาลองใหม่อีกครั้ง"}
				</p>
				<Button onClick={onBack} variant="primary">
					กลับไปหน้าค่ายทั้งหมด
				</Button>
			</div>
		</div>
	)
})

export default CampDetailError
