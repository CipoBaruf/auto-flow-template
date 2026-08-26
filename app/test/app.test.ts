import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";

describe("baseline app", () => {
  it("GET /health returns ok", async () => {
    const res = await request(createApp()).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("GET / renders the HTML landing page", async () => {
    const res = await request(createApp()).get("/");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/html/);
    expect(res.text).toContain("<pre class=\"banner\">");
    expect(res.text).toContain("Auto Flow App Creator");
    expect(res.text).toContain("Ezequiel");
    expect(res.text).toContain("https://github.com/cipoBaruf");
  });

  it("GET / uses a dark color scheme without orange accents", async () => {
    const res = await request(createApp()).get("/");
    expect(res.text).toContain("color-scheme: dark");
    expect(res.text).not.toMatch(/orange|#d97757/i);
  });
});
