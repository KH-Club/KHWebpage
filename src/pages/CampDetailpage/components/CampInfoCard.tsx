import { memo, ReactNode } from "react"

export interface CampInfoCardProps {
	icon: ReactNode
	iconBgColor: string
	title: string
	value: string
}

export const CampInfoCard = memo(function CampInfoCard({
	icon,
	iconBgColor,
	title,
	value,
}: CampInfoCardProps) {
	return (
		<div className="rounded-2xl bg-white p-6 shadow-md">
			<div className="mb-3 flex items-center gap-3">
				<div
					className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBgColor}`}
				>
					{icon}
				</div>
				<h3 className="font-semibold text-gray-900">{title}</h3>
			</div>
			<p className="text-gray-700">{value}</p>
		</div>
	)
})

export default CampInfoCard
