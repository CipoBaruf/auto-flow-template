const BANNER = String.raw`
 █████╗ ██╗   ██╗████████╗ ██████╗
██╔══██╗██║   ██║╚══██╔══╝██╔═══██╗
███████║██║   ██║   ██║   ██║   ██║
██╔══██║██║   ██║   ██║   ██║   ██║
██║  ██║╚██████╔╝   ██║   ╚██████╔╝
╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝

███████╗██╗      ██████╗ ██╗    ██╗
██╔════╝██║     ██╔═══██╗██║    ██║
█████╗  ██║     ██║   ██║██║ █╗ ██║
██╔══╝  ██║     ██║   ██║██║███╗██║
██║     ███████╗╚██████╔╝╚███╔███╔╝
╚═╝     ╚══════╝ ╚═════╝  ╚══╝╚══╝
`.trim();

const STEPS = [
  ["request", "you send a feature request over Telegram"],
  ["build", "the agent implements it in app/, writes tests, updates docs"],
  ["verify", "npm run check gates every change, staging deploys on green"],
  ["ship", "you review on staging, then /release promotes to production"],
] as const;

const REPO_URL = "https://github.com/CipoBaruf/auto-flow-template/";

const PROJECT_INFO = {
  name: "auto-flow-app",
  tagline: "Clean code. Automatic flow. Trusted by design.",
  stack: ["Node 24", "TypeScript", "Express"],
  author: "Ezequiel",
  repo: REPO_URL,
} as const;

function escapeHtml(value: string): string {
  return value.replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char] as string);
}

function jsonValueHtml(value: string | readonly string[]): string {
  if (Array.isArray(value)) {
    const items = value.map((item) => `<span class="json-str">"${escapeHtml(item)}"</span>`).join(", ");
    return `[${items}]`;
  }
  return `<span class="json-str">"${escapeHtml(value as string)}"</span>`;
}

