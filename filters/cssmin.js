const CleanCSS = require('clean-css')

const options = {
  level: 2,
}

const cssmin = (code) => new CleanCSS(options).minify(code).styles

module.exports = cssmin
