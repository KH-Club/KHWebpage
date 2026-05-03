import { NewsActivity } from "@/types/newsActivity"

export type DeadlineState = {
	label: string
	tone: "open" | "today" | "closed"
	isClosed: boolean
}

export function getLocalDateKey(date = new Date()) {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, "0")
	const day = String(date.getDate()).padStart(2, "0")

	return `${year}-${month}-${day}`
}

export function getLocalDateFromKey(value: string) {
	const [year, month, day] = value.slice(0, 10).split("-").map(Number)

	if (!year || !month || !day) {
		return new Date(value)
	}

	return new Date(year, month - 1, day)
}

export function formatDisplayDate(value: string) {
	const date = getLocalDateFromKey(value)

	if (Number.isNaN(date.getTime())) {
		return value
	}

	return new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(date)
}

export function getDaysUntilDate(value: string) {
	const dateKey = value.slice(0, 10)

	if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
		return null
	}

	const today = getLocalDateFromKey(getLocalDateKey())
	const target = getLocalDateFromKey(dateKey)
	const dayMs = 24 * 60 * 60 * 1000

	return Math.round((target.getTime() - today.getTime()) / dayMs)
}

export function getDeadlineState(item: NewsActivity): DeadlineState | null {
	if (!item.endDate) {
		return null
	}

	const daysLeft = getDaysUntilDate(item.endDate)

	if (daysLeft === null) {
		return null
	}

	if (daysLeft < 0) {
		return {
			label: "Registration closed",
			tone: "closed",
			isClosed: true,
		}
	}

	if (daysLeft === 0) {
		return {
			label: "Ends today",
			tone: "today",
			isClosed: false,
		}
	}

	return {
		label: daysLeft === 1 ? "1 day left" : `${daysLeft} days left`,
		tone: "open",
		isClosed: false,
	}
}

export function formatDateRange(startDate: string, endDate: string) {
	if (!endDate || startDate === endDate) {
		return formatDisplayDate(startDate)
	}

	return `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`
}
