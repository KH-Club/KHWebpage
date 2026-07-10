export type NewsActivityType = "event" | "activity" | "announcement"

export type NewsActivityStatus = "upcoming" | "completed" | "announcement"

export type NewsActivity = {
	id: number
	title: string
	description: string
	eventDate: string
	startDate: string
	endDate: string
	location: string
	image: string
	type: NewsActivityType
	status: NewsActivityStatus
	actionLabel: string
	actionUrl: string
	isPublished: boolean
	createdAt: string
	updatedAt: string
}
