/**
 * @param  {String} date string that can be parsed by Date.parse()
 * @return {String} Date written in as ISO8061 string.
 */
const isoDate = (date) => {
  if (typeof date === 'undefined') {
    throw new Error('No date parameter.')
  }

  const parsedDate = new Date(date)

  // If the date object is invalid it will return 'NaN' on getTime().
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error('Date could not be parsed.')
  }

  return parsedDate.toISOString()
}

module.exports = isoDate
