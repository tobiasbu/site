import { extname } from 'node:path';
import { readdirSync } from 'node:fs';

const VIDEOS_INPUT = "./src/assets/video";
const CAPTURE_OPTIONS = /(?:(\w+)=([\w\d \.:;%()]+)?)+\|?/gm;
const videoFiles = readdirSync(VIDEOS_INPUT, { recursive: true });

function objToString(obj) {
  if (typeof obj === "object") {
    return Object.keys(obj).reduce((result, current) => {
      if (obj[current]) {
        return result.concat(`${current}: ${obj[current]};`)
      }
      return result;
    }, "");
  }
  return obj;
}

/**
 * Generates HTML5 video tag.
 * 
 * @param {string} videoName Video file name.
 * @param {{ autoplay?: boolean; poster?: string; wide?: boolean; style: any; containerStyle: any; }} options 
 * @returns 
 */
export default function videoShortcode(videoName, options = {}) {
  const sources = [];
  videoFiles.map((f) => {
    if (f.includes(videoName)) {
      sources.push(`/assets/video/${f}`);
    }
  });

  let parsedStyle = ""
  let containerStyle = "";
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
    if (options.style) {
      parsedStyle = objToString(options.style);
    }
    if (options.containerStyle) {
      containerStyle = objToString(options.containerStyle);
    }
  }

  const result =  `
<div class="${options?.wide ? "tob-embedded-video" : "tob-video"}" ${containerStyle ? `style=\"${containerStyle}\"` : ''}>
  <video class="tob-video-inner" ${options.poster ? `poster=\"${options.poster}\"` : ''}
    ${parsedStyle ? `style=\"${parsedStyle}\"` : ''}
    ${options?.autoplay ? "autoplay loop muted" : "controls"}>
${sources.map((src) => `<source type="video/${extname(src).substring(1)}" src="${src}" />`).join("\n")}
Your browser does not support the video tag.
  </video>
</div>`;

  return result;
}