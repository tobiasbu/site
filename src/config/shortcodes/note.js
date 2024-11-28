import markdownParser from "../shared/markdownParser.js";
import svgShortcode from "./svg.js";

export default async function noteShortcode(type, title="", text="") {
  const svgIcon = await svgShortcode(type, "Warning Icon");
  const mt = markdownParser.render(text);
  return `<aside class="tob-note-card">
    <div class="tob-note-card-title">
      <div class="tob-note-card-icon">${svgIcon}</div>
      <h3>${title}</h3>
    </div>
    <div class="tob-note-card-message">${mt}</div>
    </div>
  </aside>`;
}