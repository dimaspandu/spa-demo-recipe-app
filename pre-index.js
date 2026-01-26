/**
 * Bundler manifest entry.
 *
 * This file defines the explicit boundary of the bundle graph.
 *
 * All files that should appear in the final output (`dist/`)
 * MUST be imported here, either directly or indirectly.
 *
 * Important:
 * - This file is consumed ONLY by the bundler
 * - It is never executed directly in the browser
 * - Side effects are intentional and required
 */

// ------------------------------------------------------
// Global styles (non-module CSS)
// ------------------------------------------------------
import "./index.css";

// ------------------------------------------------------
// HTML documents
// These are treated as first-class bundle inputs,
// not just static files.
// ------------------------------------------------------
import "./index.html";
import "./favorites.html";
import "./404.html";

// ------------------------------------------------------
// Static assets
// Explicit imports ensure they are copied and referenced
// correctly in the bundled output.
// ------------------------------------------------------
import "./assets/caesar-salad.jpg";
import "./assets/empty-state.png";
import "./assets/pancakes.jpg";
import "./assets/spaghetti-bolognese.jpg";

// ------------------------------------------------------
// Application runtime entry
// ------------------------------------------------------
import app from "./index.js";

/**
 * Retain application entry in the bundle graph.
 *
 * This no-op invocation prevents aggressive tree-shaking
 * or dead-code elimination from removing the SPA runtime
 * when the bundler performs static analysis.
 *
 * The function is intentionally meaningless at runtime
 * but semantically meaningful for the bundler.
 */
(() => app)(app);
