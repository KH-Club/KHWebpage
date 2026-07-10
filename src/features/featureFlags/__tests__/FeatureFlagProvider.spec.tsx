import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import { SiteHeader } from "@/components/Header/site-header"
import { FeatureFlagProvider, FeatureGate } from "../FeatureFlagProvider"

describe("FeatureGate", () => {
	it("renders enabled feature content", () => {
		render(
			<FeatureFlagProvider
				initialFlags={{ news_activities: true, camp_voices: false }}
			>
				<FeatureGate flag="news_activities">
					<p>Latest news</p>
				</FeatureGate>
			</FeatureFlagProvider>,
		)

		expect(screen.getByText("Latest news")).toBeInTheDocument()
	})

	it("renders the fallback when a feature is disabled", () => {
		render(
			<FeatureFlagProvider
				initialFlags={{ news_activities: false, camp_voices: true }}
			>
				<FeatureGate flag="news_activities" fallback={<p>Unavailable</p>}>
					<p>Latest news</p>
				</FeatureGate>
			</FeatureFlagProvider>,
		)

		expect(screen.queryByText("Latest news")).not.toBeInTheDocument()
		expect(screen.getByText("Unavailable")).toBeInTheDocument()
	})

	it("removes disabled features from public navigation", () => {
		render(
			<MemoryRouter>
				<FeatureFlagProvider
					initialFlags={{ news_activities: false, camp_voices: true }}
				>
					<SiteHeader />
				</FeatureFlagProvider>
			</MemoryRouter>,
		)

		expect(screen.queryByRole("link", { name: "News" })).not.toBeInTheDocument()
		expect(screen.getByRole("link", { name: "Camp" })).toBeInTheDocument()
	})
})
