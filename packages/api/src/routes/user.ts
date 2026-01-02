import { auth } from "@townhall/auth";
import { client } from "@townhall/db";
import { Hono } from "hono";

const app = new Hono();

// GET /leaderboard - Get global leaderboard (sorted by seasonXp from user collection)
app.get("/leaderboard", async (c) => {
	const userCollection = client.collection("user");
	const leaderboard = await userCollection
		.find({})
		.sort({ seasonXp: -1 })
		.limit(50)
		.toArray();

	return c.json(leaderboard);
});

// GET /me - Get current user stats (from session, which includes additionalFields)
app.get("/me", async (c) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
	if (!session) return c.json({ error: "Unauthorized" }, 401);

	// Session already contains the user with additional fields
	return c.json(session.user);
});

// GET /:username - Get specific user profile by name
app.get("/:username", async (c) => {
	const username = c.req.param("username");
	const userCollection = client.collection("user");

	// Try to find by name or id
	const user = await userCollection.findOne({
		$or: [{ name: username }, { id: username }],
	});

	if (!user) return c.json({ error: "User not found" }, 404);
	return c.json(user);
});

export default app;
