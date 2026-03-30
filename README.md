# SPA Demo Recipe App (SPA-JSPlus)

This repo is a demo Single Page Application built with vanilla JavaScript (ESM) to showcase the SPA-JSPlus analyzer, bundler, and runtime working together in a real app.

Core project: https://github.com/dimaspandu/spa-jsplus

This is not a framework or library. It is a reference implementation for learning and experimentation.

---

## Highlights

- Native ES modules (no framework runtime)
- Explicit routing and lifecycle control
- Lightweight analyzer + bundler pipeline
- Zero runtime dependencies
- Recipe App demo with Home and Favorites routes
- Modal routing via query params
- Custom 404 handling

---

## How To Run

There are three supported modes.

### 1) Dev (native ESM, no bundling)

Runs a minimal static server with SPA fallback and focus-based auto reload.

```bash
node run.dev.js
```

Notes:
- `run.dev.js` reads `config.json`.
- `port` is required.
- `devDir` is optional. If omitted, the project root is served.

Example `config.json` snippet:

```json
{
  "port": 4502,
  "devDir": "spa"
}
```

### 2) Bundle only (build step)

```bash
node run.bundle.js
```

What it does:
- Walks dependencies starting from `pre-index.js`
- Emits bundled JS + copied assets into `dist/`
- Applies minification if enabled

### 3) Bundled start (production-like)

```bash
node run.start.js
```

What happens:
1. Runs `run.bundle.js`
2. Serves `dist/` via a static Node server

---

## Project Structure

```
SPA-DEMO-RECIPE-APP/
|-- assets/              # Static assets (images, icons, etc.)
|-- bundler/             # Analyzer + bundler implementation
|-- dist/                # Generated output (after bundling)
|-- helpers/             # DOM helpers and UI utilities
|-- models/              # Data models / domain logic
|-- spa/                 # Core SPA runtime engine
|-- utils/               # Shared low-level utilities
|
|-- app.js               # Application bootstrap and wiring
|-- index.js             # Route definitions and reactors
|-- pre-index.js         # Bundler entry / manifest
|
|-- index.html           # Main SPA HTML entry
|-- favorites.html       # Favorites route HTML
|-- 404.html             # Custom 404 fallback page
|-- index.css            # Global styles
|
|-- config.json          # App / bundler configuration
|
|-- run.dev.js           # Dev server (native ESM, no bundling)
|-- run.bundle.js        # Analyzer + bundler entry
|-- run.start.js         # Bundle + static server
|
|-- README.md
```

---

## Key File: pre-index.js

This file is the bundle manifest. If a file is not imported here, it will not appear in the bundle.

```js
import "./index.html";
import "./favorites.html";
import "./404.html";
import "./index.css";
import "./assets/example.png";

import app from "./index.js";
(() => app)(app);
```

---

## Live Demo

https://spademorecipeapp.netlify.app/

---

## License

MIT Copyright (c) dimaspandu
