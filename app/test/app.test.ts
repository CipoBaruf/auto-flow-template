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

  it("GET / includes the current server time as an ISO timestamp", async () => {
    const before = Date.now();
    const res = await request(createApp()).get("/");
    const after = Date.now();

    expect(res.status).toBe(200);
    expect(res.body.serverTime).toEqual(expect.any(String));

    const serverTime = new Date(res.body.serverTime).getTime();
    expect(serverTime).toBeGreaterThanOrEqual(before);
    expect(serverTime).toBeLessThanOrEqual(after);
  });
});
