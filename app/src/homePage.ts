export const PROJECT_NAME = "auto-flow-app";

export const PROJECT_SUMMARY =
  "Baseline for an automatic flow development cycle: request a feature over " +
  "Telegram, an AI agent implements it, CI/CD ships it to staging, you test it " +
  "from your phone, and one reply promotes it straight to production.";

export const AUTHOR_NAME = "Ezequiel";

// Fixed-width ASCII box (only 0-127 chars) sized to fit "A U T O - F L O W - A P P".
const ASCII_BANNER = `+-------------------------------------------------+
|                                                 |
|            A U T O - F L O W - A P P            |
|                                                 |
+-------------------------------------------------+`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function renderHomePage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(PROJECT_NAME)}</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem 1rem;
        background: #0d1117;
        color: #c9d1d9;
        font-family: "Courier New", Courier, monospace;
      }
      main { max-width: 56rem; }
      pre.banner {
        color: #58a6ff;
        line-height: 1.3;
        margin: 0 0 1.5rem;
        overflow-x: auto;
      }
      p { margin: 0.25rem 0; }
      .prompt { color: #8b949e; }
      .summary { color: #c9d1d9; margin-bottom: 1rem; }
      .author { color: #f0883e; }
    </style>
  </head>
  <body>
    <main>
      <pre class="banner">${ASCII_BANNER}</pre>
      <p class="prompt">$ cat about.txt</p>
      <p class="summary">${escapeHtml(PROJECT_SUMMARY)}</p>
      <p class="prompt">$ whoami</p>
      <p class="author">${escapeHtml(AUTHOR_NAME)} (creator)</p>
    </main>
  </body>
</html>
`;
}
