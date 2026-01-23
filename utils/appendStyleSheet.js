/**
 * Appends a CSSStyleSheet or raw CSS string to the DOM.
 * If the sheet is a string, it's treated as raw CSS and appended directly.
 * Otherwise, it serializes the CSSStyleSheet into a <style> element.
 *
 * @param {CSSStyleSheet | string} sheet - The CSSStyleSheet instance or raw CSS string to apply.
 * @param {HTMLElement | ShadowRoot} target - The DOM node to append the style to.
 * @returns {HTMLStyleElement} The created <style> element.
 */
export function appendStyleSheet(sheet, target = document.head) {
  const style = document.createElement("style");

  if (typeof sheet === "string") {
    // Raw CSS string case
    style.textContent = sheet;
  } else if (sheet instanceof CSSStyleSheet) {
    // CSSStyleSheet case
    style.textContent = Array.from(sheet.cssRules)
      .map(rule => rule.cssText)
      .join("\n");
  } else {
    throw new TypeError("Argument must be a CSSStyleSheet or a string");
  }

  target.appendChild(style);

  return style;
}
