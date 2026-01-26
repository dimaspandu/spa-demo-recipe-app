# SPA-JSPLUS

**SPA-JSPlus** is an experimental **Single Page Application architecture** built using **vanilla JavaScript (ESM)**.

This repository is an **example/demo project** that showcases how the SPA-JSPlus analyzer, bundler, and runtime work together in a real application.

The core SPA-JSPlus project lives here:
[https://github.com/dimaspandu/spa-jsplus](https://github.com/dimaspandu/spa-jsplus)

This project is **not a framework** and **not a library**.
It is a **reference implementation** that demonstrates how a modern SPA can be built using:

* native ES modules
* explicit routing & lifecycle control
* a lightweight analyzer + bundler pipeline
* zero runtime dependencies

> Think of this repo as a **learning-grade SPA engine + tooling**, not a drop-in replacement for React/Vue.

---

## Philosophy

SPA-JSPlus is designed with the following principles:

* **Vanilla-first**
  No JSX, no virtual DOM, no framework magic.

* **Explicit over implicit**
  Routing, lifecycle, and transitions are handled intentionally.

* **Tooling as learning surface**
  Analyzer, bundler, and runtime are readable and hackable.

* **Separation of concerns**

  * *Analyzer* → dependency graph
  * *Bundler* → output orchestration
  * *SPA engine* → runtime behavior

---

## Demo Project: Recipe App

This repository contains a **Recipe Application demo** that integrates:

* SPA engine
* analyzer
* bundler
* multiple execution modes

It serves as a **real-world reference** for how the system is meant to be used.

### Features

* Home & Favorites routes
* Modal routing via query params
* Back/forward history awareness
* Route lifecycle hooks (`onMeet`, `endReactor`)
* Transition indicators
* Custom 404 handling
* Asset & CSS bundling

---

## Execution Modes

This project intentionally supports **three different ways to run the app**.

### 1️⃣ Development Mode (Native ESM)

**No bundling. No Node server.**

```text
Browser → index.html → native ES modules
```

How to run:

* Open `index.html` directly
* Or use VSCode **Live Server**

Best for:

* Debugging browser behavior
* Understanding SPA internals
* Learning how modules interact

---

### 2️⃣ Bundle Only (Build Step)

Runs analyzer + bundler **without starting a server**.

```bash
node run.bundle.js
```

What it does:

* Traverses dependencies starting from `pre-index.js`
* Emits bundled JS + copied assets into `dist/`
* Applies minification if enabled

Used by:

* CDN builds
* CI pipelines
* Static hosting

---

### 3️⃣ Bundled Start (Production-like)

```bash
node run.start.js
```

What happens:

1. Runs `run.bundle.js`
2. Serves the `dist/` directory via a static Node server

This simulates:

* production output
* deployable static assets
* no source files exposed

---

## Project Structure

The structure below reflects the **actual layout of this demo repo** and how each part participates in the SPA-JSPlus pipeline.

```
SPA-DEMO-RECIPE-APP/
├── assets/              # Static assets (images, icons, etc.)
├── bundler/             # Analyzer + bundler implementation
├── dist/                # Generated output (after bundling)
├── helpers/             # DOM helpers & UI utilities
├── models/              # Data models / domain logic
├── spa/                 # Core SPA runtime engine
├── utils/               # Shared low-level utilities
│
├── app.js               # Application bootstrap & wiring
├── index.js             # Route definitions & reactors
├── pre-index.js         # Bundler manifest / entry graph
│
├── index.html           # Main SPA HTML entry
├── favorites.html       # Favorites route HTML
├── 404.html             # Custom 404 fallback page
├── index.css            # Global styles
│
├── config.json          # App / bundler configuration
│
├── run.dev.js           # Native ESM dev runner
├── run.bundle.js        # Analyzer + bundler entry
├── run.start.js         # Bundle + static server
│
├── .gitignore
├── LICENSE
└── README.md
```

### Notes on Structure

* **HTML files are first-class inputs**
  HTML is explicitly imported and bundled like JS modules.

* **`pre-index.js` defines the bundle boundary**
  Only files reachable from this entry will exist in `dist/`.

* **`spa/` contains no app logic**
  It is a reusable runtime, not a feature layer.

* **`helpers/`, `models/`, `utils/` stay framework-agnostic**
  They are plain ES modules with no SPA assumptions.

---

## Key Files Explained

### `pre-index.js`

This file acts as the **bundle manifest**.

```js
import "./index.html";
import "./favorites.html";
import "./404.html";
import "./index.css";
import "./assets/example.png";

import app from "./index.js";
(() => app)(app);
```

> If a file is not imported here, it will **not** appear in the bundle.

---

### `index.js` — Routing Example

```js
app.reactor(["", "/", "/home"], function (ctx) {
  ctx.container = () => renderRecipes("/");

  ctx.onMeet.set = () => {
    document.title = "Recipe App";
  };

  ctx.endReactor = () => !ctx.query.recipeId;
});
```

Concepts:

* `container` → render logic
* `onMeet` → lifecycle hook
* `endReactor` → history & modal control

---

## Live Demo

👉 [https://spademorecipeapp.netlify.app/](https://spademorecipeapp.netlify.app/)

---

## What This Project Is (and Isn’t)

✔ A reference SPA architecture
✔ A learning tool
✔ A hackable codebase

✖ Not a production-ready framework
✖ Not optimized for DX like React/Vue
✖ Not meant to hide complexity

---

## Notes for Contributors

* Read the code **top-down**, not bottom-up
* Analyzer → Bundler → Runtime flow is intentional
* Comments explain *why*, not just *what*
* Breaking changes are acceptable (this is experimental)

---

## License

MIT © dimaspandu

Free to study, modify, and reuse.
