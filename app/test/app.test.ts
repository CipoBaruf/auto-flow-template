import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";

describe("baseline app", () => {
  it("GET /health returns ok", async () => {
    const res = await request(createApp()).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("GET / returns app info", async () => {
    const res = await request(createApp()).get("/");
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("auto-flow-app");
  });

  it("GET /time returns the current server time", async () => {
    const before = Date.now();
    const res = await request(createApp()).get("/time");
    const after = Date.now();

    expect(res.status).toBe(200);
    expect(typeof res.body.now).toBe("string");

    const now = new Date(res.body.now).getTime();
    expect(now).toBeGreaterThanOrEqual(before);
    expect(now).toBeLessThanOrEqual(after);
  });
});
