import { cn } from "@/lib/utils";
import { Crown, Flame, Gem, Medal, Trophy, Zap } from "lucide-react";

const rewards = [
	{
		icon: <Trophy className="size-8 text-yellow-500" />,
		name: "Season Champion",
		tier: "Legendary",
		desc: "Finish #1 on the Global Leaderboard",
	},
	{
		icon: <Flame className="size-8 text-orange-500" />,
		name: "Streak Master",
		tier: "Epic",
		desc: "Maintain a 30-day shipping streak",
	},
	{
		icon: <Gem className="size-8 text-blue-400" />,
		name: "Diamond Hands",
		tier: "Rare",
		desc: "Commit code for 7 consecutive days",
	},
	{
		icon: <Crown className="size-8 text-purple-500" />,
		name: "Project of the Week",
		tier: "Epic",
		desc: "Get featured on the community showcase",
	},
	{
		icon: <Zap className="size-8 text-yellow-300" />,
		name: "Fast Shipper",
		tier: "Rare",
		desc: "Ship 5 updates in a single day",
	},
	{
		icon: <Medal className="size-8 text-stone-400" />,
		name: "Early Adopter",
		tier: "Common",
		desc: "Join Season 1 in the first week",
	},
];

export function BadgeGrid() {
	return (
		<section className="py-24 px-6 bg-[#1a1a1a] relative">
			{/* Background Texture */}
			<div
				className="absolute inset-0 opacity-5"
				style={{
					backgroundImage:
						"repeating-linear-gradient(45deg, #000 0, #000 10px, #111 10px, #111 20px)",
				}}
			/>

			<div className="max-w-6xl mx-auto relative z-10 text-center">
				<h2 className="text-5xl md:text-7xl font-black uppercase text-white mb-16 tracking-tighter">
					The Supply Drop
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{rewards.map((reward, i) => (
						<div
							key={i}
							className="bg-neutral-900 border border-neutral-800 p-6 flex flex-col items-center gap-4 hover:border-orange-500/50 transition-colors group relative overflow-hidden"
						>
							{/* Hover Reveal Effect */}
							<div className="absolute inset-0 bg-orange-600/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

							<div className="p-4 rounded-full bg-neutral-950 border border-neutral-800 group-hover:scale-110 transition-transform duration-300">
								{reward.icon}
							</div>
							<div className="space-y-1">
								<h3 className="font-bold text-xl text-neutral-200 uppercase font-mono">
									{reward.name}
								</h3>
								<span
									className={cn(
										"text-xs uppercase tracking-widest font-bold",
										reward.tier === "Legendary"
											? "text-yellow-500"
											: reward.tier === "Epic"
												? "text-purple-500"
												: reward.tier === "Rare"
													? "text-blue-500"
													: "text-stone-400",
									)}
								>
									{reward.tier} Item
								</span>
							</div>
							<p className="text-neutral-500 text-sm font-mono max-w-[200px]">
								{reward.desc}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
