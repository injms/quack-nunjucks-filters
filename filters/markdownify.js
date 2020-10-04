const MarkdownIt = require('markdown-it')

const md = new MarkdownIt({
  html: true,

  // Enable some language-neutral replacement and quotes beautification.
  typographer: true,

  // Don't automatically link a thing that looks like URL.
  linkify: false,
})

module.exports = md
