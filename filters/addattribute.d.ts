export = addattribute;
/**
 * @param  {string | Object} element - text or Nunjucks marksafe object
 * @param  {string} attribute - attribute to be added to element
 * @param {string | boolean} content - attribute content to be added
 * @return  {Object} A Nunjucks object that is marked as safe.
 */
declare function addattribute({ element, attribute, content, }: string | any): any;
