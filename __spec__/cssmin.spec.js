/* eslint-env mocha */
const { expect } = require('chai')

const nunjucks = require('nunjucks')

const cssmin = require('../filters/cssmin')

const stubs = {
  css: `
    html {
      background: rgba(255, 0, 255, 1);
    }

    .thing {
      display: block;
      background: #ffcc00;
    }

    .other-thing {
      display: block;
      background: rgba(255, 255, 255, 1);
      background: #ffffff;
    }

    .identical-thing {
      display: block;
      background: #ffffff;
    }

    /* No comments or empty selectors please */
    p {

    }
    /*! Only important comments */
  `,
  expected: 'html{background:#f0f}.thing{display:block;background:#fc0}.identical-thing,.other-thing{display:block;background:#fff}/*! Only important comments */',
}

describe('the `cssmin`', function () {
  describe('function', function () {
    it('should return minifed CSS', function () {
      expect(cssmin(stubs.css)).to.equal(stubs.expected)
    })
  })

  describe('filter', function () {
    it('should correctly minify inline CSS in a template', function () {
      const env = new nunjucks.Environment()
      env.addFilter('cssmin', (css) => cssmin(css))

      const test = env.renderString(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            {%- set inline_css %}
              ${stubs.css}
            {% endset %}
            <style>
              {{ inline_css | cssmin | safe }}
            </style>
          </head>
          <body></body>
        </html>
        `)

      const expected = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              ${stubs.expected}
            </style>
          </head>
          <body></body>
        </html>
        `

      expect(test).to.equal(expected)
    })
  })
})
