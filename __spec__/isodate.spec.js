/* eslint-env mocha */
const { expect, assert } = require('chai')

const isodate = require('../filters/isodate')

describe('the `isodate` function', function () {
  const originalTimeZone = process.env.TZ

  before(function () {
    // Setting the time zone as otherwise it'll be parsed in the time zone
    // wherever this is run.
    process.env.TZ = 'Europe/London'
  })

  after(function () {
    // Restoring the original time zone.
    process.env.TZ = originalTimeZone
  })

  it('should return the date in ISO 8061 format if given ISO8061 format', function () {
    const test = isodate('2020-06-23T20:07:58.800Z')
    const expected = '2020-06-23T20:07:58.800Z'

    expect(test).to.equal(expected)
  })

  it('should return the date in ISO 8061 format if given in YYYY-MM-DD format', function () {
    const test = isodate('2020-06-23')
    const expected = '2020-06-23T00:00:00.000Z'

    expect(test).to.equal(expected)
  })

  it('should return the date in ISO 8061 format if given in en-US format', function () {
    const test = isodate('December 23, 2020')
    const expected = '2020-12-23T00:00:00.000Z'

    expect(test).to.equal(expected)
  })

  it('should return the date in ISO 8061 format if given in en-GB format', function () {
    const test = isodate('23 December 2020')
    const expected = '2020-12-23T00:00:00.000Z'

    expect(test).to.equal(expected)
  })

  it('should return the date in ISO 8061 format if given in en-GB format (daylight savings)', function () {
    const test = isodate('23 June 2020')
    const expected = '2020-06-22T23:00:00.000Z'

    expect(test).to.equal(expected)
  })

  it('should return the date in ISO 8061 format if given in en-GB format with a timezone', function () {
    const test = isodate('23 June 2020 UTC-12')
    const expected = '2020-06-23T12:00:00.000Z'

    expect(test).to.equal(expected)
  })

  it('should throw an error if non-date given', function () {
    assert.throws(
      function () {
        isodate('Jam sandwich')
      },
      Error,
      'Date could not be parsed.',
    )
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
