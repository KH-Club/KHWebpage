import { isSupabaseConfigured, supabase } from "@/lib/supabase"
import {
	NewsActivity,
	NewsActivityStatus,
	NewsActivityType,
} from "@/types/newsActivity"
import { getLocalDateKey } from "@/lib/newsActivityDates"

const DEFAULT_NEWS_ACTIVITY_IMAGE = "/camps/homepagebackground.jpg"

type DbNewsActivity = {
	id: number
	title: string
	description: string | null
	event_date: string
	start_date?: string | null
	end_date?: string | null
	location: string | null
	img_src: string | null
	type?: NewsActivityType | null
	status?: NewsActivityStatus | null
	action_label?: string | null
	action_url?: string | null
	is_published: boolean
	created_at: string
	updated_at: string
}

const typeLabels: Record<NewsActivityType, NewsActivityType> = {
	event: "event",
	activity: "activity",
	announcement: "announcement",
}

const statusLabels: Record<NewsActivityStatus, NewsActivityStatus> = {
	upcoming: "upcoming",
	completed: "completed",
	announcement: "announcement",
}

export function resolveNewsActivityStatus(
	eventDate: string,
	type?: NewsActivityType | null,
	status?: NewsActivityStatus | null,
): NewsActivityStatus {
	if (status && statusLabels[status]) {
		return status
	}

	if (type === "announcement") {
		return "announcement"
	}

	const eventDateKey = eventDate.slice(0, 10)

	if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDateKey)) {
		return "completed"
	}

	return eventDateKey >= getLocalDateKey() ? "upcoming" : "completed"
}

export function transformDbNewsActivityToFrontend(
	item: DbNewsActivity,
): NewsActivity {
	const type =
		item.type && typeLabels[item.type] ? item.type : ("event" as const)

	return {
		id: item.id,
		title: item.title,
		description: item.description || "",
		eventDate: item.event_date,
		startDate: item.start_date || item.event_date,
		endDate: item.end_date || "",
		location: item.location || "",
		image: item.img_src || DEFAULT_NEWS_ACTIVITY_IMAGE,
		type,
		status: resolveNewsActivityStatus(item.event_date, type, item.status),
		actionLabel: item.action_label || "",
		actionUrl: item.action_url || "",
		isPublished: item.is_published,
		createdAt: item.created_at,
		updatedAt: item.updated_at,
	}
}

export async function fetchPublishedNewsActivities(): Promise<NewsActivity[]> {
	if (!isSupabaseConfigured()) {
		throw new Error("Supabase is not configured")
	}

	const { data, error } = await supabase
		.from("events")
		.select("*")
		.eq("is_published", true)
		.order("created_at", { ascending: false })
		.order("event_date", { ascending: false })

	if (error) {
		console.error("Error fetching news and activities from Supabase:", error)
		throw new Error(`Failed to fetch news and activities: ${error.message}`)
	}

	return (data ?? []).map((item) =>
		transformDbNewsActivityToFrontend(item as DbNewsActivity),
	)
}
