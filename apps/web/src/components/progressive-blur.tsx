import { cn } from "@/lib/utils";

type ProgressiveBlurProps = {
	className?: string;
	classNameInner?: string;
	position?: "top" | "bottom";
	blurAmount?: string;
};

export const ProgressiveBlur = ({
	className,
	classNameInner,
	position = "top",
	blurAmount = "8px",
}: ProgressiveBlurProps) => {
	const isTop = position === "top";

	return (
		<div
			className={cn(
				"pointer-events-none absolute left-0 w-full select-none z-0",
				className,
			)}
		>
			<div
				className={cn("w-full h-full", classNameInner)}
				style={{
					maskImage: isTop
						? `linear-gradient(to bottom, black 25%, transparent)`
						: `linear-gradient(to top, black 25%, transparent)`,
					WebkitBackdropFilter: `blur(${blurAmount})`,
					backdropFilter: `blur(${blurAmount})`,
				}}
			/>
		</div>
	);
};
