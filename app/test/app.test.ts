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

  it("GET / includes a repo link and a fancy project-info block", async () => {
    const res = await request(createApp()).get("/");
    expect(res.text).toContain("https://github.com/CipoBaruf/auto-flow-template/");
    expect(res.text).toContain("terminal-body");
    expect(res.text).toContain("auto-flow-app");
  });

  it("GET / renders an oh-my-zsh-style prompt line and ASCII divider", async () => {
    const res = await request(createApp()).get("/");
    expect(res.text).toContain("class=\"prompt\"");
    expect(res.text).toContain("prompt-arrow");
    expect(res.text).toContain("git:(<span class=\"prompt-branch\">main</span>)");
    expect(res.text).toContain("class=\"divider\"");
  });

  it("GET / uses a large multi-line figlet-style ASCII banner", async () => {
    const res = await request(createApp()).get("/");
    const bannerMatch = res.text.match(/<pre class="banner">([\s\S]*?)<\/pre>/);
    expect(bannerMatch).not.toBeNull();
    const bannerLines = (bannerMatch?.[1] ?? "").trim().split("\n");
    expect(bannerLines.length).toBeGreaterThanOrEqual(12);
    expect(res.text).toContain("$ cat about.json");
  });
});
