import Link from "next/link";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function UserMenu() {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		return <Skeleton className="h-9 w-24" />;
	}

	if (!session) {
		return (
			<Link href="/login">
				<Button variant="outline">Sign In</Button>
			</Link>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"h-auto p-2 rounded-2xl md:px-4 md:py-2 flex items-center gap-2 hover:bg-muted"
				)}
			>
				<Avatar className="size-6 rounded-lg">
					<AvatarImage
						src={session.user.image || ""}
						alt={session.user.name}
					/>
					<AvatarFallback className="rounded-lg">
						{session.user.name.charAt(0)}
					</AvatarFallback>
				</Avatar>
				<span className="hidden md:block font-medium">
					{session.user.name}
				</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-card">
				<DropdownMenuGroup>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>{session.user.email}</DropdownMenuItem>
					{session.user.role === "admin" && (
						<Link href="/admin">
							<DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
						</Link>
					)}
					<Link href="/settings">
						<DropdownMenuItem>Settings</DropdownMenuItem>
					</Link>
					<DropdownMenuItem
						variant="destructive"
						onClick={() => {
							authClient.signOut({
								fetchOptions: {
									onSuccess: () => {
										router.push("/");
									},
								},
							});
						}}
					>
						Sign Out
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
