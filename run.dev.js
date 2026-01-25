import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Resolve __filename and __dirname for ESM modules.
 * (Node.js does not expose them by default in ESM.)
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Create a minimal static HTTP server.
 *
 * This server:
 * - Serves files directly from disk
 * - Does NOT perform SPA fallback routing
 * - Does NOT run the bundler
 *
 * Intended for development/debugging only.
 *
 * @param {string} rootDir - Directory to serve as web root
 * @param {number} port   - Port to listen on
 */
function createStaticServer(rootDir, port) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const filePath = path.join(
      rootDir,
      urlPath === "/" ? "/index.html" : urlPath
    );

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not Found");
        return;
      }

      const ext = path.extname(filePath);
      const typeMap = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".json": "application/json",
        ".css": "text/css"
      };

      res.writeHead(200, {
        "Content-Type": typeMap[ext] || "text/plain",
        "Access-Control-Allow-Origin": "*"
      });

      res.end(data);
    });
  });

  server.listen(port, () => {
    console.log(`✔ Dev server running at http://localhost:${port}`);
    console.log(`  Serving source from: ${rootDir}`);
  });
}

/**
 * Start development server.
 *
 * Serves project root directly without bundling.
 */
createStaticServer(__dirname, 5000);