function renderProjectInfoJson(): string {
  const lines = Object.entries(PROJECT_INFO).map(
    ([key, value]) =>
      `  <span class="json-key">"${key}"</span>: ${jsonValueHtml(value as string | readonly string[])}`,
  );
  return `{\n${lines.join(",\n")}\n}`;
}

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
    color-scheme: dark;
    --ink: #e4e7ec;
    --muted: #8a93a3;
    --bg: #0a0d12;
    --card: #10141b;
    --line: #232833;
    --accent: #8b7cf6;
    --accent-dim: #6e5fd1;
    --accent-2: #52d8c4;
    --ok: #63c374;
    --warn: #f4c05d;
    --err: #f16565;
    --mono: "SF Mono", ui-monospace, "Cascadia Code", Menlo, Consolas, monospace;
    --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 4rem 1.5rem 3rem;
    background: var(--bg);
    background-image:
      radial-gradient(circle at 15% 0%, rgba(139, 124, 246, 0.08), transparent 45%),
      radial-gradient(circle at 85% 100%, rgba(82, 216, 196, 0.06), transparent 45%);
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
    font-size: 0.68rem;
    line-height: 1.25;
    font-weight: 700;
    margin: 0 auto;
    padding: 0;
    text-align: center;
    white-space: pre;
    display: inline-block;
    width: 100%;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0 0 14px rgba(139, 124, 246, 0.35));
  }
  .banner-wrap {
    overflow-x: auto;
    margin: 0 0 1.1rem;
  }
  .divider {
    text-align: center;
    font-family: var(--mono);
    color: var(--line);
    letter-spacing: 0.3em;
    font-size: 0.7rem;
    margin: 0 0 1.6rem;
  }
  .prompt {
    text-align: center;
    font-family: var(--mono);
    font-size: 0.85rem;
    margin: 0 0 2.5rem;
  }
  .prompt-arrow { color: var(--ok); font-weight: 700; }
  .prompt-dir { color: var(--accent-2); }
  .prompt-git { color: var(--muted); }
  .prompt-branch { color: var(--accent); }
  .prompt-dirty { color: var(--err); }
  h1 {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    margin: 0 0 0.4rem;
    color: var(--ink);
    text-align: center;
  }
  p.tagline {
    margin: 0 0 2.5rem;
    color: var(--muted);
    font-size: 0.95rem;
    text-align: center;
  }
  section.card {
    position: relative;
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 1.75rem;
    margin-bottom: 2.5rem;
  }
  section.card::before,
  section.card::after,
  section.card h2::before,
  section.card h2::after {
    content: "";
  }
  section.card::before,
  section.card::after {
    position: absolute;
    width: 0.85rem;
    height: 0.85rem;
    border: 1px solid var(--accent-dim);
    opacity: 0.6;
  }
  section.card::before {
    top: -1px;
    left: -1px;
    border-right: none;
    border-bottom: none;
    border-top-left-radius: 4px;
  }
  section.card::after {
    bottom: -1px;
    right: -1px;
    border-left: none;
    border-top: none;
    border-bottom-right-radius: 4px;
  }
  section.card h2 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
    margin: 0 0 1.25rem;
  }
  section.card h2 .chevron {
    color: var(--accent-2);
  }
  section.card h2::after {
    flex: 1;
    height: 0;
    border-top: 1px dashed var(--line);
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
    color: var(--muted);
  }
  section.terminal {
    padding: 0;
    overflow: hidden;
  }
  .terminal-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1rem;
    border-bottom: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.02);
  }
  .terminal-bar .dot {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background: var(--line);
  }
  .terminal-bar .dot-red { background: var(--err); }
  .terminal-bar .dot-yellow { background: var(--warn); }
  .terminal-bar .dot-green { background: var(--ok); }
  .terminal-title {
    margin-left: 0.25rem;
    font-family: var(--mono);
    font-size: 0.78rem;
    color: var(--muted);
  }
  pre.terminal-body {
    margin: 0;
    padding: 1.25rem 1.5rem;
    font-family: var(--mono);
    font-size: 0.82rem;
    line-height: 1.6;
    color: var(--ink);
    overflow-x: auto;
  }
  .prompt-cmd { color: var(--accent-2); }
  .json-key { color: var(--accent); }
  .json-str { color: #7fd8a4; }
  footer {
    text-align: center;
    font-size: 0.85rem;
    color: var(--muted);
    font-family: var(--mono);
  }
  footer .rule {
    color: var(--line);
    letter-spacing: 0.4em;
    margin: 0 0 1rem;
    font-size: 0.7rem;
  }
  footer a {
    color: var(--accent);
    text-decoration: none;
    font-family: var(--mono);
  }
  footer a:hover { text-decoration: underline; color: var(--accent-dim); }
  footer .repo-link {
    display: block;
    margin-top: 0.4rem;
    font-size: 0.8rem;
  }
</style>
</head>
<body>
  <main>
    <div class="banner-wrap"><pre class="banner">${BANNER}</pre></div>
    <p class="divider">◆ ─────────────────────────────── ◆</p>
    <p class="prompt">
      <span class="prompt-arrow">&#10148;</span>
      <span class="prompt-dir">auto-flow-app</span>
      <span class="prompt-git">git:(<span class="prompt-branch">main</span>)</span>
      <span class="prompt-dirty">&#10007;</span>
    </p>
    <h1>Auto Flow App Creator</h1>
    <p class="tagline">Clean code. Automatic flow. Trusted by design.</p>
    <section class="card">
      <h2><span class="chevron">&#10095;</span> How a cycle works</h2>
      <ol>${steps}
      </ol>
    </section>
    <section class="card terminal">
      <div class="terminal-bar">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
        <span class="terminal-title">about.json</span>
      </div>
      <pre class="terminal-body"><span class="prompt-cmd">$ cat about.json</span>

${renderProjectInfoJson()}</pre>
    </section>
    <footer>
      <p class="rule">· · · · · · · · · · · · · · · · · · ·</p>
      Built by Ezequiel &middot; <a href="https://github.com/cipoBaruf">github.com/cipoBaruf</a>
      <a class="repo-link" href="${REPO_URL}">${REPO_URL}</a>
    </footer>
  </main>
</body>
</html>
`;
}
