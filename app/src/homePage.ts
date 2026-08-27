const HERO_TEXT = "Santi vuelos laterales";

export function renderHomePage(): string {
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
    display: flex;
    justify-content: center;
  }
  h1.hero {
    font-family: var(--mono);
    font-size: clamp(1.4rem, 5vw, 2.4rem);
    font-weight: 700;
    margin: 0;
    padding: 0;
    text-align: center;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0 0 14px rgba(139, 124, 246, 0.35));
  }
</style>
</head>
<body>
  <main>
    <h1 class="hero">${HERO_TEXT}</h1>
  </main>
</body>
</html>
`;
}
