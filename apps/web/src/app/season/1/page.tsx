import Lanyard from "@/components/react-bits/Lanyard";
import { BadgeGrid } from "@/components/season-components/badge-grid";
import { BlueprintHero } from "@/components/season-components/blueprint-hero";
import { FeatureSection } from "@/components/season-components/feature-section";
import { HowItWorks } from "@/components/season-components/how-it-works";
import { LeagueBreakdown } from "@/components/season-components/league-breakdown";
import { PatchNotes } from "@/components/season-components/patch-notes";
import { Button } from "@/components/ui/button";
import { BarChart3, Flame } from "lucide-react";
import Link from "next/link";

export default function SeasonOnePage() {
	return (
		<main className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-orange-500 selection:text-white md:-mt-24 relative z-0">
			<div className="hidden md:block fixed top-0 right-0 z-50 h-screen w-screen pointer-events-none">
				<Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
			</div>
			<BlueprintHero />

			<HowItWorks />

			<FeatureSection
				day="DAY 1"
				title="The Arena"
				subtitle="Ranked Leagues"
				description="Building in public is the cheat code to shipping products people actually want. Verify your market need, get accountability, and get feedback loops. In The Arena, you're not just coding—you're competing. We've introduced a 6-week ranked system. Start in Bronze and ship your way to Diamond. Only the top 1% will reach the Town Council."
				align="left"
			>
				{/* Visual for Day 1 */}
				<div className="w-full h-full flex items-center justify-center relative">
					<BarChart3 className="w-48 h-48 text-neutral-800 absolute opacity-20" />
					<div className="relative z-10 bg-neutral-900 border border-neutral-700 rounded p-6 shadow-2xl rotate-3">
						<div className="flex gap-4 items-end h-32 w-48">
							<div className="w-1/3 bg-neutral-800 h-[40%]" />
							<div className="w-1/3 bg-orange-600 h-[80%] relative shadow-[0_0_15px_rgba(234,88,12,0.5)]" />
							<div className="w-1/3 bg-neutral-800 h-[60%]" />
						</div>
						<div className="mt-4 text-center font-mono text-sm text-neutral-400">
							LEADERBOARD_V1
						</div>
					</div>
				</div>
			</FeatureSection>

			<LeagueBreakdown />

			<FeatureSection
				day="DAY 2"
				title="Consistency"
				subtitle="The Streak Engine"
				description="Keep the flame alive! Streaks are optional, but they are the ultimate flex. Maintain a weekly posting streak to keep the flame effect on your avatar. Miss a week? Extinguished. Consistency is king in the Season 1 meta."
				align="right"
			>
				{/* Visual for Day 2 */}
				<div className="w-full h-full flex items-center justify-center relative">
					<div className="relative">
						<Flame className="w-32 h-32 text-orange-500 animate-pulse drop-shadow-[0_0_25px_rgba(249,115,22,0.6)]" />
						<div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-neutral-950 px-3 py-1 font-mono text-xs border border-orange-500/50 text-orange-500 rounded-full">
							x2.5 MULTIPLIER
						</div>
					</div>
				</div>
			</FeatureSection>

			<FeatureSection
				day="INFO"
				title="Global Access"
				subtitle="Who Can Join?"
				description="Anyone from anywhere in the world. We are a completely async global community. Whether you're in Tokyo, New York, or a small village, as long as you have internet and a passion to build, you are welcome. Zero followers? No problem. What matters is your drive."
				align="left"
			>
				{/* Visual for Info */}
				<div className="w-full h-full flex items-center justify-center relative">
					<div className="border-4 border-dashed border-neutral-700 rounded-full w-48 h-48 flex items-center justify-center bg-neutral-900/50">
						<span className="font-mono text-xl text-neutral-500 font-bold">
							NO LIMITS
						</span>
					</div>
				</div>
			</FeatureSection>

			<BadgeGrid />

			<section className="py-32 bg-[#0a0a0a] text-center border-t border-neutral-800">
				<h3 className="text-4xl md:text-5xl font-black uppercase mb-8">
					Are you ready?
				</h3>
				<div className="flex flex-col md:flex-row items-center justify-center gap-6">
					<Link href="/sign-up">
						<Button
							size="lg"
							className="h-14 px-8 text-xl rounded-none bg-orange-600 hover:bg-orange-700 text-white font-bold border-1 border-white/20"
						>
							JOIN SEASON 1 NOW
						</Button>
					</Link>
					<Link href="/leaderboard">
						<Button
							variant="outline"
							size="lg"
							className="h-14 px-8 text-xl rounded-none border-2 border-neutral-700 hover:bg-neutral-800 text-white font-mono"
						>
							VIEW STANDINGS
						</Button>
					</Link>
				</div>
			</section>

			<PatchNotes />
		</main>
	);
}
