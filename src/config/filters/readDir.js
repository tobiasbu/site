import { readdirSync } from 'node:fs';

/**
 * Split string.
 * @param {string} filePath
 * @param {string} [filter=""]
 */
export default function readDir(filePath, filter = "") {
  try {
    let files = readdirSync(filePath);

    if (filter && filter.length > 0) {
      files = files.reduce((result, current) => {
        if (current.includes(filter)) {
          result.push(current);
        }
        return result;
      }, []);
    }

    const outputPath = filePath.replace("src", "");
    return files.map((f) => `${outputPath}/${f}`);
  } catch (err) {
    return [err];
  }
}