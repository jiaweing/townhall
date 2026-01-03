"use client";

import { formatDistanceToNow } from "date-fns";
import { ArrowRight, Loader2, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Faq } from "@/components/faq";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { client } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export default function Home() {
	const [userStats, setUserStats] = useState<any>(null);
	const [recentActivity, setRecentActivity] = useState<any[]>([]);
	const [season, setSeason] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch user stats
				const statsRes = await (client as any).user.me.$get({});
				if (statsRes.ok) {
					setUserStats((await statsRes.json()) as any);
				}

				// Fetch recent activity (first 3 posts)
				const activityRes = await (client as any).updates.$get({});
				if (activityRes.ok) {
					const posts = (await activityRes.json()) as any[];
					setRecentActivity(posts.slice(0, 3));
				}

				// Fetch current season
				const seasonRes = await (client as any).season.current.$get({});
				if (seasonRes.ok) {
					const data = (await seasonRes.json()) as any;
					setSeason(data.season);
				}
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	// Calculate week from season dates
	const getSeasonWeek = () => {
		if (!season?.startDate) return 1;
		const start = new Date(season.startDate);
		const now = new Date();
		const diffWeeks =
			Math.floor(
				(now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000),
			) + 1;
		return Math.min(Math.max(diffWeeks, 1), 6);
	};

	// auth session for greeting
	const { data: session } = authClient.useSession();

	const week = getSeasonWeek();
	const active = season?.isActive ?? false;

	if (loading) {
		return (
			<div className="h-full flex items-center justify-center">
				<Loader2 className="animate-spin size-8" />
			</div>
		);
	}

	return (
		<div className="container mx-auto max-w-5xl py-8 px-6 space-y-8">
			{/* Hero / Welcome */}
			<section className="space-y-4">
				<h1 className="text-4xl font-serif font-medium tracking-tight">
					Welcome back, {session?.user.name ?? "builder"}.
				</h1>
				<p className="text-muted-foreground text-lg max-w-2xl">
					Townhall is where you build cool shit in public. Share updates, earn
					XP, and climb the leaderboard.
				</p>
			</section>

			{/* Season Status Card */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card
					className="relative overflow-hidden col-span-2 bg-card border-sidebar-border -rotate-1 hover:rotate-0 transition-transform duration-300 hover:scale-[1.01] bg-cover bg-center"
					style={{ backgroundImage: "url('/assets/backgrounds/1.png')" }}
				>
					<div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent z-0" />
					<CardHeader className="relative z-10">
						<div className="flex items-center justify-between">
							<div className="space-y-1">
								<CardTitle className="font-serif text-2xl text-white">
									{season
										? `Season ${season.number}: ${season.title}`
										: "Off-Season"}
								</CardTitle>
								<CardDescription className="text-white/80">
									{active ? `Week ${week} of 6 is active.` : "Off-season mode."}
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-6 relative z-10">
						{active && (
							<div className="space-y-2">
								<div className="flex justify-between text-sm text-white/90">
									<span>Season Progress</span>
									<span>{week}/6 Weeks</span>
								</div>
								<div className="h-2 w-full bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
									<div
										className="h-full bg-orange-500 rounded-full transition-all"
										style={{ width: `${(week / 6) * 100}%` }}
									/>
								</div>
							</div>
						)}

						<div className="flex gap-4">
							<Link href="/feed">
								<Button className="bg-white text-black hover:bg-white/90 border-none shadow-lg">
									Post an Update <ArrowRight className="ml-2 size-4" />
								</Button>
							</Link>
							<Link href="/leaderboard">
								<Button
									variant="outline"
									className="bg-black/20 text-white border-white/20 hover:bg-black/40 hover:text-white backdrop-blur-sm"
								>
									View Leaderboard
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>

				{/* User Stats / Weekly Goal */}
				<Card className="rotate-2 hover:rotate-0 transition-transform duration-300 hover:scale-[1.02]">
					<CardHeader>
						<CardTitle className="font-serif text-xl flex items-center gap-2">
							<Trophy className="size-5 text-yellow-500" />
							Your Stats
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="text-center py-4">
							<div className="text-3xl font-medium font-mono text-orange-500">
								{userStats?.seasonXp || 0}
							</div>
							<div className="text-muted-foreground text-sm">Season XP</div>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">Level</span>
							<span className="font-mono">{userStats?.level || 1}</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">Streak</span>
							<span className="font-mono">{userStats?.streak || 0} days</span>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Recent Activity Grid */}
			<section>
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-serif">Recent Activity</h2>
					<Link href="/feed" className="text-sm hover:underline">
						View all
					</Link>
				</div>

				{recentActivity.length === 0 ? (
					<div className="text-center py-12 text-muted-foreground bg-secondary/20 rounded-lg">
						No activity yet. Be the first to post an update!
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{recentActivity.map((post: any, i: number) => (
							<Card
								key={post._id}
								className={`hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:rotate-0 ${
									i % 4 === 0
										? "-rotate-2"
										: i % 4 === 1
											? "rotate-2"
											: i % 4 === 2
												? "-rotate-3"
												: "rotate-3"
								}`}
							>
								<CardHeader className="pb-3">
									<div className="flex items-center gap-3">
										<div className="size-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
											{post.author?.username?.slice(0, 2) || "??"}
										</div>
										<div>
											<div className="text-sm font-medium">
												{post.author?.username || "Builder"}
											</div>
											<div className="text-xs text-muted-foreground">
												{formatDistanceToNow(new Date(post.createdAt), {
													addSuffix: true,
												})}
											</div>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-sm line-clamp-2">{post.content}</p>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</section>

			<Faq />
		</div>
	);
}
