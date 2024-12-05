import markdownParser from "../shared/markdownParser.js";

/**
 * Generates an optimized SVG short code with optional attributes.
 *
 * @param {string} img - That path to image
 * @param {string} [caption=''] - The ARIA label for the SVG.
 * @returns {string} The optimized SVG shortcode.
 */
export default function figureShortcode(img, caption = "", alt = "", style = "") {
  let imgPath = img;
  if (!img.startsWith("/assets/img/")) {
      if (img.startsWith("/")) {
        img = img.substring(1);
      }
      imgPath = `/assets/img/${img}`
  }

  let imgCaption;
  if (caption) {
    imgCaption = markdownParser.renderInline(caption);
  }

  const imgAlt = caption ?? alt;

  return `<figure>
      <img src="${imgPath}" ${imgAlt ? `alt=\"${imgAlt}\"` : ""} ${style ? `style=\"${style}\"` : ""}/>
      ${imgCaption ? `<figcaption>${imgCaption}</figcaption>` : ""}
    </figure>`
};