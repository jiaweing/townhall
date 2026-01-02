import { Header } from "@/components/header";
import Providers from "@/components/providers";
import { WelcomeLetter } from "@/components/welcome-letter";
import type { Metadata } from "next";
import { Dancing_Script, Instrument_Serif, PT_Serif } from "next/font/google";
import "../index.css";

const ptSerif = PT_Serif({
	variable: "--font-pt-serif",
	subsets: ["latin"],
	weight: ["400", "700"],
});

const instrumentSerif = Instrument_Serif({
	variable: "--font-instrument-serif",
	weight: "400",
	subsets: ["latin"],
});

const dancingScript = Dancing_Script({
	variable: "--font-dancing-script",
	subsets: ["latin"],
	weight: ["400", "700"],
});

export const metadata: Metadata = {
	title: "Townhall",
	description: "Build in public, together.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${ptSerif.variable} ${instrumentSerif.variable} ${dancingScript.variable} antialiased`}
			>
				<Providers>
					<WelcomeLetter />
					<div className="min-h-svh w-full bg-background">
						<Header />
						<main className="w-full">{children}</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
