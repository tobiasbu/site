
import { readFileSync } from 'node:fs';
import { optimize } from 'svgo';

/**
 * Generates an optimized SVG short code with optional attributes.
 *
 * @param {string} svgName - The name of the SVG file (without the .svg extension).
 * @param {string} [ariaName=''] - The ARIA label for the SVG.
 * @param {string} [className=''] - The CSS class name for the SVG.
 * @param {string} [styleName=''] - The inline style for the SVG.
 * @returns {Promise<string>} The optimized SVG shortcode.
 */
export default async function svgShortcode(svgName, ariaName = '', className = '', styleName = '') {
  const svgData = readFileSync(`./src/assets/svg/${svgName}.svg`, 'utf8');

  const { data } = optimize(svgData);

  return data.replace(
    /<svg(.*?)>/,
    `<svg$1 ${ariaName ? `aria-label="${ariaName}"` : 'aria-hidden="true"'} ${className ? `class="${className}"` : ''} ${styleName ? `style="${styleName}"` : ''} >`
  );
};