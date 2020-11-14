/* eslint-env mocha */
const { expect } = require('chai')
const sinon = require('sinon')

const nunjucks = require('nunjucks')

const { debug } = require('../index')

describe('the `debug`', function () {
  before(function () {
    this.sinon = sinon.createSandbox()
  })

  beforeEach(function () {
    this.sinon.stub(console, 'log')
  })

  afterEach(function () {
    this.sinon.restore()
  })

  describe('function', function () {
    it('calls console.log once', function () {
      debug({ example: true })

      expect(console.log.calledOnce).to.be.true
    })

    it('calls console.log with the correct string', function () {
      debug({ example: true })
      expect(console.log.calledWith('{"example":true}')).to.be.true

      debug(false)
      expect(console.log.calledWith('false')).to.be.true

      debug('example')
      expect(console.log.calledWith('"example"')).to.be.true
    })

    it('returns the debugged _thing_ unaltered', function () {
      // `{ marmalade: 'lemon' } === { marmalade: 'lemon' }` is false, as these
      // are different objects with the same content. So we should test to make
      // the exact same object is passed back.
      const test = { example: true }
      expect(debug(test)).to.equal(test)

      expect(debug('this is a string')).to.equal('this is a string')

      expect(debug(true)).to.equal(true)
    })
  })

  describe('filter', function () {
    let env

    beforeEach(function () {
      env = new nunjucks.Environment()
      env.addFilter('debug', (s) => debug(s))
    })

    it('calls console.log once', function () {
      env.renderString(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            {{ example | debug }}
          </body>
        </html>
        `, { example: 'This is an example' })

      expect(console.log.calledOnce).to.be.true
    })

    it('calls `console.log` with the correct string', function () {
      env.renderString(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            {{ example | debug }}
          </body>
        </html>
        `, { example: 'This is an example' })

      expect(console.log.calledWith('"This is an example"')).to.be.true
    })

    it('returns the debugged _thing_ unaltered', function () {
      const test = env.renderString(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            {{ example | debug }}
          </body>
        </html>
        `, { example: 'This is an example' })

      const expected = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            This is an example
          </body>
        </html>
        `
      expect(expected).to.equal(test)
    })
  })
})
