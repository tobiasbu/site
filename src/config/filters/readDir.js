import { readdirSync } from 'node:fs';

/**
 * Split string.
 * @param {string} filePath 
 */
export default function readDir(filePath) {
  try {
    const files = readdirSync(filePath);
    const outputPath = filePath.replace("src", "")
    return files.map((f) => `${outputPath}/${f}`);
  } catch (err) {
    return [err];
  }
}