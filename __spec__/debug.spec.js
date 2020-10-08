/* eslint-env mocha */
const { expect } = require('chai')

const sinon = require('sinon')

const debug = require('../filters/debug')

describe('the `debug` function', function () {
  before(function () {
    this.sinon = sinon.createSandbox()
  })

  beforeEach(function () {
    this.sinon.restore()
    this.sinon.stub(console, 'log')
  })

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
