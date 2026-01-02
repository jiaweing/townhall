import { Header } from "@/components/header";
import Providers from "@/components/providers";
import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "../index.css";

const instrumentSans = Instrument_Sans({
	variable: "--font-instrument-sans",
	subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
	variable: "--font-instrument-serif",
	weight: "400",
	subsets: ["latin"],
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
				className={`${instrumentSans.variable} ${instrumentSerif.variable} antialiased`}
			>
				<Providers>
					<div className="min-h-svh w-full bg-background">
						<Header />
						<main className="w-full">{children}</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
