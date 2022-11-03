import MarkdownIt from "markdown-it";

export const md = new MarkdownIt({
  breaks: true,
  html: true,
  linkify: true,
  typographer: true,
});

md.renderer.rules.table_open = () => '<table class="table">';
