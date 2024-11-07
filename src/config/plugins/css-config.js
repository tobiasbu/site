import fs from 'node:fs/promises';
import path from 'node:path';

import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssCustomMedia from 'postcss-custom-media';
import postcssSimpleVars from 'postcss-simple-vars';
import postcssMixins from 'postcss-mixins';

const isProduction = process.env.ELEVENTY_ENV === 'production';

const INPUT_STYLES_DIR = "src/styles"
const OUTPUT_BUNDLE_DIR = "src/includes/_css"
const OUTPUT_STYLES_DIR = "dist"

const cssConfig = eleventyConfig => {
  eleventyConfig.addTemplateFormats('css');

  eleventyConfig.addExtension('css', {
    outputFileExtension: 'css',
    compileOptions: {
      permalink: false,
    },
    compile: async (inputContent, inputPath) => {
      const distPaths = [];
      if (inputPath.endsWith(`${INPUT_STYLES_DIR}/styles.css`)) {
        distPaths.push(`${isProduction ? OUTPUT_BUNDLE_DIR : OUTPUT_STYLES_DIR}/styles.css`);
      } else {
        return;
      }

      return async () => {
        let result = await postcss([
          postcssImport,
          postcssMixins,
          postcssSimpleVars,
          postcssCustomMedia,
          
          autoprefixer,
          cssnano
        ]).process(inputContent, {from: inputPath});

        // // Write the output to all specified paths
        for (const outputPath of distPaths) {
          await fs.mkdir(path.dirname(outputPath), {recursive: true});
          await fs.writeFile(outputPath, result.css);
        }

        return result.css;
      };
    }
  });
};

export default cssConfig;