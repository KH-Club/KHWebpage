import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import { FeatureFlagProvider } from "@/features/featureFlags"
import SiteFooter from "../Footer"

function renderFooter(newsEnabled = true) {
	return render(
		<MemoryRouter>
			<FeatureFlagProvider
				initialFlags={{ news_activities: newsEnabled, camp_voices: true }}
			>
				<SiteFooter />
			</FeatureFlagProvider>
		</MemoryRouter>,
	)
}

describe("SiteFooter", () => {
	it("renders useful navigation and contact links", () => {
		renderFooter()

		expect(screen.getByRole("link", { name: "เรื่องราวค่าย" })).toHaveAttribute(
			"href",
			"/camp",
		)
		expect(
			screen.getByRole("link", { name: "แผนที่ความทรงจำ" }),
		).toHaveAttribute("href", "/map")
		expect(
			screen.getByRole("link", { name: "อีเมล khclub.chula@gmail.com" }),
		).toHaveAttribute("href", "mailto:khclub.chula@gmail.com")
	})

	it("hides disabled features from footer navigation", () => {
		renderFooter(false)

		expect(
			screen.queryByRole("link", { name: "ข่าวและกิจกรรม" }),
		).not.toBeInTheDocument()
	})
})
