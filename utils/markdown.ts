import MarkdownIt from "markdown-it";

export const md = new MarkdownIt({
  breaks: true,
  html: true,
  linkify: true,
  typographer: true,
});

// Set default class for tables
md.renderer.rules.table_open = () => '<table class="table table-responsive">';

// Set default class for images and add base URL if the path is relative
const defaultImageRenderer = (md.renderer.rules.image as Function)
md.renderer.rules.image = (tokens, idx, options, env, self) => {
  tokens[idx].attrJoin('class', 'img-fluid')

  const src = tokens[idx].attrGet('src')
  if (src?.startsWith('/')) {
    tokens[idx].attrSet('src', `https://cms.brke.org${src}`)
  }

  return defaultImageRenderer(tokens, idx, options, env, self)
};
