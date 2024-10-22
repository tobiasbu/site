import { extname } from 'node:path';
import { readdir } from 'node:fs/promises';

const VIDEOS_INPUT = "./src/assets/video";
const CAPTURE_OPTIONS = /(?:(\w+)=([\w\d \.:;%()]+)?)+\|?/gm;

export default async function videoShortcode(videoName, poster = '', options = '') {

  const files = await readdir(VIDEOS_INPUT, { recursive: true });
  const sources = [];
  files.map((f) => {
    if (f.includes(videoName)) {
      sources.push(`assets/video/${f}`);
    }
  });

  let parsedStyle = ""
  if (typeof options === "string") {
    // Reset `lastIndex` if this regex is defined globally
    CAPTURE_OPTIONS.lastIndex = 0;

    const matches = CAPTURE_OPTIONS.exec(options);
    if (matches) {
      for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        if (match === "style") {
          parsedStyle = matches[i + 1] ?? "";
          i += 2;
        }
      }
    }
  } else if (typeof options === "object") {
    parsedStyle = Object.keys(options).reduce((result, current) => {
      if (options[current]) {
        return result.concat(`${current}: ${options[current]};`)
      }
      return result;
    }, "")

   
  }

  const result =  `
  <div class="tob-video">
    <video class="tob-video-inner" 
      ${poster ? `poster=\"${poster}\"` : ''}
      ${parsedStyle ? `style=\"${parsedStyle}\"` : ''}
      autoplay loop muted>
${sources.map((src) => `<source type="video/${extname(src).substring(1)}" src="${src}" />`).join("\n")}
    </video>
  </div>`;

  return result;
}