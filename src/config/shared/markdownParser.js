
import markdownIt from "markdown-it";

const markdownParser = markdownIt({ html: true, linkify: true });

export default markdownParser;