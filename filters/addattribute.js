const { load, html } = require('cheerio')
const { runtime: { markSafe } } = require('nunjucks')

/**
 * @param  {string | Object} element - text or Nunjucks marksafe object
 * @param  {string} attribute - attribute to be added to element
 * @param {string | boolean} content - attribute content to be added
 * @return  {Object} A Nunjucks object that is marked as safe.
 */
const addattribute = ({
  element,
  attribute,
  content = true,
}) => {
  if (!element) throw new Error('No element parameter given.')
  if (!attribute) throw new Error('No attribute parameter given.')

  // If the element is just a string we need to wrap it in a span so we actually
  // add an attribute to something.
  const wrappedElement = typeof element === 'string'
    ? `<span>${element}</span>`
    : element.val

  const $ = load(
    wrappedElement,
    null,
    false, // `false` to stop this being wrapped in `html` and `body` elements.
  )

  const elementWithAttribute = $(':root')
    .attr(attribute, (_i, val) => {
      return [val, content].filter(x => !!x).join(' ')
    })

  return markSafe(html(elementWithAttribute))
}

module.exports = addattribute
