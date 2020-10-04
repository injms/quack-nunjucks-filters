/**
 * @param  {String} date ISO 8061 date time string.
 * @param  {String} format "iso" for ISO 8061, "human" for '22nd July 2020'
 * @return {String} date in format asked by `format` parameter
 */
const formatDate = ({ date, format = 'human', locale = 'en-GB' }) => {
  if (typeof date === 'undefined') {
    throw new Error('No date parameter.')
  }

  try {
    const parsedDate = new Date(date)

    switch (format) {
    case 'iso':
      return parsedDate.toISOString()
    case 'human':
      return parsedDate.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = formatDate
