
/**
 * Check if a value contains n values.
 * @param {string | number} value 
 * @param {string | Array<string>} needle 
 * @returns {boolean}
 */
export default function contains(value, needle = "") {
  if (Array.isArray(needle)) {
    for (let i = 0; i < needle.length; i++) {
      const element = needle[i];
      if (value.includes(element)) {
        return true;
      }
    }

    return false;
  }

  if (typeof value === "number") {
    value = `${value}`;
  }


  return value.includes(needle);
}