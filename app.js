import styles from "./index.css" with { type: "css" };
import Spa from "./spa/index.js";
import { appendStyleSheet } from "./utils/appendStyleSheet.js";
import { bindNavigation } from "./helpers/bindNavigation.js";

/**
 * Inject the main stylesheet into the document.
 *
 * Styles are imported as a module and applied explicitly
 * to keep side effects predictable.
 */
appendStyleSheet(styles);

/**
 * Initialize SPA runtime.
 *
 * hostdom:
 *   Root DOM element where the app will be mounted.
 */
const app = new Spa({
  hostdom: document.getElementById("app-host")
});

/**
 * Bind global navigation behavior (links, history, etc).
 */
bindNavigation(app);

export { app };
