import express from "express";
import cors from "cors";
import { env } from "./env";

import projectsRouter from "./routes/projects";
// TODO
// import materialsRouter from "./routes/materials";
// import toolsRouter from "./routes/tools";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/projects", projectsRouter);
// TODO
// app.use("/api/materials", materialsRouter);
// app.use("/api/tools", toolsRouter);

app.listen(env.PORT, () => {
  console.log(`API listening on http://localhost:${env.PORT}`);
});
