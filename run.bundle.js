import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bundle from "./bundler/index.js";

/**
 * Resolve __filename and __dirname for ESM modules.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Execute the bundler with an explicit configuration.
 *
 * This script:
 * - Builds the dependency graph starting from `pre-index.js`
 * - Emits all bundles and assets into `dist/`
 * - Enables minification to simulate production output
 *
 * Note:
 * This file does NOT start a server.
 */
await bundle({
  entry: path.join(__dirname, "pre-index.js"),
  outputDir: path.join(__dirname, "dist"),
  uglified: true
});
