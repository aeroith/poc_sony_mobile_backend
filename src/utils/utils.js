const _ = require('lodash');


/**
 * Basic cloning for JSON-serializable plain types
 * @param {object} jsonValue
 */
const clone = jsonValue => JSON.parse(JSON.stringify(jsonValue));


/**
 * Convert string booleans into true booleans
 * @param {object} query
 */
const parseQueryParams = (query = {}) =>
  (function parse(obj) {
    _.entries(obj).forEach((entry) => {
      const [key, value] = entry;
      if (_.isPlainObject(value)) obj[key] = parse(value); // eslint-disable-line no-param-reassign
      else if (value === 'true') obj[key] = true; // eslint-disable-line no-param-reassign
      else if (value === 'false') obj[key] = false; // eslint-disable-line no-param-reassign
    });
    return obj;
  }(clone(query)));

module.exports = {
  clone,
  parseQueryParams,
};
