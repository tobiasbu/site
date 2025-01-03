
export default function merge(a, b) {
  if (typeof a === 'object') {
    if (typeof b === 'object') {
      return { ...a, ...b };
    }
  }
  console.warn(`merge filter not supported for type ${typeof a} and ${typeof b}`)
}