"use client";

import { MagicalBackground } from "@/components/magical-background";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function WelcomeLetter() {
	const [showEnvelope, setShowEnvelope] = useState(false);
	const [showLetter, setShowLetter] = useState(false);
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
		const hasSeen = localStorage.getItem("townhall-welcome-seen");
		if (!hasSeen) {
			// Delay slightly to ensure fonts/layout loaded
			setTimeout(() => setShowEnvelope(true), 500);
		}
	}, []);

	const handleOpenLetter = () => {
		setShowEnvelope(false);
		setShowLetter(true);
		localStorage.setItem("townhall-welcome-seen", "true");
	};

	const handleClose = () => {
		setShowLetter(false);
	};

	if (!hasMounted) return null;

	return (
		<div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1.5, ease: "easeOut" }}
			>
				<MagicalBackground
					show={showLetter || showEnvelope}
					pulse={!showLetter}
				/>
			</motion.div>

			<AnimatePresence mode="wait">
				{showEnvelope && (
					<motion.div
						key="envelope"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, scale: 0.9, rotate: -5 }}
						transition={{ duration: 0.5 }}
						className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-4"
					>
						<motion.h1
							initial={{ y: 20, opacity: 0 }}
							animate={{
								y: [0, -15, 0],
								opacity: 1,
							}}
							transition={{
								y: {
									duration: 3,
									repeat: Infinity,
									ease: "easeInOut",
									delay: 0.5,
								},
								opacity: { duration: 0.8, ease: "easeOut", delay: 0.2 },
							}}
							className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tight text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
						>
							You have a mail!
						</motion.h1>

						<button
							onClick={handleOpenLetter}
							className="group relative transform transition-all hover:scale-110 active:scale-95 cursor-pointer outline-none focus:outline-none"
							aria-label="Open Mail"
						>
							<motion.div
								animate={{ y: ["-25%", "0%", "-25%"] }}
								transition={{
									duration: 2,
									repeat: Infinity,
									ease: "easeInOut",
								}}
								className="relative"
							>
								<Image
									src="/assets/icons/Smilies/Love Letter.png"
									alt="New Mail"
									width={192}
									height={192}
									className="w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl object-contain"
									priority
								/>
							</motion.div>
							<div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold text-shadow text-nowrap pointer-events-none">
								Click to open
							</div>
						</button>
					</motion.div>
				)}

				{showLetter && (
					<motion.div
						key="letter-overlay"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
					>
						<motion.div
							key="letter"
							initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
							animate={{ opacity: 1, scale: 1, rotate: -1 }}
							exit={{
								opacity: 0,
								y: 100,
								rotate: 20,
								scale: 0.5,
								transition: { duration: 0.6, ease: "easeIn" },
							}}
							className="relative w-full sm:max-w-md bg-background ring-ring/10 ring-6 shadow-2xl overflow-hidden rounded-xl"
						>
							<div className="bg-background text-foreground p-4 text-center relative">
								<div className="text-2xl font-serif tracking-wide">
									A Letter from the Founders
								</div>
								<div className="absolute top-2 right-2">
									<Button
										variant="ghost"
										size="icon"
										onClick={handleClose}
										className="text-foreground hover:bg-black/5"
									>
										<span className="sr-only">Close</span>
										<X className="w-6 h-6" />
									</Button>
								</div>
							</div>
							<div className="p-6 space-y-4 text-foreground leading-relaxed relative max-h-[70vh] overflow-y-auto">
								<p>Greetings, Traveler!</p>
								<p>
									Welcome to Townhall. We've built this space with a simple
									dream: to bring people together in a way that feels genuine,
									fun, and truly yours.
								</p>
								<p>
									This isn't just another platform; it's a playground for your
									community. Whether you're planning the next big event, sharing
									your latest creation, or just hanging out, we want this to
									feel like home.
								</p>
								<p>
									So go ahead, explore, break things (gently), and let us know
									what you think. We're just getting started, and we're so glad
									you're here for the ride.
								</p>
								<p className="font-signature font-bold text-3xl text-right mt-8 pr-4 rotate-[-2deg]">
									— Jia Wei Ng
								</p>

								<div className="flex justify-center mt-8 pb-2">
									<Button
										onClick={handleClose}
										className="font-serif px-8 shadow-md"
									>
										Start Building
									</Button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
