import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";

describe("baseline app", () => {
  it("GET /health returns ok", async () => {
    const res = await request(createApp()).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("GET / renders the HTML landing page with only the hero text", async () => {
    const res = await request(createApp()).get("/");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/html/);
    expect(res.text).toContain("<h1 class=\"hero\">Santi vuelos laterales</h1>");
  });

  it("GET / uses a dark color scheme without orange accents", async () => {
    const res = await request(createApp()).get("/");
    expect(res.text).toContain("color-scheme: dark");
    expect(res.text).not.toMatch(/orange|#d97757/i);
  });

  it("GET / removed the old banner, chat, prompt, and footer content", async () => {
    const res = await request(createApp()).get("/");
    expect(res.text).not.toContain("<pre class=\"banner\">");
    expect(res.text).not.toContain("class=\"prompt\"");
    expect(res.text).not.toContain("class=\"divider\"");
    expect(res.text).not.toContain("terminal-body");
    expect(res.text).not.toContain("<footer>");
    expect(res.text).not.toContain("László Bende");
    expect(res.text).not.toContain("Ezequiel");
    expect(res.text).not.toContain("github.com/CipoBaruf");
  });
});
