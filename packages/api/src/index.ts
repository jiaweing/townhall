import { Hono } from "hono";
import seasonRouter from "./routes/season";
import updatesRouter from "./routes/updates";
import userRouter from "./routes/user";

const app = new Hono();

app.route("/season", seasonRouter);
app.route("/updates", updatesRouter);
app.route("/user", userRouter);

export default app;
export type AppType = typeof app;
