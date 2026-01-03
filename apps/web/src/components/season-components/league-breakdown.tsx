import { cn } from "@/lib/utils";
import { Crown, Gem, Medal, Shield, Sword, Trophy } from "lucide-react";

const leagues = [
	{
		name: "Bronzesmith",
		icon: Sword,
		color: "text-orange-700",
		bg: "bg-orange-900/20",
		border: "border-orange-800",
		percent: "Open Entry",
		desc: "The proving grounds. Start your journey here.",
	},
	{
		name: "Ironclad",
		icon: Shield,
		color: "text-slate-400",
		bg: "bg-slate-900/20",
		border: "border-slate-700",
		percent: "Top 75%",
		desc: "Forged in consistency. Show up daily.",
	},
	{
		name: "Silverhand",
		icon: Medal,
		color: "text-neutral-300",
		bg: "bg-neutral-800/30",
		border: "border-neutral-500",
		percent: "Top 50%",
		desc: "Refining the craft. Quality meets constraints.",
	},
	{
		name: "Goldenglow",
		icon: Trophy,
		color: "text-yellow-400",
		bg: "bg-yellow-900/20",
		border: "border-yellow-600",
		percent: "Top 20%",
		desc: "The standard of excellence. Revenue or Reach.",
	},
	{
		name: "Diamondheart",
		icon: Gem,
		color: "text-cyan-400",
		bg: "bg-cyan-900/20",
		border: "border-cyan-500",
		percent: "Top 5%",
		desc: "Unbreakable. Elite builders only.",
	},
	{
		name: "Town Council",
		icon: Crown,
		color: "text-red-500",
		bg: "bg-red-950/30",
		border: "border-red-600",
		percent: "Top 10 Users",
		desc: "Governance & Legend Status. The rulers.",
	},
];

export function LeagueBreakdown() {
	return (
		<section className="py-24 px-6 bg-[#0f0f0f] border-t border-neutral-900">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-4 tracking-tighter">
						The Hierarchy
					</h2>
					<p className="text-neutral-400 font-mono text-lg max-w-2xl mx-auto">
						Climb the ranks. Secure your legacy.
						<br />
						<span className="text-orange-600">
							Weekly demarcations reset every Sunday.
						</span>
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{leagues.map((league, i) => (
						<div
							key={i}
							className={cn(
								"relative p-6 rounded-xl border-2 transition-all hover:-translate-y-1 hover:shadow-2xl",
								league.bg,
								league.border,
							)}
						>
							<div className="flex items-start justify-between mb-4">
								<league.icon className={cn("size-10", league.color)} />
								<span
									className={cn(
										"font-mono text-xs font-bold px-2 py-1 rounded bg-black/50 border",
										league.color,
										league.border,
									)}
								>
									{league.percent}
								</span>
							</div>

							<h3
								className={cn(
									"text-2xl font-black uppercase mb-2",
									league.color,
								)}
							>
								{league.name}
							</h3>
							<p className="text-neutral-400 font-mono text-sm leading-relaxed">
								{league.desc}
							</p>

							{/* Decorative Corner */}
							<div
								className={cn(
									"absolute bottom-2 right-2 w-2 h-2 rounded-full",
									league.color.replace("text-", "bg-"),
								)}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
