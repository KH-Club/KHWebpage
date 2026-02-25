import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { CampData } from "@/types/camp"

/**
 * Default fallback image when no camp image is available
 */
const DEFAULT_CAMP_IMAGE =
	"https://rumiauttiwkkxawteedb.supabase.co/storage/v1/object/public/camps/main/default/homepagebackground.jpg"

/**
 * Database camp type from Supabase
 */
interface DbCamp {
	id: number
	camp_id: number
	name: string | null
	location: string
	province: string | null
	director: string
	date: string
	img_src: string[]
	created_at: string
	updated_at: string
}

/**
 * Get all valid images from an array, with fallback
 */
function getValidImages(images: string[] | null | undefined): string[] {
	if (!images || images.length === 0) {
		return [DEFAULT_CAMP_IMAGE]
	}

	// Filter out empty strings
	const validImages = images.filter((img) => img && img.trim() !== "")
	return validImages.length > 0 ? validImages : [DEFAULT_CAMP_IMAGE]
}

/**
 * Transform database camp to frontend CampData format
 */
const transformDbCampToFrontend = (dbCamp: DbCamp): CampData => ({
	campID: dbCamp.camp_id,
	name: dbCamp.name || "",
	location: dbCamp.location || "-",
	director: dbCamp.director || "-",
	date: dbCamp.date || "-",
	imgSrc: getValidImages(dbCamp.img_src),
	province: dbCamp.province || "-",
	isMainCamp: true,
})

/**
 * Fetch all camps from Supabase
 */
export async function fetchCampsFromSupabase(): Promise<CampData[]> {
	if (!isSupabaseConfigured()) {
		throw new Error("Supabase is not configured")
	}

	const { data, error } = await supabase
		.from("camps")
		.select("*")
		.order("camp_id", { ascending: false })

	if (error) {
		console.error("Error fetching camps from Supabase:", error)
		throw new Error(`Failed to fetch camps: ${error.message}`)
	}

	if (!data) {
		return []
	}

	return data.map(transformDbCampToFrontend)
}

/**
 * Fetch a single camp by ID from Supabase
 */
export async function fetchCampByIdFromSupabase(
	campId: number,
): Promise<CampData | null> {
	if (!isSupabaseConfigured()) {
		throw new Error("Supabase is not configured")
	}

	const { data, error } = await supabase
		.from("camps")
		.select("*")
		.eq("camp_id", campId)
		.single()

	if (error) {
		if (error.code === "PGRST116") {
			// No rows found
			return null
		}
		console.error("Error fetching camp from Supabase:", error)
		throw new Error(`Failed to fetch camp: ${error.message}`)
	}

	if (!data) {
		return null
	}

	return transformDbCampToFrontend(data)
}
