import type { AppType } from "@townhall/api";
import { hc } from "hono/client";

const getBaseUrl = () => {
	return process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
};

export const client = hc<AppType>(`${getBaseUrl()}/api`, {
	fetch: (input: RequestInfo | URL, init?: RequestInit) => {
		return fetch(input, {
			...init,
			credentials: "include",
		});
	},
});
