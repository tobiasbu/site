import yaml from 'js-yaml';

import plugins from './src/config/plugins.js';
import shortcodes from './src/config/shortcodes.js';
import tags from './src/config/tags.js';

const INPUT_DIR = "src";

/**
 * @param {import("@11ty/eleventy/UserConfig")} eleventyConfig -
 * @returns {object}
 */
export default async function(eleventyConfig) {
  // watch folders
  eleventyConfig.addWatchTarget(`${INPUT_DIR}/styles/**/*.{css}`); 
  eleventyConfig.addWatchTarget(`${INPUT_DIR}/assets/**/*.{js,svg,png,jpeg}`);

  // add yaml support
  eleventyConfig.addDataExtension('yml,yaml', contents => yaml.load(contents));

  // add plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.cssConfig);
  eleventyConfig.addPlugin(plugins.jsConfig);

  // add shortcodes
  eleventyConfig.addShortcode('svg', shortcodes.svg);
  eleventyConfig.addShortcode('video', shortcodes.video);

  // add tags
  tags.addMarkdownTag(eleventyConfig);

  // add bundles
  eleventyConfig.addBundle("css", {hoist: true});
  eleventyConfig.addBundle("js");

  // copy assets
  eleventyConfig.addPassthroughCopy('src/assets/img')
  eleventyConfig.addPassthroughCopy('src/assets/video')
  eleventyConfig.addPassthroughCopy('src/docs')

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