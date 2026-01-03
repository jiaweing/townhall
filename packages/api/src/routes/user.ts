import { auth } from "@townhall/auth";
import { client } from "@townhall/db";
import { Hono } from "hono";
import { ObjectId } from "mongodb";

const app = new Hono()
	// GET /leaderboard - Get global leaderboard (sorted by seasonXp from user collection)
	.get("/leaderboard", async (c) => {
		const userCollection = client.collection("user");
		const leaderboard = await userCollection
			.find({})
			.sort({ seasonXp: -1 })
			.limit(50)
			.toArray();

		return c.json(leaderboard);
	})
	// GET /me - Get current user stats (from session, which includes additionalFields)
	.get("/me", async (c) => {
		const session = await auth.api.getSession({ headers: c.req.raw.headers });
		if (!session) return c.json({ error: "Unauthorized" }, 401);

		// Session already contains the user with additional fields
		return c.json(session.user);
	})
	// GET /:username - Get specific user profile by name
	.get("/:username", async (c) => {
		const username = c.req.param("username");
		const userCollection = client.collection("user");

		const query: Record<string, any>[] = [{ name: username }, { id: username }];

		if (ObjectId.isValid(username)) {
			query.push({ _id: new ObjectId(username) });
		}

		// Try to find by name or id or _id
		const user = await userCollection.findOne({
			$or: query,
		});

		if (!user) return c.json({ error: "User not found" }, 404);
		return c.json(user);
	});

export default app;
