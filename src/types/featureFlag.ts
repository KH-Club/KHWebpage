export const featureFlagKeys = ["news_activities", "camp_voices"] as const

export type FeatureFlagKey = (typeof featureFlagKeys)[number]
export type FeatureFlags = Record<FeatureFlagKey, boolean>

export const defaultFeatureFlags: FeatureFlags = {
	news_activities: true,
	camp_voices: true,
}

export function isFeatureFlagKey(value: string): value is FeatureFlagKey {
	return featureFlagKeys.includes(value as FeatureFlagKey)
}
