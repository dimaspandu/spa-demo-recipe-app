/**
 * Build manifest entry.
 *
 * All static assets, HTML pages, and entry modules
 * must be imported here to be included in the bundle.
 *
 * This file is used ONLY by the bundler.
 * It is never executed directly in the browser.
 */

// HTML pages
import "./index.html";
import "./favorites.html";
import "./404.html";

// Static assets
import "./assets/caesar-salad.jpg";
import "./assets/empty-state.png";
import "./assets/pancakes.jpg";
import "./assets/spaghetti-bolognese.jpg";

// Application entry
import app from "./index.js";

/**
 * Export app to ensure it is retained in the bundle graph.
 */
(() => app)(app);
