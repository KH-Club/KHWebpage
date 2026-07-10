import { isSupabaseConfigured, supabase } from "@/lib/supabase"
import {
	defaultFeatureFlags,
	isFeatureFlagKey,
	type FeatureFlags,
} from "@/types/featureFlag"

interface FeatureFlagRow {
	key: string
	enabled: boolean
}

let featureFlagsRequest: Promise<FeatureFlags> | null = null

async function loadFeatureFlags(): Promise<FeatureFlags> {
	const defaults = { ...defaultFeatureFlags }

	if (!isSupabaseConfigured()) return defaults

	const { data, error } = await supabase
		.from("feature_flags")
		.select("key, enabled")

	if (error) {
		console.warn("Unable to load feature flags; using defaults:", error.message)
		return defaults
	}

	for (const row of (data ?? []) as FeatureFlagRow[]) {
		if (isFeatureFlagKey(row.key)) {
			defaults[row.key] = row.enabled
		}
	}

	return defaults
}

export function fetchFeatureFlags(): Promise<FeatureFlags> {
	featureFlagsRequest ??= loadFeatureFlags()
	return featureFlagsRequest
}
