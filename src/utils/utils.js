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

/**
 * Add orderBy statement without going through many checking
 * @param {object} query Knex query object
 * @param {array} availableFields query-able fields
 * @param {array} fields fields to query
 * @param {string} order order - asc or desc
 */
const addOrderBy = (query, availableFields = [], fields = [], order = 'asc') => {
  if (fields && fields.length > 0) {
    let sortParams;
    if (_.includes(fields, ',')) {
      sortParams = _.intersection(fields.split(','), availableFields);
    } else {
      sortParams = _.intersection([fields], availableFields);
    }
    if (sortParams && sortParams.length > 0) {
      return _.reduce(sortParams, (acc, param) => acc.orderBy(param, order), query);
    }
  } else if (_.includes(availableFields, 'id')) {
    return query.orderBy('id', order);
  }
  return query;
};

module.exports = {
  clone,
  parseQueryParams,
  addOrderBy,
};
