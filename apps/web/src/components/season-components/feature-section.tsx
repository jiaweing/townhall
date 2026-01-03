import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface FeatureSectionProps {
	title: string;
	subtitle: string;
	description: string;
	day: string;
	align?: "left" | "right";
	imageSrc?: string; // Determine if we use image or custom graphic
	children?: ReactNode; // Custom graphic slot
	className?: string;
}

export function FeatureSection({
	title,
	subtitle,
	description,
	day,
	align = "left",
	children,
	className,
}: FeatureSectionProps) {
	return (
		<section
			className={cn(
				"relative py-32 px-6 md:px-12 overflow-hidden border-b-4 border-neutral-800",
				align === "right" ? "bg-[#121212]" : "bg-[#0a0a0a]",
				className,
			)}
		>
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
				{/* Text Content */}
				<div
					className={cn(
						"space-y-8",
						align === "right" ? "md:order-2" : "md:order-1",
					)}
				>
					<div className="flex items-center gap-4">
						<div className="bg-orange-600 text-black font-bold font-mono px-3 py-1 text-xl -rotate-2">
							{day}
						</div>
						<div className="h-[2px] w-24 bg-neutral-700" />
					</div>

					<h2 className="text-6xl font-black uppercase tracking-tighter text-white">
						{title}
						<span className="block text-neutral-500 text-3xl mt-2 font-normal font-serif italic">
							{subtitle}
						</span>
					</h2>

					<p className="text-xl text-neutral-400 leading-relaxed max-w-lg font-mono">
						{description}
					</p>
				</div>

				{/* Visual Content */}
				<div
					className={cn(
						"relative min-h-[400px] flex items-center justify-center bg-neutral-900/50 rounded-lg border-2 border-neutral-800 border-dashed p-8",
						align === "right" ? "md:order-1" : "md:order-2",
					)}
				>
					{/* Corner accents */}
					<div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-600" />
					<div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-600" />

					{children}
				</div>
			</div>
		</section>
	);
}
