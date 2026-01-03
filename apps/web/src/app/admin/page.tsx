"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { client } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { ISeason as Season } from "@townhall/db";
import { format } from "date-fns";
import {
	Calendar as CalendarIcon,
	Edit,
	Loader2,
	Plus,
	Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [seasons, setSeasons] = useState<Season[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	// Form State
	const [editingId, setEditingId] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		number: 1,
		title: "",
		isActive: false,
		dateRange: {
			from: new Date(),
			to: new Date(new Date().setDate(new Date().getDate() + 42)), // +6 weeks
		} as { from?: Date; to?: Date },
	});

	const fetchSeasons = async () => {
		try {
			const res = await (client as any).season.admin.list.$get();
			if (!res.ok) throw new Error("Failed to fetch seasons");
			const data = await res.json();
			if ("seasons" in data) {
				setSeasons(data.seasons as unknown as Season[]);
			}
		} catch (error) {
			console.error(error);
			toast.error("Failed to load seasons");
		}
	};

	useEffect(() => {
		fetchSeasons();
	}, []);

	const resetForm = () => {
		setEditingId(null);
		// Default to next season number
		const nextSeasonNum =
			seasons.length > 0 ? Math.max(...seasons.map((s) => s.number)) + 1 : 1;

		setFormData({
			number: nextSeasonNum,
			title: `Season ${nextSeasonNum}`,
			isActive: false,
			dateRange: {
				from: new Date(),
				to: new Date(new Date().setDate(new Date().getDate() + 42)),
			},
		});
	};

	const openCreateDialog = () => {
		resetForm();
		setIsDialogOpen(true);
	};

	const openEditDialog = (season: Season) => {
		setEditingId(season._id.toString());
		setFormData({
			number: season.number,
			title: season.title,
			isActive: season.isActive,
			dateRange: {
				from: new Date(season.startDate),
				to: new Date(season.endDate),
			},
		});
		setIsDialogOpen(true);
	};

	const onSubmit = async () => {
		if (!formData.dateRange.from || !formData.dateRange.to) {
			toast.error("Please select a start and end date.");
			return;
		}

		setIsLoading(true);
		try {
			const payload = {
				number: formData.number,
				title: formData.title,
				isActive: formData.isActive,
				startDate: formData.dateRange.from.toISOString(),
				endDate: formData.dateRange.to.toISOString(),
			};

			let res;
			if (editingId) {
				res = await (client as any).season.admin[":id"].$patch({
					param: { id: editingId },
					json: payload,
				});
			} else {
				res = await (client as any).season.admin.$post({
					json: payload,
				});
			}

			if (!res.ok) {
				const error = await res.json();
				throw new Error((error as any).error || "Failed to save season");
			}

			toast.success(
				editingId
					? "Season updated successfully!"
					: "Season created successfully!",
			);
			setIsDialogOpen(false);
			fetchSeasons();
		} catch (e: any) {
			toast.error(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this season?")) return;

		try {
			const res = await (client as any).season.admin[":id"].$delete({
				param: { id },
			});

			if (!res.ok) {
				throw new Error("Failed to delete season");
			}

			toast.success("Season deleted successfully");
			fetchSeasons();
		} catch (error) {
			toast.error("Failed to delete season");
		}
	};

	const toggleActive = async (season: Season) => {
		// Optimization: if already active, do nothing or maybe allow deactivating?
		// Typically we just want to set ONE as active.
		if (season.isActive) return;

		try {
			const res = await (client as any).season.admin[":id"].$patch({
				param: { id: season._id.toString() },
				json: { isActive: true },
			});

			if (!res.ok) throw new Error("Failed to set active season");

			toast.success(`Season ${season.number} is now active`);
			fetchSeasons();
		} catch (error) {
			toast.error("Failed to update status");
		}
	};

	return (
		<div className="container mx-auto max-w-5xl py-8 px-4 space-y-8">
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<h1 className="text-3xl font-serif font-medium">Admin Panel</h1>
					<p className="text-muted-foreground">
						Manage seasons and platform settings.
					</p>
				</div>
				<Button onClick={openCreateDialog}>
					<Plus className="mr-2 h-4 w-4" />
					Create Season
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>All Seasons</CardTitle>
					<CardDescription>
						Manage current and past seasons of Townhall.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">Number</TableHead>
									<TableHead>Title</TableHead>
									<TableHead>Start Date</TableHead>
									<TableHead>End Date</TableHead>
									<TableHead>Active</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{seasons.length === 0 ? (
									<TableRow>
										<TableCell colSpan={6} className="text-center h-24">
											No seasons found. Create one to get started.
										</TableCell>
									</TableRow>
								) : (
									seasons.map((season) => (
										<TableRow key={season._id.toString()}>
											<TableCell className="font-medium">
												Season {season.number}
											</TableCell>
											<TableCell>{season.title}</TableCell>
											<TableCell>
												{format(new Date(season.startDate), "LLL dd, y")}
											</TableCell>
											<TableCell>
												{format(new Date(season.endDate), "LLL dd, y")}
											</TableCell>
											<TableCell>
												<Switch
													checked={season.isActive}
													onCheckedChange={() => toggleActive(season)}
												/>
											</TableCell>
											<TableCell className="text-right flex items-center justify-end gap-2">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => openEditDialog(season)}
												>
													<Edit className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													className="text-destructive hover:text-destructive"
													onClick={() => handleDelete(season._id.toString())}
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{editingId ? "Edit Season" : "Create Season"}
						</DialogTitle>
						<DialogDescription>
							Set the details for the season.
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="number">Season Number</Label>
							<Input
								id="number"
								type="number"
								value={formData.number}
								onChange={(e) =>
									setFormData({ ...formData, number: Number(e.target.value) })
								}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="title">Season Title</Label>
							<Input
								id="title"
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
								}
							/>
						</div>

						<div className="grid gap-2">
							<Label>Duration</Label>
							<Popover>
								<PopoverTrigger
									id="date"
									className={cn(
										buttonVariants({ variant: "outline" }),
										"w-full justify-start text-left font-normal",
										!formData.dateRange.from && "text-muted-foreground",
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{formData.dateRange.from ? (
										formData.dateRange.to ? (
											<>
												{format(formData.dateRange.from, "LLL dd, y")} -{" "}
												{format(formData.dateRange.to, "LLL dd, y")}
											</>
										) : (
											format(formData.dateRange.from, "LLL dd, y")
										)
									) : (
										<span>Pick a date</span>
									)}
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										initialFocus
										mode="range"
										defaultMonth={formData.dateRange.from}
										selected={formData.dateRange as any}
										onSelect={(range: any) =>
											setFormData({ ...formData, dateRange: range })
										}
										numberOfMonths={2}
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div className="flex items-center justify-between space-x-2">
							<Label htmlFor="active-mode">Active Season Mode</Label>
							<Switch
								id="active-mode"
								checked={formData.isActive}
								onCheckedChange={(checked) =>
									setFormData({ ...formData, isActive: checked })
								}
							/>
						</div>

						<Button className="w-full" onClick={onSubmit} disabled={isLoading}>
							{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Save Changes
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
