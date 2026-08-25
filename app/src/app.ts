import express from "express";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", env: process.env.APP_ENV ?? "local" });
  });

  app.get("/", (_req, res) => {
    res.json({ name: "auto-flow-app", message: "Baseline app for the automatic flow development cycle." });
  });

  return app;
}
