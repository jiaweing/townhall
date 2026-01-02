"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { client } from "@/lib/api";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [seasonNumber, setSeasonNumber] = useState(1);
	const [title, setTitle] = useState("Season 1");
	const [isActive, setIsActive] = useState(true);
	const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({
		from: new Date(),
		to: new Date(new Date().setDate(new Date().getDate() + 42)), // +6 weeks
	});

	const onSubmit = async () => {
		if (!dateRange.from || !dateRange.to) {
			toast.error("Please select a start and end date.");
			return;
		}

		setIsLoading(true);
		try {
			const res = await client.season.admin.update.$post({
				json: {
					number: seasonNumber,
					title,
					isActive,
					startDate: dateRange.from.toISOString(),
					endDate: dateRange.to.toISOString(),
				},
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error((error as any).error || "Failed to update season");
			}

			toast.success("Season updated successfully!");
			router.refresh();
		} catch (e: any) {
			toast.error(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="container mx-auto max-w-2xl py-8 px-4 space-y-8">
			<div className="space-y-2">
				<h1 className="text-3xl font-serif font-medium">Admin Panel</h1>
				<p className="text-muted-foreground">
					Manage seasons and platform settings.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Season Management</CardTitle>
					<CardDescription>
						Configure the current or upcoming season.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid gap-2">
						<Label htmlFor="number">Season Number</Label>
						<Input
							id="number"
							type="number"
							value={seasonNumber}
							onChange={(e) => setSeasonNumber(Number(e.target.value))}
						/>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="title">Season Title</Label>
						<Input
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>

					<div className="grid gap-2">
						<Label>Duration</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									id="date"
									variant={"outline"}
									className={cn(
										"w-full justify-start text-left font-normal",
										!dateRange.from && "text-muted-foreground",
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{dateRange.from ? (
										dateRange.to ? (
											<>
												{format(dateRange.from, "LLL dd, y")} -{" "}
												{format(dateRange.to, "LLL dd, y")}
											</>
										) : (
											format(dateRange.from, "LLL dd, y")
										)
									) : (
										<span>Pick a date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								{/* Note: Shadcn Calendar usually supports mode="range". 
                      Assuming standard DayPicker props here. */}
								<Calendar
									initialFocus
									mode="range"
									defaultMonth={dateRange.from}
									selected={dateRange}
									onSelect={(range: any) => setDateRange(range)}
									numberOfMonths={2}
								/>
							</PopoverContent>
						</Popover>
					</div>

					<div className="flex items-center justify-between space-x-2">
						<Label htmlFor="active-mode">Active Season Mode</Label>
						<Switch
							id="active-mode"
							checked={isActive}
							onCheckedChange={setIsActive}
						/>
					</div>

					<Button className="w-full" onClick={onSubmit} disabled={isLoading}>
						{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Save Changes
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
