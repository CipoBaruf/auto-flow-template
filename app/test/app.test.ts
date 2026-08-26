import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
import { AUTHOR_NAME, PROJECT_NAME, PROJECT_SUMMARY } from "../src/homePage.js";

describe("baseline app", () => {
  it("GET /health returns ok", async () => {
    const res = await request(createApp()).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("GET / returns an HTML page with the ASCII banner, project summary, and author", async () => {
    const res = await request(createApp()).get("/");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/html/);
    expect(res.text).toMatch(/A U T O - F L O W - A P P/);
    expect(res.text).toContain(PROJECT_SUMMARY);
    expect(res.text).toContain(AUTHOR_NAME);
    expect(res.text).toContain(PROJECT_NAME);
  });

  it("GET / renders only ASCII characters (no unicode art)", async () => {
    const res = await request(createApp()).get("/");
    // eslint-disable-next-line no-control-regex
    expect(/^[\x00-\x7F]*$/.test(res.text)).toBe(true);
  });
});
