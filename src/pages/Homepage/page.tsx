import { About, CampVoices, Core, LandingView } from "./components"
import { FeatureGate } from "@/features/featureFlags"

const Home = () => {
	return (
		<>
			<LandingView />
			<Core />
			<About />
			<FeatureGate flag="camp_voices">
				<CampVoices />
			</FeatureGate>
		</>
	)
}

export default Home
