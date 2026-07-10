import { memo, ReactNode, useEffect, useMemo, useState } from "react"
import { fetchFeatureFlags } from "@/services/featureFlagService"
import {
	defaultFeatureFlags,
	type FeatureFlagKey,
	type FeatureFlags,
} from "@/types/featureFlag"
import {
	FeatureFlagContext,
	type FeatureFlagContextValue,
	useFeatureFlags,
} from "./featureFlagContext"

interface FeatureFlagProviderProps {
	children: ReactNode
	initialFlags?: FeatureFlags
}

export const FeatureFlagProvider = memo(function FeatureFlagProvider({
	children,
	initialFlags,
}: FeatureFlagProviderProps) {
	const [flags, setFlags] = useState<FeatureFlags>(
		initialFlags ?? defaultFeatureFlags,
	)
	const [isLoading, setIsLoading] = useState(initialFlags === undefined)

	useEffect(() => {
		if (initialFlags) return

		let isCurrent = true

		fetchFeatureFlags().then((loadedFlags) => {
			if (!isCurrent) return
			setFlags(loadedFlags)
			setIsLoading(false)
		})

		return () => {
			isCurrent = false
		}
	}, [initialFlags])

	const value = useMemo<FeatureFlagContextValue>(
		() => ({
			flags,
			isLoading,
			isEnabled: (key) => flags[key],
		}),
		[flags, isLoading],
	)

	return (
		<FeatureFlagContext.Provider value={value}>
			{children}
		</FeatureFlagContext.Provider>
	)
})

interface FeatureGateProps {
	flag: FeatureFlagKey
	children: ReactNode
	fallback?: ReactNode
	loadingFallback?: ReactNode
}

export function FeatureGate({
	flag,
	children,
	fallback = null,
	loadingFallback = null,
}: FeatureGateProps) {
	const { isEnabled, isLoading } = useFeatureFlags()

	if (isLoading) return loadingFallback
	return isEnabled(flag) ? children : fallback
}
