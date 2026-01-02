"use client";

import { formatDistanceToNow } from "date-fns";
import { ArrowRight, Flame, Loader2, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { client } from "@/lib/api";

export default function Home() {
	const [userStats, setUserStats] = useState<any>(null);
	const [recentActivity, setRecentActivity] = useState<any[]>([]);
	const [season, setSeason] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch user stats
				const statsRes = await client.user.me.$get();
				if (statsRes.ok) {
					setUserStats(await statsRes.json());
				}

				// Fetch recent activity (first 3 posts)
				const activityRes = await client.updates.$get();
				if (activityRes.ok) {
					const posts = await activityRes.json();
					setRecentActivity(posts.slice(0, 3));
				}

				// Fetch current season
				const seasonRes = await client.season.current.$get();
				if (seasonRes.ok) {
					const data = await seasonRes.json();
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
					Welcome back, Builder.
				</h1>
				<p className="text-muted-foreground text-lg max-w-2xl">
					Townhall is where you build cool shit in public. Share updates, earn
					XP, and climb the leaderboard.
				</p>
			</section>

			{/* Season Status Card */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="col-span-2 bg-card border-sidebar-border">
					<CardHeader>
						<div className="flex items-center justify-between">
							<div className="space-y-1">
								<CardTitle className="font-serif text-2xl">
									{season
										? `Season ${season.number}: ${season.title}`
										: "Off-Season"}
								</CardTitle>
								<CardDescription>
									{active ? `Week ${week} of 6 is active.` : "Off-season mode."}
								</CardDescription>
							</div>
							<div className="size-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
								<Flame className="size-6 text-orange-600 dark:text-orange-500" />
							</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						{active && (
							<div className="space-y-2">
								<div className="flex justify-between text-sm">
									<span>Season Progress</span>
									<span>{week}/6 Weeks</span>
								</div>
								<div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
									<div
										className="h-full bg-orange-500 rounded-full transition-all"
										style={{ width: `${(week / 6) * 100}%` }}
									/>
								</div>
							</div>
						)}

						<div className="flex gap-4">
							<Link href="/feed">
								<Button>
									Post an Update <ArrowRight className="ml-2 size-4" />
								</Button>
							</Link>
							<Link href="/leaderboard">
								<Button variant="outline">View Leaderboard</Button>
							</Link>
						</div>
					</CardContent>
				</Card>

				{/* User Stats / Weekly Goal */}
				<Card>
					<CardHeader>
						<CardTitle className="font-serif text-xl flex items-center gap-2">
							<Trophy className="size-5 text-yellow-500" />
							Your Stats
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="text-center py-4">
							<div className="text-3xl font-medium font-mono text-orange-500">
								{userStats?.seasonXp || 0} XP
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
						{recentActivity.map((post: any) => (
							<Card
								key={post._id}
								className="hover:shadow-md transition-shadow"
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
		</div>
	);
}
