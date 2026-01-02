"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { client } from "@/lib/api";
import { Loader2, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

export default function LeaderboardPage() {
	const [leaderboard, setLeaderboard] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchLeaderboard = async () => {
			try {
				const res = await client.user.leaderboard.$get();
				if (res.ok) {
					const data = await res.json();
					setLeaderboard(data);
				}
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};
		fetchLeaderboard();
	}, []);

	return (
		<div className="container mx-auto max-w-4xl py-8 px-4 space-y-8">
			<div className="space-y-4 text-center">
				<h1 className="text-4xl font-serif font-medium tracking-tight">
					Leaderboards
				</h1>
				<p className="text-muted-foreground">
					Compete with your league or the world.
				</p>
			</div>

			<Tabs defaultValue="global" className="w-full">
				<div className="flex justify-center mb-8">
					<TabsList className="grid w-full max-w-md grid-cols-2">
						<TabsTrigger value="global">Season Global</TabsTrigger>
						<TabsTrigger value="league">Weekly League</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent value="global">
					<Card>
						<CardHeader>
							<CardTitle className="font-serif text-xl">
								Season 1: Global Rankings
							</CardTitle>
							<p className="text-sm text-muted-foreground">
								Top builders by Season XP.
							</p>
						</CardHeader>
						<CardContent>
							{loading ? (
								<div className="flex justify-center p-8">
									<Loader2 className="animate-spin" />
								</div>
							) : (
								<div className="space-y-1">
									{leaderboard.map((entry: any, i: number) => (
										<div
											key={entry.userId}
											className={`flex items-center justify-between p-3 rounded-lg ${i === 0 ? "bg-yellow-500/10 border border-yellow-500/20" : "hover:bg-secondary/50"}`}
										>
											<div className="flex items-center gap-4">
												<div className="w-8 text-center font-bold text-muted-foreground">
													#{i + 1}
												</div>
												<div className="size-10 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
													{entry.username?.substring(0, 2) || "??"}
												</div>
												<div>
													<div className="font-medium text-sm">
														{entry.username}
													</div>
													<div className="text-xs text-muted-foreground">
														{entry.streak} day streak
													</div>
												</div>
											</div>
											<div className="flex items-center gap-4">
												<div className="text-right">
													<div className="font-medium font-mono">
														{entry.seasonXp} XP
													</div>
												</div>
											</div>
										</div>
									))}
									{leaderboard.length === 0 && (
										<div className="text-center p-8 text-muted-foreground">
											No active builders yet. Be the first!
										</div>
									)}
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="league">
					<div className="text-center py-12 text-muted-foreground">
						<Trophy className="mx-auto size-12 mb-4 opacity-50" />
						<p>Weekly Leagues are coming soon in Week 2.</p>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
