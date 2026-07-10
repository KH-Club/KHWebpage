import { createContext, useContext } from "react"
import {
	defaultFeatureFlags,
	type FeatureFlagKey,
	type FeatureFlags,
} from "@/types/featureFlag"

export interface FeatureFlagContextValue {
	flags: FeatureFlags
	isLoading: boolean
	isEnabled: (key: FeatureFlagKey) => boolean
}

const defaultContextValue: FeatureFlagContextValue = {
	flags: defaultFeatureFlags,
	isLoading: false,
	isEnabled: (key) => defaultFeatureFlags[key],
}

export const FeatureFlagContext = createContext(defaultContextValue)

export function useFeatureFlags() {
	return useContext(FeatureFlagContext)
}
