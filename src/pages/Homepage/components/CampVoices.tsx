import { memo } from "react"
import { LazyImage } from "@/components/ui"
import { useAlumniStudentVoices } from "@/hooks"
import { AlumniStudentVoice } from "@/types/alumniStudentVoice"

const getInitials = (name: string) => {
	const words = name.trim().split(/\s+/).filter(Boolean)

	if (words.length > 1) {
		return words
			.slice(0, 2)
			.map((word) => word[0])
			.join("")
	}

	return name.trim().slice(0, 2)
}

const CampVoicesHeader = memo(function CampVoicesHeader() {
	return (
		<div className="mx-auto mb-12 max-w-3xl text-center">
			<span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-blue-600">
				Camp Voices
			</span>
			<h2
				id="camp-voices-heading"
				className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl"
			>
				เสียงจากค่าย
			</h2>
			<p className="text-base leading-relaxed text-gray-600 sm:text-lg">
				เรื่องราวจากคนที่เคยเป็นส่วนหนึ่งของค่ายหอ.
			</p>
		</div>
	)
})

const VoiceAvatar = memo(function VoiceAvatar({
	voice,
}: {
	voice: AlumniStudentVoice
}) {
	if (voice.image) {
		return (
			<LazyImage
				src={voice.image}
				alt={voice.imageAlt}
				aspectRatio="square"
				wrapperClassName="h-40 w-40 rounded-full border-4 border-white shadow-md sm:h-44 sm:w-44 lg:h-48 lg:w-48"
				className="h-full w-full object-cover"
			/>
		)
	}

	return (
		<div
			role="img"
			aria-label={`อวาตาร์สำรองของ ${voice.name}`}
			className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-600 to-emerald-600 text-5xl font-bold text-white shadow-md sm:h-44 sm:w-44 sm:text-6xl lg:h-48 lg:w-48"
			data-testid="camp-voice-fallback-avatar"
		>
			{getInitials(voice.name)}
		</div>
	)
})

const VoiceCard = memo(function VoiceCard({
	voice,
}: {
	voice: AlumniStudentVoice
}) {
	return (
		<article className="flex h-full flex-col rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8">
			<div className="mb-8 flex flex-col items-center gap-5 text-center">
				<VoiceAvatar voice={voice} />
				{(voice.campYear || voice.relation) && (
					<div>
						{voice.campYear && (
							<p className="text-sm font-medium text-emerald-700">
								{voice.campYear}
							</p>
						)}
						{voice.relation && (
							<p className="text-sm text-gray-500">{voice.relation}</p>
						)}
					</div>
				)}
			</div>

			<blockquote className="mb-6 flex-1 text-base leading-relaxed text-gray-700">
				“{voice.quote}”
			</blockquote>

			<div className="border-t border-gray-200 pt-5">
				<h3 className="text-xl font-bold text-gray-900">{voice.name}</h3>
				<p className="mt-1 text-sm font-medium text-blue-700">{voice.role}</p>
			</div>
		</article>
	)
})

const CampVoicesLoading = memo(function CampVoicesLoading() {
	return (
		<div className="grid gap-6 lg:grid-cols-3" aria-label="Loading camp voices">
			{[0, 1, 2].map((item) => (
				<div
					key={item}
					className="h-96 animate-pulse rounded-2xl border border-gray-100 bg-gray-50 p-8"
				>
					<div className="mx-auto h-44 w-44 rounded-full bg-gray-200" />
					<div className="mx-auto mt-8 h-4 w-24 rounded bg-gray-200" />
					<div className="mt-8 space-y-3">
						<div className="h-4 rounded bg-gray-200" />
						<div className="h-4 rounded bg-gray-200" />
						<div className="h-4 w-2/3 rounded bg-gray-200" />
					</div>
				</div>
			))}
		</div>
	)
})

const CampVoices = memo(function CampVoices() {
	const { voices, isLoading, error } = useAlumniStudentVoices()

	return (
		<section
			id="camp-voices-section"
			aria-labelledby="camp-voices-heading"
			className="bg-white py-16 md:py-24"
		>
			<div className="container mx-auto px-6">
				<CampVoicesHeader />

				{isLoading ? (
					<CampVoicesLoading />
				) : error ? (
					<div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center text-red-700">
						ไม่สามารถโหลดเสียงจากค่ายได้ในขณะนี้
					</div>
				) : voices.length === 0 ? (
					<div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center text-gray-600">
						ยังไม่มีเสียงจากค่ายที่เผยแพร่
					</div>
				) : (
					<div className="grid gap-6 lg:grid-cols-3">
						{voices.map((voice) => (
							<VoiceCard key={voice.id} voice={voice} />
						))}
					</div>
				)}
			</div>
		</section>
	)
})

export default CampVoices
