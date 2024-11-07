import esbuild from 'esbuild';
import path from 'node:path';

const INPUT_SCRIPTS_DIR = "./src/assets/js"
const OUTPUT_BUNDLE_DIR = "./src/includes/_js"

const jsConfig = eleventyConfig => {
  eleventyConfig.addTemplateFormats('js');

  eleventyConfig.addExtension('js', {
    outputFileExtension: 'js',
    compile: async (content, inputPath) => {
      // Skip processing if not in the designated scripts directories
      if (!inputPath.startsWith(INPUT_SCRIPTS_DIR)) {
        return;
      }

      // Inline scripts processing
      if (inputPath.startsWith(`${INPUT_SCRIPTS_DIR}/bundle/`)) {
        const filename = path.basename(inputPath);
        const outputFilename = filename;
        const outputPath = `${OUTPUT_BUNDLE_DIR}/${outputFilename}`;

        await esbuild.build({
          target: 'es2020',
          entryPoints: [inputPath],
          outfile: outputPath,
          bundle: true,
          minify: true
        });
        return;
      }

    }
  });
}

export default jsConfig;