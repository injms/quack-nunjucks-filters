/* eslint-env mocha */
const { expect, assert } = require('chai')

const isodate = require('../filters/isodate')

describe('the `isodate` function', function () {
  it('should return the date in ISO 8061 format if given ISO8061 format', function () {
    const test = isodate('2020-06-23T20:07:58.800Z')
    const expected = '2020-06-23T20:07:58.800Z'

    expect(test).to.equal(expected)
  })

  it('should throw an error if no parameters given', function () {
    assert.throws(
      function () {
        isodate()
      },
      Error,
      'No date parameter.',
    )
  })

  it('should throw an error if date is undefined', function () {
    let testDateString // undefined

    assert.throws(
      function () {
        isodate(testDateString)
      },
      Error,
      'No date parameter.',
    )
  })
})
