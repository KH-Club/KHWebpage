import { memo } from "react"
import { CalendarDays, Clock, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { LazyImage } from "@/components/ui"
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

export const NewsActivityCard = memo(function NewsActivityCard({
	item,
	featured = false,
}: {
	item: NewsActivity
	featured?: boolean
}) {
	const deadline = getDeadlineState(item)

	return (
		<Link
			to={`/event/${item.id}`}
			aria-label={`View details for ${item.title}`}
			className={
				featured
					? "group grid overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:grid-cols-[1.05fr_0.95fr]"
					: "group flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			}
		>
			<article
				className={
					featured
						? "contents"
						: "flex h-full flex-col overflow-hidden rounded-lg"
				}
			>
				<div className={featured ? "relative min-h-72" : "relative h-56"}>
					<LazyImage
						src={item.image}
						alt={`${item.title} image`}
						wrapperClassName="absolute inset-0"
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/5 to-transparent" />
					<div className="absolute left-4 top-4 flex flex-wrap gap-2">
						<span
							className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
								statusStyles[item.status]
							}`}
						>
							{statusLabels[item.status]}
						</span>
						<span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-white/70">
							{typeLabels[item.type]}
						</span>
					</div>
				</div>

				<div
					className={
						featured ? "flex flex-col p-6 sm:p-8" : "flex flex-1 flex-col p-5"
					}
				>
					<div className="mb-4 flex flex-wrap gap-3 text-sm text-slate-500">
						<span className="inline-flex items-center gap-1.5">
							<CalendarDays className="h-4 w-4 text-blue-600" />
							{formatDisplayDate(item.eventDate)}
						</span>
						{item.location && (
							<span className="inline-flex items-center gap-1.5">
								<MapPin className="h-4 w-4 text-blue-600" />
								{item.location}
							</span>
						)}
					</div>

					<h2
						className={
							featured
								? "text-2xl font-bold leading-tight text-slate-950 transition-colors group-hover:text-blue-700 sm:text-3xl"
								: "line-clamp-2 text-xl font-bold leading-tight text-slate-950 transition-colors group-hover:text-blue-700"
						}
					>
						{item.title}
					</h2>
					<p
						className={
							featured
								? "mt-4 text-base leading-7 text-slate-600"
								: "mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600"
						}
					>
						{item.description}
					</p>

					<div className="mt-5 flex flex-wrap items-center justify-between gap-3">
						{deadline ? (
							<span
								className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
									deadline.tone === "closed"
										? "bg-slate-100 text-slate-600"
										: deadline.tone === "today"
											? "bg-amber-100 text-amber-700"
											: "bg-blue-100 text-blue-700"
								}`}
							>
								<Clock className="h-3.5 w-3.5" />
								{deadline.label}
							</span>
						) : (
							<span />
						)}
						<span className="text-sm font-semibold text-blue-700">
							View details
						</span>
					</div>
				</div>
			</article>
		</Link>
	)
})
