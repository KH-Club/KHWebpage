import {
	About,
	CampVoices,
	Core,
	JoinJourneyChapter,
	LandingView,
	MemoryMapChapter,
} from "./components"
import { FeatureGate } from "@/features/featureFlags"

const Home = () => {
	return (
		<div className="homepage-journey bg-slate-50">
			<LandingView />
			<Core />
			<About />
			<MemoryMapChapter />
			<FeatureGate flag="camp_voices">
				<CampVoices />
			</FeatureGate>
			<JoinJourneyChapter />
		</div>
	)
}

export default Home
