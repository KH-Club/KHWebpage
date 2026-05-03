import { useMemo, useState } from "react"
import { CalendarDays, Megaphone, Search } from "lucide-react"
import { useNewsActivities } from "@/hooks"
import { NewsActivity, NewsActivityStatus } from "@/types/newsActivity"
import { NewsActivityCard } from "./components/NewsActivityCard"

type FilterValue = "all" | NewsActivityStatus

const filters: { label: string; value: FilterValue }[] = [
	{ label: "All", value: "all" },
	{ label: "Upcoming", value: "upcoming" },
	{ label: "Completed", value: "completed" },
	{ label: "Announcements", value: "announcement" },
]

const emptyMessages: Record<FilterValue, string> = {
	all: "No published news or activities yet.",
	upcoming: "No upcoming activities are published yet.",
	completed: "No completed activities are published yet.",
	announcement: "No announcements are published yet.",
}

function getCreatedTime(item: NewsActivity) {
	const createdTime = new Date(item.createdAt).getTime()
	return Number.isNaN(createdTime) ? 0 : createdTime
}

export default function NewsActivitiesPage() {
	const { newsActivities, isLoading, error } = useNewsActivities()
	const [activeFilter, setActiveFilter] = useState<FilterValue>("all")

	const filteredItems = useMemo(() => {
		const items =
			activeFilter === "all"
				? newsActivities
				: newsActivities.filter((item) => item.status === activeFilter)

		return [...items].sort((first, second) => {
			return getCreatedTime(second) - getCreatedTime(first)
		})
	}, [activeFilter, newsActivities])

	const featuredItem = filteredItems[0]
	const remainingItems = featuredItem ? filteredItems.slice(1) : []

	const upcomingCount = newsActivities.filter(
		(item) => item.status === "upcoming",
	).length
	const completedCount = newsActivities.filter(
		(item) => item.status === "completed",
	).length
	const announcementCount = newsActivities.filter(
		(item) => item.status === "announcement",
	).length

	return (
		<div className="min-h-screen bg-slate-50">
			<section className="border-b border-blue-100 bg-white">
				<div className="container mx-auto px-6 py-12 sm:py-16">
					<div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
						<div className="max-w-3xl">
							<span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 ring-1 ring-blue-100">
								<Megaphone className="h-4 w-4" />
								News & Activities
							</span>
							<h1 className="mt-5 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
								Stay close to what is happening at KaiHor
							</h1>
							<p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
								Important updates, upcoming camp moments, completed activities,
								and announcements for campers, staff, alumni, and visitors.
							</p>
						</div>

						<div className="grid grid-cols-3 overflow-hidden rounded-lg border border-blue-100 bg-blue-50/60 text-center">
							<div className="border-r border-blue-100 p-4">
								<p className="text-2xl font-bold text-blue-700">
									{upcomingCount}
								</p>
								<p className="mt-1 text-xs font-medium text-slate-500">
									Upcoming
								</p>
							</div>
							<div className="border-r border-blue-100 p-4">
								<p className="text-2xl font-bold text-emerald-700">
									{completedCount}
								</p>
								<p className="mt-1 text-xs font-medium text-slate-500">
									Completed
								</p>
							</div>
							<div className="p-4">
								<p className="text-2xl font-bold text-amber-700">
									{announcementCount}
								</p>
								<p className="mt-1 text-xs font-medium text-slate-500">News</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="container mx-auto px-6 py-8 sm:py-12">
				<div className="mb-8 flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-2 text-sm font-medium text-slate-600">
						<CalendarDays className="h-4 w-4 text-blue-600" />
						{filteredItems.length} items
					</div>
					<div
						className="flex flex-wrap gap-2"
						aria-label="Filter news and activities"
					>
						{filters.map((filter) => {
							const isActive = activeFilter === filter.value

							return (
								<button
									key={filter.value}
									type="button"
									onClick={() => setActiveFilter(filter.value)}
									className={`min-h-10 rounded-full px-4 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
										isActive
											? "bg-blue-600 text-white shadow-sm"
											: "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
									}`}
								>
									{filter.label}
								</button>
							)
						})}
					</div>
				</div>

				{isLoading ? (
					<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
						{[0, 1, 2].map((item) => (
							<div
								key={item}
								className="h-96 animate-pulse rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
							>
								<div className="h-48 rounded-lg bg-slate-100" />
								<div className="mt-5 h-5 w-32 rounded bg-slate-100" />
								<div className="mt-5 space-y-3">
									<div className="h-4 rounded bg-slate-100" />
									<div className="h-4 rounded bg-slate-100" />
									<div className="h-4 w-2/3 rounded bg-slate-100" />
								</div>
							</div>
						))}
					</div>
				) : error ? (
					<div className="rounded-lg border border-red-100 bg-red-50 p-8 text-center">
						<p className="font-semibold text-red-700">
							Unable to load news and activities right now.
						</p>
						<p className="mt-2 text-sm text-red-600">Please try again later.</p>
					</div>
				) : filteredItems.length === 0 ? (
					<div className="rounded-lg border border-dashed border-gray-200 bg-white p-10 text-center">
						<Search className="mx-auto h-10 w-10 text-slate-300" />
						<p className="mt-4 font-semibold text-slate-800">
							{emptyMessages[activeFilter]}
						</p>
					</div>
				) : (
					<div className="space-y-8">
						{featuredItem && <NewsActivityCard item={featuredItem} featured />}

						{remainingItems.length > 0 && (
							<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
								{remainingItems.map((item) => (
									<NewsActivityCard key={item.id} item={item} />
								))}
							</div>
						)}
					</div>
				)}
			</section>
		</div>
	)
}
