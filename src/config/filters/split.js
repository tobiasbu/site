
/**
 * Split string.
 * @param {string} value 
 * @param {RegExp | string | number} separator 
 */
export default function split(value, separator) {
  if (separator === "number") {
    separator = String(separator);
  }

  const r = value.split(separator);
  return r;
}