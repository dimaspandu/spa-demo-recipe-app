import styles from "./index.css" with { type: "css" };
import Spa from "./spa/index.js";
import { appendStyleSheet } from "./utils/appendStyleSheet.js";
import { bindNavigation } from "./helpers/bindNavigation.js";

((styles) => appendStyleSheet(styles))(styles);

const app = new Spa({
  hostdom: document.getElementById("app-host")
});

((app) => bindNavigation(app))(app);

export { app };