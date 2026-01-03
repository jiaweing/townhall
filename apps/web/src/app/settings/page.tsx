import { SettingsForm } from "@/components/settings-form";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
	const session = await authClient.getSession({
		fetchOptions: {
			headers: await headers(),
			throw: true,
		},
	});

	// console.log("Settings Page Session:", session?.user?.email);

	if (!session?.user) {
		redirect("/login");
	}

	return (
		<div className="container mx-auto py-20 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
			<div className="w-full max-w-md space-y-6">
				<h1 className="text-3xl font-serif font-medium text-center">
					Settings
				</h1>
				<SettingsForm user={session.user} />
			</div>
		</div>
	);
}
