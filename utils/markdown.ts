import MarkdownIt from 'markdown-it'

export const md = new MarkdownIt({
  breaks: true,
  html: true,
  linkify: true,
  typographer: true,
})

// Set default class for tables
md.renderer.rules.table_open = () =>
  ['<div class="table-responsive">', '<table class="table">'].join('\n')
md.renderer.rules.table_close = () => ['</table>', '</div>'].join('\n')

// Set default class for images and add base URL if the path is relative
const defaultImageRenderer = md.renderer.rules.image as Function
md.renderer.rules.image = (tokens, idx, options, env, self) => {
  tokens[idx].attrJoin('class', 'img-fluid')

  const src = tokens[idx].attrGet('src')
  if (src?.startsWith('/')) {
    tokens[idx].attrSet('src', cmsURL + src)
  }

  return defaultImageRenderer(tokens, idx, options, env, self)
}
