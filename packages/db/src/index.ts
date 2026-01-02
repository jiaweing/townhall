import { env } from "@townhall/env/server";
import mongoose from "mongoose";

await mongoose.connect(env.DATABASE_URL).catch((error) => {
	console.log("Error connecting to database:", error);
});

const client = mongoose.connection.getClient().db("townhall");

export * from "./models/season";
export * from "./models/update";
export { client };
