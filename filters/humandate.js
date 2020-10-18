/**
 * @param  {String} date Date or datetime string that can be used by `Date.parse()`
 * @param  {String} locale Valid BCP47 string. Defaults to en-GB.
 * @return {String} Date written in locale given
 */

const humanDate = (date, locale = 'en-GB') => {
  if (typeof date === 'undefined') {
    throw new Error('No date parameter.')
  }

  const parsedDate = new Date(date)

  // If the date object is invalid it will return 'NaN' on getTime().
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error('Date could not be parsed.')
  }

  return parsedDate.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

module.exports = humanDate
