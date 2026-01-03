import { Hammer, Rocket, Trophy } from "lucide-react";

export function HowItWorks() {
	return (
		<section className="py-24 px-6 bg-[#1a1a1a] border-y border-neutral-800">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col md:flex-row gap-8">
					{/* Step 1 */}
					<div className="flex-1 relative group">
						<div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:h-full group-hover:opacity-10 transition-all duration-500" />
						<div className="bg-neutral-900 border border-neutral-800 p-8 h-full relative z-10">
							<div className="mb-6 bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-blue-500/20">
								<Hammer className="size-8 text-blue-500" />
							</div>
							<h3 className="text-3xl font-black uppercase text-white mb-4">
								1. Build
							</h3>
							<p className="text-neutral-400 font-mono leading-relaxed">
								Create anything. Code, content, art, or business. Log your daily
								progress in the Town Square to earn XP.
							</p>
						</div>
					</div>

					{/* Arrow Mobile (Hidden MD) */}
					<div className="md:hidden flex justify-center text-neutral-600">
						↓
					</div>

					{/* Step 2 */}
					<div className="flex-1 relative group">
						<div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent group-hover:h-full group-hover:opacity-10 transition-all duration-500" />
						<div className="bg-neutral-900 border border-neutral-800 p-8 h-full relative z-10">
							<div className="mb-6 bg-orange-500/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-orange-500/20">
								<Rocket className="size-8 text-orange-500" />
							</div>
							<h3 className="text-3xl font-black uppercase text-white mb-4">
								2. Ship
							</h3>
							<p className="text-neutral-400 font-mono leading-relaxed">
								Consistency is key. Maintain your streak to unlock the 2.5x
								Score Multiplier. Don't let the flame die.
							</p>
						</div>
					</div>

					{/* Arrow Mobile (Hidden MD) */}
					<div className="md:hidden flex justify-center text-neutral-600">
						↓
					</div>

					{/* Step 3 */}
					<div className="flex-1 relative group">
						<div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent group-hover:h-full group-hover:opacity-10 transition-all duration-500" />
						<div className="bg-neutral-900 border border-neutral-800 p-8 h-full relative z-10">
							<div className="mb-6 bg-yellow-500/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-yellow-500/20">
								<Trophy className="size-8 text-yellow-500" />
							</div>
							<h3 className="text-3xl font-black uppercase text-white mb-4">
								3. Win
							</h3>
							<p className="text-neutral-400 font-mono leading-relaxed">
								Climb the leagues. Top performers earn Season Badges, exclusive
								merch, and a spot on the Council.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
