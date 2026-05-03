import {
	ArrowLeft,
	CalendarDays,
	Clock,
	ExternalLink,
	MapPin,
} from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { LazyImage } from "@/components/ui"
import { useNewsActivities } from "@/hooks"
import { NewsActivity, NewsActivityStatus } from "@/types/newsActivity"
import { formatDisplayDate, getDeadlineState } from "@/lib/newsActivityDates"

const statusStyles: Record<NewsActivityStatus, string> = {
	upcoming: "bg-blue-50 text-blue-700 ring-blue-100",
	completed: "bg-emerald-50 text-emerald-700 ring-emerald-100",
	announcement: "bg-amber-50 text-amber-700 ring-amber-100",
}

const statusLabels: Record<NewsActivityStatus, string> = {
	upcoming: "Upcoming",
	completed: "Completed",
	announcement: "Announcement",
}

const typeLabels: Record<NewsActivity["type"], string> = {
	event: "Event",
	activity: "Activity",
	announcement: "News",
}

function ActionButton({ item }: { item: NewsActivity }) {
	const deadline = getDeadlineState(item)
	const label = item.actionLabel || "View Details"
	const isRegistrationAction = /apply|register|registration/i.test(label)
	const isDisabled =
		!item.actionUrl || (deadline?.isClosed && isRegistrationAction)

	if (isDisabled) {
		return (
			<button
				type="button"
				disabled
				className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-slate-200 px-5 text-sm font-semibold text-slate-500 sm:w-auto"
			>
				{deadline?.isClosed && isRegistrationAction
					? "Registration closed"
					: label}
			</button>
		)
	}

	return (
		<a
			href={item.actionUrl}
			target="_blank"
			rel="noreferrer"
			className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
		>
			{label}
			<ExternalLink className="h-4 w-4" />
		</a>
	)
}

export default function NewsActivityDetailPage() {
	const { eventId } = useParams()
	const { newsActivities, isLoading } = useNewsActivities()
	const item = newsActivities.find(
		(activity) => String(activity.id) === eventId,
	)

	if (isLoading) {
		return (
			<div className="min-h-screen bg-slate-50 px-6 py-12">
				<div className="container mx-auto max-w-5xl animate-pulse">
					<div className="h-6 w-36 rounded bg-slate-200" />
					<div className="mt-8 h-96 rounded-lg bg-slate-200" />
					<div className="mt-8 h-8 w-2/3 rounded bg-slate-200" />
					<div className="mt-6 space-y-3">
						<div className="h-4 rounded bg-slate-200" />
						<div className="h-4 rounded bg-slate-200" />
						<div className="h-4 w-3/4 rounded bg-slate-200" />
					</div>
				</div>
			</div>
		)
	}

	if (!item) {
		return (
			<div className="min-h-screen bg-slate-50 px-6 py-16">
				<div className="container mx-auto max-w-3xl rounded-lg border border-gray-100 bg-white p-10 text-center shadow-sm">
					<h1 className="text-2xl font-bold text-slate-950">Event not found</h1>
					<p className="mt-3 text-slate-600">
						This news or activity item may have been removed or unpublished.
					</p>
					<Link
						to="/news-activities"
						className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
					>
						Back to News
					</Link>
				</div>
			</div>
		)
	}

	const deadline = getDeadlineState(item)

	return (
		<div className="min-h-screen bg-slate-50">
			<section className="border-b border-blue-100 bg-white">
				<div className="container mx-auto max-w-6xl px-6 py-8">
					<Link
						to="/news-activities"
						className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
					>
						<ArrowLeft className="h-4 w-4" />
						Back to News & Activities
					</Link>

					<div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
						<div>
							<div className="flex flex-wrap gap-2">
								<span
									className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
										statusStyles[item.status]
									}`}
								>
									{statusLabels[item.status]}
								</span>
								<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
									{typeLabels[item.type]}
								</span>
							</div>

							<h1 className="mt-5 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
								{item.title}
							</h1>
							<p className="mt-5 text-lg leading-8 text-slate-600">
								{item.description}
							</p>
						</div>

						<div className="rounded-lg border border-blue-100 bg-blue-50/60 p-5">
							<p className="text-sm font-semibold text-blue-700">
								Registration status
							</p>
							<p className="mt-2 text-2xl font-bold text-slate-950">
								{deadline?.label || "No deadline set"}
							</p>
							{item.endDate && (
								<p className="mt-2 text-sm text-slate-600">
									Deadline: {formatDisplayDate(item.endDate)}
								</p>
							)}
							<div className="mt-5">
								<ActionButton item={item} />
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="container mx-auto max-w-6xl px-6 py-10">
				<div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
					<div className="relative h-80 sm:h-[28rem]">
						<LazyImage
							src={item.image}
							alt={`${item.title} image`}
							wrapperClassName="absolute inset-0"
							className="h-full w-full object-cover"
						/>
					</div>

					<div className="grid gap-8 p-6 lg:grid-cols-[1fr_320px] lg:p-8">
						<div>
							<h2 className="text-2xl font-bold text-slate-950">
								Full information
							</h2>
							<p className="mt-4 whitespace-pre-line text-base leading-8 text-slate-700">
								{item.description}
							</p>
						</div>

						<aside className="space-y-4">
							<div className="rounded-lg border border-gray-100 bg-slate-50 p-4">
								<p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
									<CalendarDays className="h-4 w-4 text-blue-600" />
									Event date
								</p>
								<p className="mt-2 font-semibold text-slate-950">
									{formatDisplayDate(item.eventDate)}
								</p>
							</div>
							{item.startDate && (
								<div className="rounded-lg border border-gray-100 bg-slate-50 p-4">
									<p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
										<CalendarDays className="h-4 w-4 text-blue-600" />
										Registration opens
									</p>
									<p className="mt-2 font-semibold text-slate-950">
										{formatDisplayDate(item.startDate)}
									</p>
								</div>
							)}
							{item.endDate && (
								<div className="rounded-lg border border-gray-100 bg-slate-50 p-4">
									<p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
										<Clock className="h-4 w-4 text-blue-600" />
										Deadline
									</p>
									<p className="mt-2 font-semibold text-slate-950">
										{formatDisplayDate(item.endDate)}
									</p>
									{deadline && (
										<p className="mt-1 text-sm text-blue-700">
											{deadline.label}
										</p>
									)}
								</div>
							)}
							{item.location && (
								<div className="rounded-lg border border-gray-100 bg-slate-50 p-4">
									<p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
										<MapPin className="h-4 w-4 text-blue-600" />
										Location
									</p>
									<p className="mt-2 font-semibold text-slate-950">
										{item.location}
									</p>
								</div>
							)}
						</aside>
					</div>
				</div>
			</section>
		</div>
	)
}
