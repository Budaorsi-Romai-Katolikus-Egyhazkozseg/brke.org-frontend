import MarkdownIt from "markdown-it";

export const md = new MarkdownIt({
  breaks: true,
  html: true,
  linkify: true,
  typographer: true,
});

// TODO: Make responsive! <div class="table-responsive">
md.renderer.rules.table_open = () => '<table class="table">';
