const BANNER = String.raw`
╔══════════════════════════════════════════════╗
║                                                ║
║        A U T O   F L O W                      ║
║        · app creator ·                        ║
║                                                ║
╚══════════════════════════════════════════════╝
`.trim();

const STEPS = [
  ["request", "you send a feature request over Telegram"],
  ["build", "the agent implements it in app/, writes tests, updates docs"],
  ["verify", "npm run check gates every change, staging deploys on green"],
  ["ship", "you review on staging, then /release promotes to production"],
] as const;

export function renderHomePage(): string {
  const steps = STEPS.map(
    ([label, description]) => `
        <li>
          <span class="step-label">${label}</span>
          <span class="step-desc">${description}</span>
        </li>`,
  ).join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Auto Flow App Creator</title>
<style>
  :root {
    color-scheme: light;
    --ink: #1b1b18;
    --paper: #f5f4ed;
    --card: #ffffff;
    --line: #e3e1d6;
    --accent: #d97757;
    --mono: "SF Mono", ui-monospace, Menlo, Consolas, monospace;
    --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 4rem 1.5rem 3rem;
    background: var(--paper);
    color: var(--ink);
    font-family: var(--sans);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  main {
    width: 100%;
    max-width: 640px;
  }
  pre.banner {
    font-family: var(--mono);
    font-size: 0.8rem;
    line-height: 1.3;
    color: var(--ink);
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 1.5rem;
    margin: 0 0 2.5rem;
    overflow-x: auto;
    text-align: center;
  }
  h1 {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    margin: 0 0 0.4rem;
  }
  p.tagline {
    margin: 0 0 2.5rem;
    color: #5c5a4e;
    font-size: 0.95rem;
  }
  section.card {
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 1.75rem;
    margin-bottom: 2.5rem;
  }
  section.card h2 {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
    margin: 0 0 1.25rem;
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    counter-reset: step;
  }
  ol li {
    counter-increment: step;
    display: flex;
    gap: 1rem;
    align-items: baseline;
    padding: 0.55rem 0;
    border-top: 1px solid var(--line);
    font-family: var(--mono);
    font-size: 0.85rem;
  }
  ol li:first-child { border-top: none; }
  ol li::before {
    content: counter(step);
    color: var(--accent);
    font-weight: 600;
  }
  .step-label {
    color: var(--ink);
    font-weight: 600;
    min-width: 5.5rem;
  }
  .step-desc {
    color: #5c5a4e;
  }
  footer {
    text-align: center;
    font-size: 0.85rem;
    color: #5c5a4e;
  }
  footer a {
    color: var(--accent);
    text-decoration: none;
    font-family: var(--mono);
  }
  footer a:hover { text-decoration: underline; }
</style>
</head>
<body>
  <main>
    <pre class="banner">${BANNER}</pre>
    <h1>Auto Flow App Creator</h1>
    <p class="tagline">Clean code. Automatic flow. Trusted by design.</p>
    <section class="card">
      <h2>How a cycle works</h2>
      <ol>${steps}
      </ol>
    </section>
    <footer>
      Built by Ezequiel &middot; <a href="https://github.com/cipoBaruf">github.com/cipoBaruf</a>
    </footer>
  </main>
</body>
</html>
`;
}
