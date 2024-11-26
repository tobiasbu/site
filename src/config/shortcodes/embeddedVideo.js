

// <iframe width="1047" height="589" src="https://www.youtube.com/embed/PsBKjEJmge8" title="Laserball no Pub" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

// <iframe width="809" height="607" src="https://www.youtube.com/embed/uPAZpw5VGas" title="Diablo - RPG Maker - Alpha Test" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

const YOUTUBE_URL_REGEX = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/gm;

/**
 * Embedded video.
 * @param {string} videoSrc Video URL
 * @param {boolean} wide Is wide video?
 */
export default function embeddedVideoShortcode(videoSrc) {
  // Reset `lastIndex` if this regex is defined globally
  YOUTUBE_URL_REGEX.lastIndex = 0;

  const wide = true;
  let isEmbedUrl = false;
  let code = "";

  const matches = YOUTUBE_URL_REGEX.exec(videoSrc);
  if (matches) {
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      if (match) {
        if (match.includes("/embed/")) {
          isEmbedUrl = true;
          break;
        }
        
        if (i === 5) {
          code = match;
        }
      }
    }
  }

  if (!isEmbedUrl) {
    videoSrc = `https://www.youtube.com/embed/${code}`;
  }

  const size = wide ? "width=\"1047\" height=\"589\"" : "width=\"809\" height=\"607\"";

  return `<div class="tob-embedded-video">
    <iframe ${size} src="${videoSrc}" title="YouTube video player" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>`;
}