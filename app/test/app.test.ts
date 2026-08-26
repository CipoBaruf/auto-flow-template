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
    expect(res.body.github).toBe("https://github.com/cipoBaruf");
  });
});
