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

// GET /admin/list - List all seasons (Admin Only)
app.get("/admin/list", async (c) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session || session.user.role !== "admin") {
		return c.json({ error: "Unauthorized" }, 401);
	}

	const seasons = await Season.find().sort({ number: -1 });
	return c.json({ seasons });
});

// POST /admin - Create a new season (Admin Only)
app.post("/admin", async (c) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session || session.user.role !== "admin") {
		return c.json({ error: "Unauthorized" }, 401);
	}

	const schema = z.object({
		number: z.number(),
		title: z.string(),
		startDate: z.string().transform((str) => new Date(str)),
		endDate: z.string().transform((str) => new Date(str)),
		isActive: z.boolean().default(false),
	});

	const body = await c.req.json();
	const parsed = schema.safeParse(body);

	if (!parsed.success) {
		return c.json({ error: parsed.error }, 400);
	}

	const data = parsed.data;

	// If setting this to active, deactivate others
	if (data.isActive) {
		await Season.updateMany({}, { isActive: false });
	}

	try {
		const season = await Season.create(data);
		return c.json(season);
	} catch (e: any) {
		// Handle duplicate number error if it occurs
		if (e.code === 11000) {
			return c.json({ error: "Season number already exists" }, 409);
		}
		return c.json({ error: e.message }, 500);
	}
});

// PATCH /admin/:id - Update a season (Admin Only)
app.patch("/admin/:id", async (c) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session || session.user.role !== "admin") {
		return c.json({ error: "Unauthorized" }, 401);
	}

	const id = c.req.param("id");
	const schema = z.object({
		number: z.number().optional(),
		title: z.string().optional(),
		startDate: z
			.string()
			.transform((str) => new Date(str))
			.optional(),
		endDate: z
			.string()
			.transform((str) => new Date(str))
			.optional(),
		isActive: z.boolean().optional(),
	});

	const body = await c.req.json();
	const parsed = schema.safeParse(body);

	if (!parsed.success) {
		return c.json({ error: parsed.error }, 400);
	}

	const data = parsed.data;

	// If setting this to active, deactivate others
	if (data.isActive) {
		await Season.updateMany(
			{ _id: { $ne: id } }, // Don't deactivate the one we are about to update (optimization, although Mongoose handles it)
			{ isActive: false },
		);
	}

	try {
		const season = await Season.findByIdAndUpdate(
			id,
			{ $set: data },
			{ new: true },
		);
		if (!season) {
			return c.json({ error: "Season not found" }, 404);
		}
		return c.json(season);
	} catch (e: any) {
		if (e.code === 11000) {
			return c.json({ error: "Season number already exists" }, 409);
		}
		return c.json({ error: e.message }, 500);
	}
});

// DELETE /admin/:id - Delete a season (Admin Only)
app.delete("/admin/:id", async (c) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session || session.user.role !== "admin") {
		return c.json({ error: "Unauthorized" }, 401);
	}

	const id = c.req.param("id");

	const season = await Season.findByIdAndDelete(id);

	if (!season) {
		return c.json({ error: "Season not found" }, 404);
	}

	return c.json({ success: true, id });
});

export default app;
