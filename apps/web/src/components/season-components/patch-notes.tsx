import { CheckCircle2 } from "lucide-react";

export function PatchNotes() {
	return (
		<section className="py-20 px-6 bg-[#111] border-t-8 border-neutral-800">
			<div className="max-w-4xl mx-auto">
				<h2 className="text-4xl font-black uppercase text-white mb-8 flex items-center gap-4">
					<span className="text-orange-600">v1.0.0</span> Patch Notes
				</h2>

				<div className="space-y-12 font-mono text-neutral-300">
					{/* Gameplay Changes */}
					<div>
						<h3 className="text-orange-500 font-bold text-xl mb-4 uppercase tracking-wider border-b border-neutral-800 pb-2">
							Gameplay Changes
						</h3>
						<ul className="space-y-3">
							{[
								"Added 'Leagues': Compete in 6-week cycles.",
								"Added 'Daily Streaks': Consistency multiplier enabled (up to 2.5x).",
								"Updated 'XP Calculation': Code commits now grant significant XP boost.",
								"Fixed an issue where 'Motivation' would drop after 2 weeks.",
							].map((item, i) => (
								<li key={i} className="flex items-start gap-3">
									<CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Visual Updates */}
					<div>
						<h3 className="text-blue-500 font-bold text-xl mb-4 uppercase tracking-wider border-b border-neutral-800 pb-2">
							Visual Updates
						</h3>
						<ul className="space-y-3">
							{[
								"Townhall has been re-textured with a new 'Industrial' theme.",
								"Added new particle effects for level-ups.",
								"Updated the user dashboard for better readability.",
							].map((item, i) => (
								<li key={i} className="flex items-start gap-3">
									<CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-16 text-center text-neutral-600 text-sm">
					Townhall Season 1 &copy; 2026. All rights reserved.
				</div>
			</div>
		</section>
	);
}
