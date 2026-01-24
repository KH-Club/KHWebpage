import { useParams } from "react-router-dom"
import { useCampDetail } from "@/hooks"
import { LazyImage } from "@/components/ui"

const CampDetailPage = () => {
	const { campID } = useParams<{ campID: string }>()
	const parsedCampID = campID ? parseFloat(campID) : undefined
	const { camp, isLoading, error } = useCampDetail(parsedCampID)

	if (isLoading) {
		return (
			<div className="container mx-auto flex min-h-[50vh] items-center justify-center p-6">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
			</div>
		)
	}

	if (error || !camp) {
		return (
			<div className="container mx-auto p-6">
				<div className="rounded-lg bg-red-50 p-6 text-center">
					<h2 className="mb-2 text-xl font-bold text-red-600">
						Camp Not Found
					</h2>
					<p className="text-red-500">
						{error?.message || "The requested camp could not be found."}
					</p>
				</div>
			</div>
		)
	}

	const displayName = camp.name ? `"${camp.name}"` : ""

	return (
		<div className="container mx-auto p-6">
			<h1 className="mb-6 text-center text-4xl font-extrabold">
				ค่ายหอ ครั้งที่ {campID} {displayName}
			</h1>

			{camp.imgSrc.length > 0 && (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{camp.imgSrc.map((src, index) => (
						<LazyImage
							key={`${camp.campID}-img-${index}`}
							src={src}
							alt={`Camp ${camp.name} Image ${index + 1}`}
							className="h-48 w-full rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105 md:h-64"
						/>
					))}
				</div>
			)}

			<div className="mt-8 rounded-lg bg-gray-100 p-6 shadow-lg">
				<dl className="space-y-4">
					<div>
						<dt className="text-lg font-bold">จัดที่ :</dt>
						<dd className="mt-1">{camp.location}</dd>
					</div>
					<div>
						<dt className="text-lg font-bold">จัดช่วง :</dt>
						<dd className="mt-1">{camp.date}</dd>
					</div>
					<div>
						<dt className="text-lg font-bold">ผู้อำนวยการค่าย :</dt>
						<dd className="mt-1">{camp.director}</dd>
					</div>
				</dl>
			</div>
		</div>
	)
}

export default CampDetailPage
