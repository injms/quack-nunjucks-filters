/* eslint-env mocha */
const { expect, assert } = require('chai')

const nunjucks = require('nunjucks')

const { isodate } = require('../index')

describe('the `isodate`', function () {
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
    describe('returns the date in ISO 8061 format for', function () {
      it('full ISO 8061 format', function () {
        const test = isodate('2020-06-23T20:07:58.800Z')
        const expected = '2020-06-23T20:07:58.800Z'

        expect(test).to.equal(expected)
      })

      it('shorter ISO 8061 format', function () {
        const test = isodate('2020-06-23T20:07')
        const expected = '2020-06-23T19:07:00.000Z' // ∵ daylight savings & no time zone given

        expect(test).to.equal(expected)
      })

      it('shortest ISO 8061 format', function () {
        const test = isodate('2020-06-23')
        const expected = '2020-06-23T00:00:00.000Z'

        expect(test).to.equal(expected)
      })

      it('in en-US format', function () {
        const test = isodate('December 23, 2020')
        const expected = '2020-12-23T00:00:00.000Z'

        expect(test).to.equal(expected)
      })

      it('in en-GB format', function () {
        const test = isodate('23 December 2020')
        const expected = '2020-12-23T00:00:00.000Z'

        expect(test).to.equal(expected)
      })

      it('in en-GB format (daylight savings)', function () {
        const test = isodate('23 June 2020')
        const expected = '2020-06-22T23:00:00.000Z'

        expect(test).to.equal(expected)
      })

      it('when given in en-GB format with a timezone', function () {
        const test = isodate('23 June 2020 UTC-12')
        const expected = '2020-06-23T12:00:00.000Z'

        expect(test).to.equal(expected)
      })
    })

    describe('should throw an error when', function () {
      it('non-date given', function () {
        assert.throws(
          function () {
            isodate('Jam sandwich')
          },
          Error,
          'Date could not be parsed.',
        )
      })

      it('no parameters given', function () {
        assert.throws(
          function () {
            isodate()
          },
          Error,
          'No date parameter.',
        )
      })

      it('date is undefined', function () {
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
  })

  describe('filter', function () {
    let env

    before(function () {
      env = new nunjucks.Environment()
      env.addFilter('isodate', (datestring) => isodate(datestring))
    })

    describe('returns the date in ISO 8061 format for', function () {
      it('full ISO 8061 format', function () {
        const test = env.renderString(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <time datetime="{{ date | isodate }}">23 June 2020</time>
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
            <time datetime="2020-06-23T20:07:58.800Z">23 June 2020</time>
          </body>
        </html>
        `

        expect(test).to.equal(expected)
      })

      it('shorter ISO 8061 format', function () {
        const test = env.renderString(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <time datetime="{{ date | isodate }}">23 June 2020</time>
          </body>
        </html>
        `, { date: '2020-06-23T00:00' })

        const expected = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <time datetime="2020-06-22T23:00:00.000Z">23 June 2020</time>
          </body>
        </html>
        `

        expect(test).to.equal(expected)
      })

      it('shortest ISO 8061 format', function () {
        const test = env.renderString(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <time datetime="{{ date | isodate }}">23 June 2020</time>
          </body>
        </html>
        `, { date: '2020-06-23' })

        const expected = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <time datetime="2020-06-23T00:00:00.000Z">23 June 2020</time>
          </body>
        </html>
        `

        expect(test).to.equal(expected)
      })

      it('in en-US format', function () {
        const test = env.renderString(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <time datetime="{{ date | isodate }}">23 June 2020</time>
          </body>
        </html>
        `, { date: 'July 23, 2020' })

        const expected = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <time datetime="2020-07-22T23:00:00.000Z">23 June 2020</time>
          </body>
        </html>
        `

        expect(test).to.equal(expected)
      })

      it('in en-GB format', function () {
        const test = env.renderString(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <time datetime="{{ date | isodate }}">{{ date }}</time>
          </body>
        </html>
        `, { date: '23 January 2020' })

        const expected = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <time datetime="2020-01-23T00:00:00.000Z">23 January 2020</time>
          </body>
        </html>
        `

        expect(test).to.equal(expected)
      })

      it('in en-GB format (daylight savings)', function () {
        const test = env.renderString(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <time datetime="{{ date | isodate }}">{{ date }}</time>
          </body>
        </html>
        `, { date: '23 June 2020' })

        const expected = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <time datetime="2020-06-22T23:00:00.000Z">23 June 2020</time>
          </body>
        </html>
        `

        expect(test).to.equal(expected)
      })

      it('when given in en-GB format with a timezone', function () {
        const test = env.renderString(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <time datetime="{{ date | isodate }}">23 June 2020</time>
          </body>
        </html>
        `, { date: '23 June 2020 GMT' })

        const expected = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <time datetime="2020-06-23T00:00:00.000Z">23 June 2020</time>
          </body>
        </html>
        `

        expect(test).to.equal(expected)
      })
    })

    describe('should throw an error when', function () {
      it('non-date given', function () {
        assert.throws(
          function () {
            env.renderString(`
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                </head>
                <body>
                  <time datetime="{{ date | isodate }}">23 June 2020</time>
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
                  <time datetime="{{ date | isodate }}">23 June 2020</time>
                </body>
              </html>
              `, { date: '' })
          },
          Error,
          'Date could not be parsed.',
        )
      })

      it('date is undefined', function () {
        assert.throws(
          function () {
            env.renderString(`
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                </head>
                <body>
                  <time datetime="{{ date | isodate }}">23 June 2020</time>
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
