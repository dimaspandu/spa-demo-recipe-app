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

```
├── assets/            # Static assets (images, etc.)
├── bundler/           # Analyzer + bundler implementation
├── dist/              # Generated output (after bundle)
├── helpers/           # UI & DOM helpers
├── models/            # Data models
├── spa/               # Core SPA engine
│
├── app.js             # Application bootstrap
├── index.js           # Route & reactor definitions
├── pre-index.js       # Bundler manifest entry
│
├── index.html         # Main HTML entry
├── favorites.html     # Favorites page
├── 404.html           # Error page
│
├── run.dev.js         # Native ESM dev server
├── run.bundle.js      # Bundler entry
├── run.start.js       # Bundle + serve
```

---

## Key Files Explained

### `pre-index.js`

This file acts as the **bundle manifest**.

```js
import "./index.html";
import "./favorites.html";
import "./404.html";
import "./assets/example.png";

import app from "./index.js";
(() => app)(app);
```

> If a file is not imported here, it will **not** appear in the bundle.

---

### `index.js` — Routing Example

```js
app.reactor(["", "/", "/home"], function(ctx) {
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
* `endReactor` → history control

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
* Analyzer → Bundler → Runtime is intentional
* Comments explain *why*, not *what*
* Breaking changes are acceptable (this is experimental)

---

## License

MIT © dimaspandu

Free to study, modify, and reuse.
