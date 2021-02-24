/* eslint-env mocha */
const { expect, assert } = require('chai')

const nunjucks = require('nunjucks')

const { addattribute } = require('../index')

const stubs = {
  string: {
    given: 'This is a string',
    expected: '<span hreflang="en-gb">This is a string</span>',
  },
  element: {
    given: nunjucks.runtime.markSafe('<a href="https://example.com">This is a link</a>'),
    expected: '<a href="https://example.com" id="added-id">This is a link</a>',
  },
  addClass: {
    given: nunjucks.runtime.markSafe('<p class="existing-class">This is a paragraph</p>'),
    expected: '<p class="existing-class added-class">This is a paragraph</p>',
  },
  noContent: {
    given: nunjucks.runtime.markSafe('<p>This is a paragraph</p>'),
    expected: '<p data-test-property="true">This is a paragraph</p>',
  },
}

describe('the `addattribute`', function () {
  describe('function', function () {
    it('should return a `span` when given a string', function () {
      const { val } = addattribute({
        element: stubs.string.given,
        attribute: 'hreflang',
        content: 'en-gb',
      })
      expect(val).to.equal(stubs.string.expected)
    })

    it('should return the element with the extra attribute', function () {
      const { val } = addattribute({
        element: stubs.element.given,
        attribute: 'id',
        content: 'added-id',
      })
      expect(val).to.equal(stubs.element.expected)
    })

    it('should add to existing classes', function () {
      const { val } = addattribute({
        element: stubs.addClass.given,
        attribute: 'class',
        content: 'added-class',
      })
      expect(val).to.equal(stubs.addClass.expected)
    })

    it('defaults to true when no attribute content present', function () {
      const { val } = addattribute({
        element: stubs.noContent.given,
        attribute: 'data-test-property',
      })
      expect(val).to.equal(stubs.noContent.expected)
    })

    it('should fail when no attribute given', function () {
      assert.throws(
        function () {
          addattribute({
            element: stubs.addClass.given,
          })
        },
        Error,
        'No attribute parameter given.',
      )
    })
  })

  describe('filter', function () {
    it('should return a `span` with a class when given a string', function () {
      const env = new nunjucks.Environment()

      env.addFilter('addclass', (element, classname) => {
        return addattribute({ element, attribute: 'class', content: classname })
      })

      const test = env.renderString(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            {{ 'example' | addclass('added-class') }}
          </body>
        </html>
        `)

      const expected = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <span class="added-class">example</span>
          </body>
        </html>
        `

      expect(test).to.equal(expected)
    })

    it('can be chained multiple times', function () {
      const env = new nunjucks.Environment()

      env.addFilter('addclass', (element, classname) => {
        return addattribute({ element, attribute: 'class', content: classname })
      })

      const test = env.renderString(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            {{ 'example' | addclass('added-class') | addclass('more-added-class even-more-class') | addclass('classier') }}
          </body>
        </html>
        `)

      const expected = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <span class="added-class more-added-class even-more-class classier">example</span>
          </body>
        </html>
        `

      expect(test).to.equal(expected)
    })
  })
})
