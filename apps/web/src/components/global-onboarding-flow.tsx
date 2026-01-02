"use client";

import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

const ONBOARDING_COOKIE = "townhall-onboarding-seen";

const steps = [
	{
		icon: "/assets/icons/Smilies/Smiling Face with Sunglasses.png",
		title: "Welcome to Townhall",
		body: "The best place for anyone to make anything and share their journey, grow together and show their work.",
	},
	{
		icon: "/assets/icons/Smilies/Star-Struck.png",
		title: "Why Join?",
		body: "Connect with passionate builders, get feedback loops, and stop wasting time on ideas that don't stick.",
	},
	{
		icon: "/assets/icons/Travel and Places/Comet.png",
		title: "Build in Public",
		body: "Building in public is the cheat code. Share your progress, get built-in accountability, and create things people actually want.",
	},
	{
		icon: "/assets/icons/People with Professions/Superhero Light Skin Tone.png",
		title: "Who Can Join?",
		body: "Anyone from anywhere in the world! We are a global, async community. Whether you have 0 or 10,000 followers, you are welcome.",
	},
	{
		icon: "/assets/icons/Smilies/Thinking Face.png",
		title: "What Can I Build?",
		body: "Anything! We're not restricted to anything. Make music, art, a new recipe, your startup, a book, a product, or innovate. This is where we go wild.",
	},
	{
		icon: "/assets/icons/Travel and Places/Fire.png",
		title: "Streaks",
		body: "Keep the flame alive! Streaks are optional but fun. Maintain a weekly posting streak to keep the flame effect on your avatar.",
	},
	{
		icon: "/assets/icons/Activities/Trophy.png",
		title: "Seasons & Leagues",
		body: "Compete in fair-play leaderboards sectioned by your start time. Join official seasons for rewards, or build at your own pace in off-seasons.",
	},
	{
		icon: "/assets/icons/Activities/Party Popper.png",
		title: "Get Active",
		body: "Post a minimum of one update per week, give feedback to others, and share your wins on social media. Let's build something epic.",
	},
];

export function GlobalOnboardingFlow() {
	const [open, setOpen] = React.useState(false);
	const [api, setApi] = React.useState<CarouselApi>();
	const [current, setCurrent] = React.useState(0);

	React.useEffect(() => {
		// Check cookie
		const hasSeenOnboarding = document.cookie
			.split("; ")
			.find((row) => row.startsWith(ONBOARDING_COOKIE));

		if (!hasSeenOnboarding) {
			// Small delay to ensure smooth entry
			setTimeout(() => setOpen(true), 1000);
		}
	}, []);

	React.useEffect(() => {
		if (!api) {
			return;
		}

		setCurrent(api.selectedScrollSnap());

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap());
		});
	}, [api]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (!api) return;

		if (e.key === "ArrowRight" || e.key === "ArrowDown") {
			e.preventDefault();
			api.scrollNext();
		} else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
			e.preventDefault();
			api.scrollPrev();
		}
	};

	const handleClose = () => {
		setOpen(false);
		// Set cookie for 1 year
		document.cookie = `${ONBOARDING_COOKIE}=true; path=/; max-age=31536000`;
		window.dispatchEvent(new Event("townhall-onboarding-complete"));
	};

	const handleStepClick = (index: number) => {
		api?.scrollTo(index);
	};

	return (
		<Dialog open={open} onOpenChange={(val) => !val && handleClose()}>
			<DialogContent
				onKeyDown={handleKeyDown}
				className="sm:max-w-lg py-6 pt-10 overflow-hidden border-none shadow-none rounded-3xl ring-0 flex flex-col justify-center items-center"
			>
				<Carousel setApi={setApi} className="w-full sm:max-w-lg">
					<CarouselContent>
						{steps.map((step, index) => (
							<CarouselItem key={index}>
								<div className="flex flex-col items-center justify-center h-full p-4">
									<div className="relative w-28 h-28 mb-16">
										<Image
											src={step.icon}
											alt={step.title}
											fill
											className="object-contain"
											priority
										/>
									</div>

									<DialogTitle className="text-3xl font-semibold text-center mb-2">
										{step.title}
									</DialogTitle>

									<p className="text-center text-muted-foreground text-lg leading-relaxed max-w-[280px]">
										{step.body}
									</p>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>

				<div className="flex justify-center gap-2 mt-8 pb-6">
					{steps.map((_, index) => (
						<button
							key={index}
							onClick={() => handleStepClick(index)}
							className={cn(
								"transition-all duration-300 rounded-full",
								current === index
									? "w-8 h-2 bg-foreground"
									: "w-2 h-2 bg-foreground/20 hover:bg-foreground/40",
							)}
							aria-label={`Go to step ${index + 1}`}
						/>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
