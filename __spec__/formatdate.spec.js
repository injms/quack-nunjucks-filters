/* eslint-env mocha */
const { expect, assert } = require('chai')

const formatdate = require('../filters/formatdate')

describe('formatdate filter', function () {
  it('should return the date in ISO 8061 format', function () {
    const test = formatdate({
      date: '2020-06-23T20:07:58.800Z',
      format: 'iso',
    })
    const expected = '2020-06-23T20:07:58.800Z'

    expect(test).to.be.equal(expected)
  })

  it('should return a en-GB human readable date when only the date is supplied', function () {
    const test = formatdate({
      date: '2020-06-23T20:07:58.800Z',
    })

    const expected = '23 June 2020'

    expect(test).to.be.equal(expected)
  })

  it('should return a en-GB human readable date when the date and format is supplied', function () {
    const test = formatdate({
      date: '2020-06-23T20:07:58.800Z',
      format: 'human',
    })
    const expected = '23 June 2020'

    expect(test).to.be.equal(expected)
  })

  it('should return a human readable date with a langauge and locale supplied', function () {
    const test = formatdate({
      date: '2020-06-23T20:07:58.800Z',
      format: 'human',
      locale: 'es-HN',
    })
    const expected = '23 de junio de 2020'

    expect(test).to.be.equal(expected)
  })

  it('should return a human readable date when a langauge supplied', function () {
    const test = formatdate({
      date: '2020-06-23T20:07:58.800Z',
      format: 'human',
      locale: 'pt',
    })
    const expected = '23 de junho de 2020'

    expect(test).to.be.equal(expected)
  })

  it('should throw an error if no object given', function () {
    assert.throw(
      function () { formatdate() },
      Error,
      'Cannot destructure property \'date\' of \'undefined\' as it is undefined.',
    )
  })

  it('should throw an error if given an empty object', function () {
    assert.throw(
      function () { formatdate({}) },
      Error,
      'No date parameter.',
    )
  })

  it('should throw an error if no date string is given', function () {
    let testDateString // undefined

    assert.throw(
      function () {
        formatdate({
          date: testDateString,
          format: 'human',
        })
      },
      Error,
      'No date parameter.',
    )
  })
})
