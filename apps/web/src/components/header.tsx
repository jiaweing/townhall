"use client";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
	BankIcon,
	ChampionIcon,
	Comment01Icon,
	Home01Icon,
	UserIcon,
} from "hugeicons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProgressiveBlur } from "./progressive-blur";
import UserMenu from "./user-menu";

const NAV_ITEMS = [
	{ label: "Dashboard", href: "/", icon: Home01Icon },
	{ label: "Town Square", href: "/feed", icon: Comment01Icon },
	{ label: "Leaderboard", href: "/leaderboard", icon: ChampionIcon },
];

export function Header() {
	const pathname = usePathname();
	const { data: session } = authClient.useSession();

	return (
		<header className="fixed bottom-0 w-full md:sticky md:top-0 z-30 py-4 h-24 pointer-events-none md:pointer-events-auto">
			<ProgressiveBlur
				className="absolute bottom-0 h-48 md:hidden"
				blurAmount="20px"
				position="bottom"
			/>
			<ProgressiveBlur
				className="hidden md:block top-0 h-48"
				blurAmount="20px"
			/>
			<div className="h-full max-w-5xl mx-auto px-4 flex items-center justify-center gap-6 md:justify-between md:gap-0 relative z-10 pointer-events-auto">
				{/* Logo */}
				<Link href="/" className="hidden md:flex items-center gap-2">
					<div className="size-9 rounded-xl flex items-center justify-center p-0.5">
						<BankIcon size={24} className="text-secondary-foreground" />
					</div>
				</Link>

				{/* Center Nav Icons */}
				<nav className="flex items-center gap-5">
					{NAV_ITEMS.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.href}
								href={item.href as any}
								className={cn(
									"p-2 rounded-2xl transition-colors",
									isActive
										? "text-foreground"
										: "text-muted-foreground/50 hover:bg-muted transition-colors duration-300",
								)}
								title={item.label}
							>
								<item.icon
									className={cn("size-6", isActive && "fill-current")}
									strokeWidth={2}
								/>
							</Link>
						);
					})}

					{session && (
						<Link
							href={`/${session.user.id}` as any}
							className={cn(
								"p-2 rounded-2xl transition-colors",
								pathname.startsWith(`/${session.user.id}`)
									? "text-foreground"
									: "text-muted-foreground/50 hover:bg-muted transition-colors duration-300",
							)}
							title="Your Profile"
						>
							<UserIcon
								className={cn(
									"size-6",
									pathname.startsWith(`/${session.user.id}`) && "fill-current",
								)}
								strokeWidth={2}
							/>
						</Link>
					)}
				</nav>

				{/* Right side - Auth */}
				<UserMenu />
			</div>
		</header>
	);
}
