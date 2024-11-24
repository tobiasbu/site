// by Chris Burnell: https://chrisburnell.com/article/some-eleventy-filters/#markdown-format

import markdownParser from "../shared/markdownParser.js";

function Markdown(nunjucksEngine) {
  this.tags = ["markdown"];

  this.parse = function (parser, nodes, lexer) {
    // get the tag token
    const tok = parser.nextToken();

    // parse the args and move after the block end. passing true
    // as the second arg is required if there are no parentheses
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    // If arguments, return the fileTag constructed node
    if(args.children.length > 0) {
      return new nodes.CallExtension(this, 'varTag', args);
    }

    // Otherwise parse until the close block and move the parser to the next position
    var body = parser.parseUntilBlocks('endmarkdown');

    parser.advanceAfterBlockEnd();

    return new nodes.CallExtension(this, "blockTag", args, [body]);
  };

  // Markdown rendering for the block. Pretty simple, just get the body text and pass
  // it through the markdown renderer.
  this.blockTag = function(context, body) {
    const result = new nunjucksEngine.runtime.SafeString(markdownParser.render(body()));
    return result;
  }

  this.varTag = function(context, line) {
    return new nunjucksEngine.runtime.SafeString(markdownParser.renderInline(line));
  }
};

// Usage: {% markdown myVar %} where myVar has a value of "one-line"
// Usage: {% markdown "one-line" %}
// Usage: {% markdown %} ... {% endmarkdown %}
export default function addMarkdownTag(eleventyConfig) {
  eleventyConfig.addNunjucksTag("markdown", (nunjucksEngine) => new Markdown(nunjucksEngine));
}

