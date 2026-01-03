import { cn } from "@/lib/utils";

export function SeasonHero({
	className,
	title,
	subtitle,
}: {
	className?: string;
	title: string;
	subtitle: string;
}) {
	return (
		<div
			className={cn(
				"relative h-[60vh] flex flex-col items-center justify-center text-center overflow-hidden bg-dot-black/[0.2] dark:bg-dot-white/[0.2]",
				className,
			)}
		>
			{/* Radial gradient for the container to give a faded look */}
			<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

			<div className="relative z-20 space-y-6 max-w-4xl mx-auto px-4">
				<div className="inline-block rounded-full bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-500 border border-orange-500/20 backdrop-blur-sm">
					Update 1.0 Live Now
				</div>
				<h1 className="text-6xl md:text-9xl font-serif font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-200 dark:to-neutral-500">
					{title}
				</h1>
				<p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto font-light">
					{subtitle}
				</p>
			</div>
		</div>
	);
}
