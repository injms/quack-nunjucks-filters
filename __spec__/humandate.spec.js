/* eslint-env mocha */
const { expect, assert } = require('chai')

const nunjucks = require('nunjucks')

const humandate = require('../filters/humandate')

describe('the `humandate`', function () {
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

  describe('function', function () {
    describe('returns en-GB human readable date for a', function () {
      it('Unix timestamp', function () {
        const test = humandate(1592942878800)
        const expected = '23 June 2020'

        expect(test).to.equal(expected)
      })

      it('full ISO 8061 string', function () {
        const test = humandate('2020-06-23T20:07:58.800Z')
        const expected = '23 June 2020'

        expect(test).to.equal(expected)
      })

      it('shorter ISO 8061 string', function () {
        const test = humandate('2020-06-23T20:07')
        const expected = '23 June 2020'

        expect(test).to.equal(expected)
      })

      it('shortest ISO 8061 string', function () {
        const test = humandate('2020-06-23')
        const expected = '23 June 2020'

        expect(test).to.equal(expected)
      })

      it('en-US string', function () {
        const test = humandate('June 23, 2020')
        const expected = '23 June 2020'

        expect(test).to.equal(expected)
      })

      it('en-US string and time zone', function () {
        const test = humandate('June 23, 2020 GMT+1')
        const expected = '23 June 2020'

        expect(test).to.equal(expected)
      })

      it('en-GB string', function () {
        const test = humandate('23 June 2020')
        const expected = '23 June 2020'

        expect(test).to.equal(expected)
      })

      it('en-GB string and time zone', function () {
        const test = humandate('23 June 2020 GMT+1')
        const expected = '23 June 2020'

        expect(test).to.equal(expected)
      })
    })

    describe('returns appropriate date when the locale is set to', function () {
      it('nothing', function () {
        const test = humandate('23 June 2020 GMT+1', undefined)
        const expected = '23 June 2020'

        expect(test).to.equal(expected)
      })

      it('a language', function () {
        const test = humandate('23 June 2020 GMT+1', 'pt')
        const expected = '23 de junho de 2020'

        expect(test).to.equal(expected)
      })

      it('a language and a location', function () {
        const test = humandate('23 June 2020 GMT+1', 'es-HN')
        const expected = '23 de junio de 2020'

        expect(test).to.equal(expected)
      })
    })

    describe('should throw an error when', function () {
      it('incorrect parameters given', function () {
        assert.throws(
          function () {
            humandate('Jam sandwich')
          },
          Error,
          'Date could not be parsed.',
        )
      })

      it('no parameters given', function () {
        assert.throws(
          function () {
            humandate()
          },
          Error,
          'No date parameter.',
        )
      })

      it('no date string is given', function () {
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
  })
  describe('filter', function () {
    let env

    before(function () {
      env = new nunjucks.Environment()
      env.addFilter('humandate', (datestring, locale) => humandate(datestring, locale))
    })

    describe('returns en-GB human readable date for a', function () {
      it('Unix timestamp', function () {
        const test = env.renderString(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              {{ date | humandate }}
            </body>
          </html>
          `, { date: 1592942878800 })

        const expected = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              23 June 2020
            </body>
          </html>
          `

        expect(test).to.equal(expected)
      })

      it('full ISO 8061 string', function () {
        const test = env.renderString(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              {{ date | humandate }}
            </body>
          </html>
          `, { date: '2020-02-09T20:07:58.800Z' })

        const expected = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              9 February 2020
            </body>
          </html>
          `

        expect(test).to.equal(expected)
      })

      it('shorter ISO 8061 string', function () {
        const test = env.renderString(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              {{ date | humandate }}
            </body>
          </html>
          `, { date: '2020-02-09T20:07' })

        const expected = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              9 February 2020
            </body>
          </html>
          `

        expect(test).to.equal(expected)
      })

      it('shortest ISO 8061 string', function () {
        const test = env.renderString(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              {{ date | humandate }}
            </body>
          </html>
          `, { date: '2020-02-09' })

        const expected = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              9 February 2020
            </body>
          </html>
          `

        expect(test).to.equal(expected)
      })

      it('en-US string', function () {
        const test = env.renderString(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              {{ date | humandate }}
            </body>
          </html>
          `, { date: 'February 9, 2020' })

        const expected = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              9 February 2020
            </body>
          </html>
          `

        expect(test).to.equal(expected)
      })

      it('en-US string and time zone', function () {
        const test = env.renderString(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              {{ date | humandate }}
            </body>
          </html>
          `, { date: 'February 9, 2020 GMT' })

        const expected = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              9 February 2020
            </body>
          </html>
          `

        expect(test).to.equal(expected)
      })

      it('en-GB string', function () {
        const test = env.renderString(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              {{ date | humandate }}
            </body>
          </html>
          `, { date: '9 February 2020' })

        const expected = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              9 February 2020
            </body>
          </html>
          `

        expect(test).to.equal(expected)
      })

      it('en-GB string and time zone', function () {
        const test = env.renderString(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              {{ date | humandate }}
            </body>
          </html>
          `, { date: '9 February 2020 GMT' })

        const expected = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              9 February 2020
            </body>
          </html>
          `

        expect(test).to.equal(expected)
      })
    })

    describe('returns appropriate date when the locale is set to', function () {
      it('nothing', function () {
        const test = env.renderString(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              {{ date | humandate(locale) }}
            </body>
          </html>
          `, { date: '9 February 2020 GMT', locale: undefined })

        const expected = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              9 February 2020
            </body>
          </html>
          `

        expect(test).to.equal(expected)
      })

      it('a language', function () {
        const test = env.renderString(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              {{ date | humandate(locale) }}
            </body>
          </html>
          `, { date: '9 February 2020 GMT', locale: 'pt' })

        const expected = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              9 de fevereiro de 2020
            </body>
          </html>
          `

        expect(test).to.equal(expected)
      })

      it('a language and a location', function () {
        const test = env.renderString(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              {{ date | humandate(locale) }}
            </body>
          </html>
          `, { date: '9 February 2020 GMT', locale: 'es-HN' })

        const expected = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              9 de febrero de 2020
            </body>
          </html>
          `

        expect(test).to.equal(expected)
      })
    })

    describe('should throw an error when', function () {
      it('incorrect parameters given', function () {
        assert.throws(
          function () {
            env.renderString(`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
              </head>
              <body>
                {{ date | humandate }}
              </body>
            </html>
            `, { date: 'Jam sandwich' })
          },
          Error,
          'Date could not be parsed.',
        )
      })

      it('no parameters given', function () {
        assert.throws(
          function () {
            env.renderString(`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
              </head>
              <body>
                {{ date | humandate }}
              </body>
            </html>
            `, { date: '' })
          },
          Error,
          'Date could not be parsed.',
        )
      })

      it('no date string is given', function () {
        assert.throws(
          function () {
            env.renderString(`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
              </head>
              <body>
                {{ date | humandate }}
              </body>
            </html>
            `, { date: undefined })
          },
          Error,
          'No date parameter.',
        )
      })
    })
  })
})

/*

parses using a:
  unix timestamp - 1592942878800
  full ISO8061 string: 2020-06-23T20:07:58.800Z
  slightly shorter ISO8061 string: 2020-06-23T20:07
  shortest ISO 8061 YYYY-MM-DD string: 2020-06-23
  en-US string
    without time zone: June 23, 2020 BST
    with time zone: June 23, 2020
  en-GB string
    without time zone: 23 June 2020 BST
    with time zone: 23 June 2020
  pt string
    without time zone: 23 de junho de 2020 BST
    with time zone: 23 de junho de 2020
  es-HN string
    without time zone: 23 de junio de 2020 BST
    with time zone: 23 de junio de 2020

*

locale blank
language given: pt
language and locale given: es-HN

throw on:
  nonsense string: "jam sandwich"
  no string

*/
