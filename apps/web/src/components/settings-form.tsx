"use client";

import { Button } from "@/components/ui/button";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SettingsFormProps {
	user: {
		id: string; // Basic fields usually present
		name: string;
		email: string;
		image?: string | null;
		country?: string | null;
		[key: string]: any; // Allow other fields
	};
}

export function SettingsForm({ user }: SettingsFormProps) {
	const [name, setName] = useState(user.name);
	const [country, setCountry] = useState<string | undefined>(
		user.country || undefined,
	);
	const [loading, setLoading] = useState(false);

	const handleSave = async () => {
		setLoading(true);
		try {
			await authClient.updateUser({
				name,
				country,
			});
			toast.success("Profile updated successfully");
		} catch (error) {
			toast.error("Failed to update profile");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-6 max-w-md">
			<div className="space-y-2">
				<Label htmlFor="name">Name</Label>
				<Input
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Your name"
				/>
			</div>

			<div className="space-y-2">
				<Label>Country</Label>
				<CountryDropdown
					defaultValue={country}
					onChange={(c) => setCountry(c.alpha3)}
					placeholder="Select your country"
				/>
			</div>

			<Button onClick={handleSave} disabled={loading}>
				{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
				Save Changes
			</Button>
		</div>
	);
}
