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
		<header className="h-14 bg-background/80 backdrop-blur-sm sticky top-0 z-30 py-10">
			<div className="h-full max-w-5xl mx-auto px-4 flex items-center justify-between">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2">
					<div className="size-9 rounded-xl flex items-center justify-center p-0.5">
						<BankIcon
							size={24}
							className="text-secondary-foreground"
							variant="solid"
						/>
					</div>
				</Link>

				{/* Center Nav Icons */}
				<nav className="flex items-center gap-5">
					{NAV_ITEMS.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									"p-3 rounded-2xl transition-colors",
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
							href={`/${session.user.id}`}
							className={cn(
								"p-3 rounded-2xl transition-colors",
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
