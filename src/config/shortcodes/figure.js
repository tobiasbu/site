
/**
 * Generates an optimized SVG short code with optional attributes.
 *
 * @param {string} img - That path to image
 * @param {string} [caption=''] - The ARIA label for the SVG.
 * @returns {string} The optimized SVG shortcode.
 */
export default function figureShortcode(img, caption = "") {
  let imgPath = img;
  if (!img.startsWith("/assets/img/")) {
      imgPath = `/assets/img/${img}`
  }

  return `
    <figure>
      <img src="${imgPath}" ${caption ? `alt=\"${caption}\"` : ""} />
      ${caption ? `<figcaption>${caption}</figcaption>` : ""}
    </figure>
  `
};