import plugins from './src/config/plugins.js';

const INPUT_DIR = "src";

/**
 * @param {import("@11ty/eleventy/UserConfig")} eleventyConfig -
 * @returns {object}
 */
export default async function(eleventyConfig) {
  // watch folders
  eleventyConfig.addWatchTarget(`${INPUT_DIR}/styles/**/*.{css}`); 

  // add plugins
  eleventyConfig.addPlugin(plugins.cssConfig);

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "includes",
      data: "data",
      layouts: "layouts"
    },
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk"
  }
};