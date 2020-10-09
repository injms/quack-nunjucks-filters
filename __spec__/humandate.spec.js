/* eslint-env mocha */
const { expect, assert } = require('chai')

const humandate = require('../filters/humandate')

describe('the `humandate` function', function () {
  it('should return a en-GB human readable date when date-only is supplied in en-US', function () {
    const test = humandate('June 23, 2020')
    const expected = '23 June 2020'

    expect(test).to.be.equal(expected)
  })

  it('should return a en-GB human readable date when the date-only is supplied in YYYY-MM-DD', function () {
    const test = humandate('2020-06-23')
    const expected = '23 June 2020'

    expect(test).to.be.equal(expected)
  })

  it('should return a en-GB human readable date when the exact date-ime is supplied', function () {
    const test = humandate('2020-06-23T20:07:58.800Z')
    const expected = '23 June 2020'

    expect(test).to.be.equal(expected)
  })

  it('should return a human readable date with a langauge and locale supplied', function () {
    const test = humandate('2020-06-23T20:07:58.800Z', { locale: 'es-HN' })
    const expected = '23 de junio de 2020'

    expect(test).to.be.equal(expected)
  })

  it('should return a human readable date when a langauge supplied', function () {
    const test = humandate('2020-06-23T20:07:58.800Z', { locale: 'pt' })
    const expected = '23 de junho de 2020'

    expect(test).to.be.equal(expected)
  })

  it('should throw an error if incorrect parameters given', function () {
    assert.throws(
      function () {
        humandate('Jam sandwich')
      },
      Error,
      'Date could not be parsed.',
    )
  })

  it('should throw an error if no parameters given', function () {
    assert.throws(
      function () {
        humandate()
      },
      Error,
      'No date parameter.',
    )
  })

  it('should throw an error if no date string is given', function () {
    let testDateString // undefined

    assert.throws(
      function () {
        humandate(testDateString)
      },
      Error,
      'No date parameter.',
    )
  })
})
