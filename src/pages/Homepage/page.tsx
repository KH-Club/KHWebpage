import {
	About,
	CampVoices,
	Core,
	JoinJourneyChapter,
	JourneyRouteDivider,
	LandingView,
	MemoryMapChapter,
} from "./components"
import { FeatureGate } from "@/features/featureFlags"

const Home = () => {
	return (
		<div className="homepage-journey bg-slate-50">
			<LandingView />
			<Core />
			<JourneyRouteDivider className="bg-gradient-to-b from-[#eaf5ff] to-white" />
			<About />
			<JourneyRouteDivider
				variant={1}
				className="bg-gradient-to-b from-white to-[#eaf5ff]"
			/>
			<MemoryMapChapter />
			<FeatureGate flag="camp_voices">
				<CampVoices />
			</FeatureGate>
			<JourneyRouteDivider variant={2} className="bg-[#eaf5ff]" />
			<JoinJourneyChapter />
		</div>
	)
}

export default Home
