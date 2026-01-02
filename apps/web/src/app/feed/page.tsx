"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { client } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import { Image as ImageIcon, Loader2, Send, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FeedPage() {
	const [content, setContent] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [posts, setPosts] = useState<any[]>([]);
	const [isFetching, setIsFetching] = useState(true);

	const fetchPosts = async () => {
		try {
			const res = await client.updates.$get();
			if (res.ok) {
				const data = await res.json();
				setPosts(data);
			}
		} catch (e) {
			console.error(e);
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const handlePost = async () => {
		if (!content.trim()) return;
		setIsLoading(true);
		try {
			const res = await client.updates.$post({
				json: { content },
			});
			if (res.ok) {
				toast.success("Update posted! +100 XP");
				setContent("");
				fetchPosts(); // Refresh feed
			} else {
				toast.error("Failed to post update");
			}
		} catch (e) {
			toast.error("Error posting update");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="container mx-auto max-w-2xl py-8 px-4 space-y-8">
			<div className="space-y-2">
				<h1 className="text-3xl font-serif font-medium tracking-tight">
					Town Square
				</h1>
				<p className="text-muted-foreground">What are you working on today?</p>
			</div>

			{/* Post Input */}
			<Card className="border-2 border-muted/50">
				<CardContent className="pt-6 space-y-4">
					<Textarea
						placeholder="Share your progress... (e.g., 'Fixed a bug in the payment gateway')"
						className="resize-none border-none focus-visible:ring-0 shadow-none p-0 text-lg min-h-[80px]"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
					<div className="flex items-center justify-between border-t pt-4">
						<Button variant="ghost" size="sm" className="text-muted-foreground">
							<ImageIcon className="size-4 mr-2" />
							Add Media
						</Button>
						<Button
							disabled={!content.trim() || isLoading}
							onClick={handlePost}
						>
							{isLoading ? (
								<Loader2 className="animate-spin size-4 mr-2" />
							) : (
								<Send className="ml-2 size-4" />
							)}
							Post Update
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Feed */}
			<div className="space-y-4">
				{isFetching ? (
					<div className="flex justify-center py-8">
						<Loader2 className="animate-spin" />
					</div>
				) : (
					posts.map((post: any) => (
						<Card key={post._id} className="overflow-hidden">
							<CardHeader className="flex flex-row items-start gap-4 pb-2">
								<div className="size-10 rounded-full bg-secondary flex items-center justify-center font-medium text-xs uppercase">
									{post.author?.username?.slice(0, 2) || "??"}
								</div>
								<div className="flex-1">
									<div className="flex items-center justify-between">
										<h3 className="font-medium text-sm">
											{post.author?.username || "Builder"}
										</h3>
										<span className="text-xs text-muted-foreground">
											{formatDistanceToNow(new Date(post.createdAt), {
												addSuffix: true,
											})}
										</span>
									</div>
									<p className="text-xs text-orange-500 font-medium">
										+{post.xpEarned} XP
									</p>
								</div>
							</CardHeader>
							<CardContent className="pl-16 pt-0 space-y-4">
								<p className="text-sm leading-relaxed whitespace-pre-wrap">
									{post.content}
								</p>

								<div className="flex items-center gap-4 text-muted-foreground">
									<Button variant="ghost" size="sm" className="h-8 px-2">
										<ThumbsUp className="size-4 mr-2" />
										{post.likes}
									</Button>
								</div>
							</CardContent>
						</Card>
					))
				)}
			</div>
		</div>
	);
}
