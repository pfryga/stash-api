var _ = require('lodash');

// API
module.exports.ensureJsonResponse = ensureJsonResponse;
module.exports.addQueryParams = addQueryParams;

// IMPLEMENTATIONS
/**
 * Ensure that a javascript object is returned instead of a JSON string
 * @param  {promise} promise    - the request promise
 * @return {promise}            - promise with [response, body] where body is a javascript object.
 */
function ensureJsonResponse (promise) {
    return promise
    .spread(function (response, body) {
        if (body && typeof body === 'string') {
            body = JSON.parse(body);
        }
        return [response, body];
    });
}

/**
 * Add any number of query parameters to a GET url
 * @param {string} url      - the original url
 * @param {object} params   - query params to add to the url.
 * @return {string}         - the full url with possible query parameters
 */
function addQueryParams (url, params) {
    var resultUrl = url,
        query = '';

    // quick exit when not passed params
    if (!params || params.length === 0) {
        return url;
    }

    _.forOwn(params, function (v, k) {
        if (v && k) {
            query += encodeURIComponent(k) + '=' + encodeURIComponent(v) + '&';
        }
    });

    if (query) {
        resultUrl += '?' + query.replace(/&$/, '');
    }

    return resultUrl;
}