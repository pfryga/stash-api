'use strict';

var _ = require('lodash'),
    utils = require('../utils');

module.exports.Branch = Branch;

function Branch (stashApi, projKey, repoSlug) {
    this.api = stashApi;
    this.projKey = projKey;
    this.repoSlug = repoSlug;
}

Branch.prototype.getOne = function getOne(opts) {
    return this.getMany(opts)[0];
};

Branch.prototype.getMany = function getMany(opts) {
    var queryUrl = '?';

    opts = _.merge({
        base: null,
        details: null,
        filterText: null,
        orderBy: null
    }, opts);

    // build the query string url
    if (opts.base) { queryUrl += 'base=' + encodeURIComponent(opts.base) + '&'; }
    if (opts.details) { queryUrl += 'details=' + encodeURIComponent(opts.details) + '&'; }
    if (opts.filterText) { queryUrl += 'filterText=' + encodeURIComponent(opts.filterText) + '&'; }
    if (opts.orderBy) { queryUrl += 'orderBy=' + encodeURIComponent(opts.orderBy); }

    // remove any strangling ampersand symbols
    queryUrl.replace(/\&$/, '');

    // if we only have the '?', then no options were specified
    if (queryUrl === '?') { queryUrl = ''; }

    // make the response
    return utils.ensureJsonResponse(request.getAsync(this.api.buildUrl('/projects/' + this.projKey + '/repos/' + this.repoSlug + '/branches' + queryUrl)));
};

Branch.prototype.getDefault = function getDefault () {
    return utils.ensureJsonResponse(request.getAsync(this.api.buildUrl('/projects/' + this.projKey + '/repos/' + this.repoSlug + '/branches/default')));
};