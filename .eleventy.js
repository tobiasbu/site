import yaml from 'js-yaml';

import plugins from './src/config/plugins.js';
import shortcodes from './src/config/shortcodes.js';
import tags from './src/config/tags.js';
import filters from './src/config/filters.js';

const INPUT_DIR = "src";

/**
 * @param {import("@11ty/eleventy/UserConfig")} eleventyConfig -
 * @returns {object}
 */
export default async function(eleventyConfig) {
  // watch folders
  eleventyConfig.addWatchTarget(`${INPUT_DIR}/styles/**/*.{css}`); 
  eleventyConfig.addWatchTarget(`${INPUT_DIR}/assets/**/*.{js,svg,png,jpeg}`);

  // add yaml support for data files
  eleventyConfig.addDataExtension('yml,yaml', (contents, filePath) => {
    const parsedYaml = yaml.load(contents);
    if (!parsedYaml) {
      throw new Error(`failed to parse yml data from file ${filePath}`)
    }
    return parsedYaml;
  });

  eleventyConfig.addGlobalData('tob.builtAt', () => {
    let now = new Date();
    return new Intl.DateTimeFormat(
      'en-US', { dateStyle: 'full', timeStyle: 'long' }
    ).format(now);
  });

  // add plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.cssConfig);
  eleventyConfig.addPlugin(plugins.jsConfig);

  // add shortcodes
  eleventyConfig.addShortcode('svg', shortcodes.svg);
  eleventyConfig.addShortcode('video', shortcodes.video);
  
  // add filters
  eleventyConfig.addFilter('contains', filters.contains);
  eleventyConfig.addFilter('split', filters.split);

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