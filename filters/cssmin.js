const CleanCSS = require('clean-css')

const options = {
  level: 2,
}

/**
 * @param  {string} code Unminified CSS
 * @return  {string} Minified CSS
 */
const cssmin = (code) => new CleanCSS(options).minify(code).styles

module.exports = cssmin
