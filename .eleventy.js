import plugins from './src/config/plugins.js';

const INPUT_DIR = "src";

/**
 * @param {import("@11ty/eleventy/UserConfig")} eleventyConfig -
 * @returns {object}
 */
export default async function(eleventyConfig) {
  // watch folders
  eleventyConfig.addWatchTarget(`${INPUT_DIR}/styles/**/*.{css}`); 
  eleventyConfig.addWatchTarget(`${INPUT_DIR}/assets/**/*.{js,svg,png,jpeg}`);

  // add plugins
  eleventyConfig.addPlugin(plugins.cssConfig);

  // copy images
  eleventyConfig.addPassthroughCopy('src/assets/img')

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