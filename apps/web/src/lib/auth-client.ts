import { polarClient } from "@polar-sh/better-auth";
import type { auth } from "@townhall/auth";
import { env } from "@townhall/env/web";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_SERVER_URL,
	plugins: [polarClient(), adminClient(), inferAdditionalFields<typeof auth>()],
});
