"use client";

import { motion } from "framer-motion";

export function BlueprintHero() {
	return (
		<div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#1a1a1a] text-[#f0f0f0] border-b-8 border-orange-600">
			{/* Background Image */}
			<div
				className="absolute inset-0 z-0 opacity-100 bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: "url('/assets/backgrounds/1.png')" }}
			/>

			{/* Grid Background - REMOVED per user feedback */}

			{/* Animated Blueprint Lines */}
			<svg className="absolute inset-0 z-0 w-full h-full pointer-events-none opacity-30">
				<motion.path
					d="M0,100 Q400,300 800,100 T1600,100"
					fill="none"
					stroke="#ff4500" // Safety Orange
					strokeWidth="2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{
						duration: 3,
						ease: "easeInOut",
						repeat: Number.POSITIVE_INFINITY,
					}}
					className="drop-shadow-[0_0_10px_rgba(255,69,0,0.5)]"
				/>
				<motion.path
					d="M0,600 L1200,600"
					fill="none"
					stroke="white"
					strokeWidth="1"
					strokeDasharray="10 10"
					initial={{ x: -1200 }}
					animate={{ x: 0 }}
					transition={{
						duration: 10,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
					className="drop-shadow-md"
				/>
			</svg>

			{/* Main Content */}
			<div className="relative z-10 text-center space-y-6 max-w-5xl px-4 md:mt-24">
				<div className="inline-block border-2 border-orange-600 px-4 py-1 bg-black/60 backdrop-blur-md text-orange-500 font-mono text-sm tracking-widest uppercase mb-4 shadow-lg">
					Townhall Season 1
				</div>

				<h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none text-white font-impact-style drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
					SEASON 1
					<br />
					<span className="text-orange-600 drop-shadow-[0_4px_15px_rgba(234,88,12,0.6)]">
						WILDCARD
					</span>
				</h1>

				<p className="text-xl md:text-2xl font-mono text-white/90 max-w-2xl mx-auto border-t border-b border-white/20 py-4 bg-black/30 backdrop-blur-sm shadow-xl">
					// BUILD IN PUBLIC. SHIP DAILY. CLIMB THE RANKS. \\
				</p>
			</div>

			{/* Decorative Stamps */}
			<div className="absolute bottom-10 right-10 rotate-[-15deg] border-4 border-white opacity-40 p-4 rounded-xl shadow-2xl bg-black/20 backdrop-blur-sm">
				<span className="text-4xl font-black uppercase text-white drop-shadow-md">
					Classified
				</span>
			</div>
		</div>
	);
}
