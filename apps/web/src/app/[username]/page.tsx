"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/lib/api";
import { Calendar, Flame, Github, Globe, Loader2, Twitter } from "lucide-react";
import { use, useEffect, useState } from "react";

export default function ProfilePage({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
	const { username } = use(params);
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await (client as any).profile[":username"].$get({
					param: { username },
				});
				if (res.ok) {
					const data = await res.json();
					setUser(data);
				} else {
					setUser(null);
				}
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, [username]);

	if (loading) {
		return (
			<div className="h-full flex items-center justify-center">
				<Loader2 className="animate-spin" />
			</div>
		);
	}

	if (!user) {
		return <div className="container py-8 text-center">User not found.</div>;
	}

	return (
		<div className="container mx-auto max-w-5xl py-8 px-4 space-y-8">
			{/* Header */}
			<div className="flex flex-col md:flex-row gap-8 items-start">
				<div className="size-32 rounded-full bg-secondary shrink-0 flex items-center justify-center font-medium text-4xl text-muted-foreground">
					{(user.name || "?").substring(0, 1)}
				</div>

				<div className="flex-1 space-y-4">
					<div>
						<h1 className="text-3xl font-serif font-medium">{user.name}</h1>
						<p className="text-muted-foreground">@{user.name}</p>
					</div>

					<p className="max-w-xl text-lg">Builder on Townhall.</p>

					<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
						<div className="flex items-center gap-1">
							<Calendar className="size-4" />
							Joined {new Date(user.createdAt).toLocaleDateString()}
						</div>
					</div>

					<div className="flex gap-2">
						<Button variant="outline" size="sm">
							<Twitter className="size-4 mr-2" /> Twitter
						</Button>
						<Button variant="outline" size="sm">
							<Github className="size-4 mr-2" /> GitHub
						</Button>
						<Button variant="outline" size="sm">
							<Globe className="size-4 mr-2" /> Website
						</Button>
					</div>
				</div>

				{/* Stats Card */}
				<Card className="w-full md:w-64 bg-sidebar-accent/50 border-none">
					<CardContent className="pt-6 space-y-4">
						<div>
							<div className="text-sm text-muted-foreground uppercase tracking-wider">
								Level
							</div>
							<div className="text-3xl font-mono font-medium">
								{user.level || 1}
							</div>
						</div>
						<div>
							<div className="text-sm text-muted-foreground uppercase tracking-wider">
								Total XP
							</div>
							<div className="text-3xl font-mono font-medium text-orange-500">
								{user.totalXp}
							</div>
						</div>
						<div className="flex items-center gap-2 text-orange-600">
							<Flame className="size-5 fill-orange-600" />
							<span className="font-medium">{user.streak} day streak</span>
						</div>
					</CardContent>
				</Card>

				{/* Medals Card */}
				<Card className="w-full md:w-64 bg-sidebar-accent/50 border-none">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
							Season Medals
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<img
									src="/assets/icons/Activities/1st Place Medal.png"
									alt="Gold"
									className="size-6"
								/>
								<span className="font-medium">Gold</span>
							</div>
							<span className="font-mono">{user.goldMedals || 0}</span>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<img
									src="/assets/icons/Activities/2nd Place Medal.png"
									alt="Silver"
									className="size-6"
								/>
								<span className="font-medium">Silver</span>
							</div>
							<span className="font-mono">{user.silverMedals || 0}</span>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<img
									src="/assets/icons/Activities/3rd Place Medal.png"
									alt="Bronze"
									className="size-6"
								/>
								<span className="font-medium">Bronze</span>
							</div>
							<span className="font-mono">{user.bronzeMedals || 0}</span>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Projects - Placeholder since managing projects is another complexity */}
			<section className="space-y-6">
				<div className="flex items-center justify-between border-b pb-2">
					<h2 className="text-2xl font-serif">Projects</h2>
					<Button size="sm" variant="outline">
						Add Project
					</Button>
				</div>

				<div className="text-muted-foreground italic py-8 text-center bg-secondary/20 rounded-lg">
					No projects added yet.
				</div>
			</section>
		</div>
	);
}
