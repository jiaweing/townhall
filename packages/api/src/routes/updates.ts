import { auth } from "@townhall/auth";
import { client, Update } from "@townhall/db";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono();

// GET / - Get Layout Feed (Town Square)
app.get("/", async (c) => {
	// Fetch updates and join with user collection for author info
	const updates = await Update.aggregate([
		{ $sort: { createdAt: -1 } },
		{ $limit: 50 },
		{
			$lookup: {
				from: "user", // Better Auth uses "user" collection
				localField: "userId",
				foreignField: "id",
				as: "author",
			},
		},
		{ $unwind: { path: "$author", preserveNullAndEmptyArrays: true } },
	]);
	return c.json(updates);
});

// POST / - Create a new update
app.post("/", async (c) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session) {
		return c.json({ error: "Unauthorized" }, 401);
	}

	const schema = z.object({
		content: z.string().min(1),
		mediaUrl: z.string().optional(),
	});

	const body = await c.req.json();
	const parsed = schema.safeParse(body);

	if (!parsed.success) {
		return c.json({ error: parsed.error }, 400);
	}

	const xpAmount = 100;

	// 1. Create Update
	const update = await Update.create({
		userId: session.user.id,
		content: parsed.data.content,
		mediaUrl: parsed.data.mediaUrl,
		xpEarned: xpAmount,
	});

	// 2. Update User Stats directly in Better Auth user collection
	const userCollection = client.collection("user");
	await userCollection.updateOne(
		{ id: session.user.id },
		{
			$inc: { totalXp: xpAmount, seasonXp: xpAmount },
			$set: { lastActivityDate: new Date().toISOString() },
		},
	);

	return c.json(update);
});

export default app;
