import { expo } from "@better-auth/expo";
import { checkout, polar, portal } from "@polar-sh/better-auth";
import { client } from "@townhall/db";
import { env } from "@townhall/env/server";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

import { polarClient } from "./lib/payments";

export const auth = betterAuth({
	database: mongodbAdapter(client),
	trustedOrigins: [env.CORS_ORIGIN, "mybettertapp://", "exp://"],
	emailAndPassword: {
		enabled: true,
	},
	user: {
		additionalFields: {
			level: {
				type: "number",
				defaultValue: 1,
				input: false, // Users cannot set this directly
			},
			totalXp: {
				type: "number",
				defaultValue: 0,
				input: false,
			},
			seasonXp: {
				type: "number",
				defaultValue: 0,
				input: false,
			},
			streak: {
				type: "number",
				defaultValue: 0,
				input: false,
			},
			goldMedals: {
				type: "number",
				defaultValue: 0,
				input: false,
			},
			silverMedals: {
				type: "number",
				defaultValue: 0,
				input: false,
			},
			bronzeMedals: {
				type: "number",
				defaultValue: 0,
				input: false,
			},
			lastActivityDate: {
				type: "string",
				required: false,
				input: false,
			},
		},
	},
	advanced: {
		defaultCookieAttributes: {
			sameSite: "none",
			secure: true,
			httpOnly: true,
		},
	},
	plugins: [
		polar({
			client: polarClient,
			createCustomerOnSignUp: true,
			enableCustomerPortal: true,
			use: [
				checkout({
					products: [
						{
							productId: "your-product-id",
							slug: "pro",
						},
					],
					successUrl: env.POLAR_SUCCESS_URL,
					authenticatedUsersOnly: true,
				}),
				portal(),
			],
		}),
		expo(),
		admin(),
	],
});
