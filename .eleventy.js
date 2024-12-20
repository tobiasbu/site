import { EleventyRenderPlugin } from "@11ty/eleventy";
import yaml from 'js-yaml';

import markdownParser from "./src/config/shared/markdownParser.js";

import plugins from './src/config/plugins.js';
import globaldata from './src/config/globaldata.js';
import shortcodes from './src/config/shortcodes.js';
import tags from './src/config/tags.js';
import filters from './src/config/filters.js';

const INPUT_DIR = "src";

/**
 * @param {import("@11ty/eleventy/UserConfig")} eleventyConfig -
 * @returns {object}
 */
export default async function(eleventyConfig) {
  // add yaml support for data files
  eleventyConfig.addDataExtension('yml,yaml', (contents, filePath) => {
    const parsedYaml = yaml.load(contents);
    if (!parsedYaml) {
      throw new Error(`failed to parse yml data from file ${filePath}`)
    }
    return parsedYaml;
  });

  // inject macros globally to markdowns files
  eleventyConfig.addPreprocessor("macro-inject", ".md", (data, content) => {
    return `{%- import "macros/content.njk" as macros with context -%}\n` + content;
  });

  // watch folders
  eleventyConfig.addWatchTarget(`${INPUT_DIR}/styles/**/*.{css}`); 
  eleventyConfig.addWatchTarget(`${INPUT_DIR}/assets/**/*.{js,svg,png,jpeg}`);
  
  // set library for markdown
  eleventyConfig.setLibrary("md", markdownParser);

  // add plugins
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.cssConfig);
  eleventyConfig.addPlugin(plugins.jsConfig);

  // add shortcodes
  eleventyConfig.addShortcode('svg', shortcodes.svg);
  eleventyConfig.addShortcode('video', shortcodes.video);
  eleventyConfig.addShortcode('figure', shortcodes.figure);
  eleventyConfig.addShortcode('embeddedvideo', shortcodes.embeddedVideo);
  eleventyConfig.addShortcode('note', shortcodes.noteShortcode);
  
  // add filters
  eleventyConfig.addFilter('contains', filters.contains);
  eleventyConfig.addFilter('split', filters.split);
  eleventyConfig.addFilter('map', filters.map);
  eleventyConfig.addFilter('readDir', filters.readDir);

  // add tags
  tags.addMarkdownTag(eleventyConfig);

  // add global data
  globaldata(eleventyConfig);

  // add bundles
  eleventyConfig.addBundle("css", {hoist: true});
  eleventyConfig.addBundle("jsBundle");
  eleventyConfig.addBundle("jsPage");

  // copy assets
  eleventyConfig.addPassthroughCopy({ "src/assets/favicon": "favicon" });
  eleventyConfig.addPassthroughCopy('src/assets/img');
  eleventyConfig.addPassthroughCopy('src/assets/video');
  eleventyConfig.addPassthroughCopy('src/docs');

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