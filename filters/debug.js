/**
 * @param  {any} thing The thing that you want to log.
 * @return  {any} The unaltered thing back.
 */
const debug = (thing) => {
  console.log(JSON.stringify(thing))
  return thing
}

module.exports = debug
