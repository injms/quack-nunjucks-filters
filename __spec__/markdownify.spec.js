/* eslint-env mocha */
const { expect } = require('chai')

const nunjucks = require('nunjucks')

const { markdownify } = require('../index')

// Yes, this looks like garbage - but whitespacing and newlines affect the
// output - so this needs to have no spacing on the left.
const stub = {
  markdown: `# Heading level one
## Heading level two

This is a test of the **markdown**, which is _nice_.

- test
- test
- test

---

> Quote

![alt-text](media/markdown.png "my title")

This is a [link](https://example.com).

Links can also be [relative](/info).

You can also add a [title](https://example.com "this is a title") to the link.

Links can be around images [![alt-text](media/markdown.png)](https://example.com)
`,
  expected: `<h1>Heading level one</h1>
<h2>Heading level two</h2>
<p>This is a test of the <strong>markdown</strong>, which is <em>nice</em>.</p>
<ul>
<li>test</li>
<li>test</li>
<li>test</li>
</ul>
<hr>
<blockquote>
<p>Quote</p>
</blockquote>
<p><img src="media/markdown.png" alt="alt-text" title="my title"></p>
<p>This is a <a href="https://example.com">link</a>.</p>
<p>Links can also be <a href="/info">relative</a>.</p>
<p>You can also add a <a href="https://example.com" title="this is a title">title</a> to the link.</p>
<p>Links can be around images <a href="https://example.com"><img src="media/markdown.png" alt="alt-text"></a></p>
`,
}

describe('the `markdownify`', function () {
  describe('function', function () {
    it('should return the correct HTML from Markdown', function () {
      expect(markdownify.render(stub.markdown)).to.equal(stub.expected)
    })
  })

  describe('filter', function () {
    let env

    before(function () {
      env = new nunjucks.Environment()
      env.addFilter('markdownify', (markdown) => markdownify.render(markdown))
    })

    it('should return the correct HTML from Markdown', function () {
      const test = env.renderString(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          {{ markdown | markdownify | safe }}
        </body>
      </html>
      `, { markdown: stub.markdown })

      const expected = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          ${stub.expected}
        </body>
      </html>
      `

      expect(test).to.equal(expected)
    })
  })
})
