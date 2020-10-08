/* eslint-env mocha */
const { expect } = require('chai')

const cssmin = require('../filters/cssmin')

describe('the `cssmin` function', function () {
  it('should return minifed CSS', function () {
    const css = `
      html {
        background: rgba(255, 0, 255, 1);
      }

      .thing {
        display: block;
        background: #ffcc00;
      }

      .other-thing {
        display: block;
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
    `
    const expected = 'html{background:#f0f}.thing{display:block;background:#fc0}.identical-thing,.other-thing{display:block;background:#fff}/*! Only important comments */'

    expect(cssmin(css)).to.equal(expected)
  })
})
