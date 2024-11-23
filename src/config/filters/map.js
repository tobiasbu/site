
/**
 * Map values to a given string or replacer function.
 * @param {string | string[] | object} value 
 * @param {string | () => void} replacer
 * @param {string | number} separator 
 */
export default function map(value, replacer = "$1", separator = "") {
  const replacerIsFunc = typeof replacer === "function";

  if (Array.isArray(value)) {
    const r = value.map((current) => replacerIsFunc ? replacer(current) : replacer.replace("$1", current));
    return r.join(separator);
  }

  if (typeof value === "object") {
    const r = Object.keys(value).map((key) => {
      const current = value[key];

      if (replacerIsFunc) {
        return replacer(current);
      } 
      
      return replacer.replace("$1", key).replace("$2", current)  
    })
    
    return r.join(separator);
  }

  if (replacerIsFunc) {
    return replacer(value);
  }

  return replacer.replace("$1", value);
}