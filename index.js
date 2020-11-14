const cssmin = require('./filters/cssmin')
const debug = require('./filters/debug')
const humandate = require('./filters/humandate')
const isodate = require('./filters/isodate')
const markdownify = require('./filters/markdownify')

module.exports = {
  cssmin,
  debug,
  humandate,
  isodate,
  markdownify,
}
