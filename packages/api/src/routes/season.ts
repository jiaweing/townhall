import { auth } from "@townhall/auth";
import { Season } from "@townhall/db";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono();

// GET /current - Get the current active season
app.get("/current", async (c) => {
	const currentSeason = await Season.findOne({ isActive: true });

	if (!currentSeason) {
		return c.json({ active: false, season: null });
	}

	return c.json({ active: true, season: currentSeason });
});

// POST /admin/update - Create or Update a season (Admin Only)
app.post("/admin/update", async (c) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
	console.log("Admin Update Session:", JSON.stringify(session, null, 2));

	if (!session || session.user.role !== "admin") {
		return c.json({ error: "Unauthorized" }, 401);
	}

	const schema = z.object({
		number: z.number(),
		title: z.string(),
		startDate: z.string().transform((str) => new Date(str)),
		endDate: z.string().transform((str) => new Date(str)),
		isActive: z.boolean(),
	});

	const body = await c.req.json();
	const parsed = schema.safeParse(body);

	if (!parsed.success) {
		return c.json({ error: parsed.error }, 400);
	}

	const { number, ...data } = parsed.data;

	const season = await Season.findOneAndUpdate(
		{ number },
		{ ...data, number },
		{ upsert: true, new: true },
	);

	return c.json(season);
});

export default app;
