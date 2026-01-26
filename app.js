import Spa from "./spa/index.js";
import { bindNavigation } from "./helpers/bindNavigation.js";

/**
 * Create and initialize the SPA runtime instance.
 *
 * The SPA instance is responsible for:
 * - managing route reactors
 * - coordinating lifecycle hooks
 * - controlling DOM mount / unmount behavior
 *
 * hostdom:
 *   A single root DOM element that acts as the mounting point
 *   for all SPA-rendered views.
 *
 * This element should remain stable for the entire app lifecycle.
 */
const app = new Spa({
  hostdom: document.getElementById("app-host")
});

/**
 * Attach global navigation behavior to the SPA runtime.
 *
 * This wires:
 * - link click interception
 * - history push / popstate handling
 * - route resolution delegation to the SPA engine
 *
 * Separation note:
 * Navigation logic lives outside the SPA core
 * to keep the runtime minimal and reusable.
 */
bindNavigation(app);

/**
 * Export the SPA instance so it can be:
 * - imported by route definitions
 * - referenced by the bundler entry
 */
export { app };
