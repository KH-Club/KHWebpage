import { isSupabaseConfigured, supabase } from "@/lib/supabase"
import { AlumniStudentVoice } from "@/types/alumniStudentVoice"

export const CAMP_VOICES_LIMIT = 3

interface DbAlumniStudentVoice {
	id: number
	name: string
	role: string
	relation: string | null
	camp_year: string | null
	quote: string
	image_url: string | null
	image_alt: string | null
	display_order: number
	is_published: boolean
	created_at: string
	updated_at: string
}

const transformDbVoiceToFrontend = (
	voice: DbAlumniStudentVoice,
): AlumniStudentVoice => ({
	id: voice.id,
	name: voice.name,
	role: voice.role,
	relation: voice.relation || "",
	campYear: voice.camp_year || "",
	quote: voice.quote,
	imageAlt: voice.image_alt || `${voice.name} portrait`,
	image: voice.image_url || undefined,
})

export async function fetchPublishedAlumniStudentVoices(): Promise<
	AlumniStudentVoice[]
> {
	if (!isSupabaseConfigured()) {
		throw new Error("Supabase is not configured")
	}

	const { data, error } = await supabase
		.from("alumni_student_voices")
		.select(
			"id,name,role,relation,camp_year,quote,image_url,image_alt,display_order,is_published,created_at,updated_at",
		)
		.eq("is_published", true)
		.order("display_order", { ascending: true })
		.order("created_at", { ascending: true })
		.limit(CAMP_VOICES_LIMIT)

	if (error) {
		console.error("Error fetching alumni/student voices from Supabase:", error)
		throw new Error(`Failed to fetch alumni/student voices: ${error.message}`)
	}

	return (data ?? []).map((voice) =>
		transformDbVoiceToFrontend(voice as DbAlumniStudentVoice),
	)
}
