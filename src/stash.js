'use strict';

var request = require('request'),
    Buffer = require('buffer').Buffer,
    _ = require('lodash'),
    Promise = require("bluebird"),
    request = Promise.promisifyAll(require("request")),
    utils = require('./utils'),
    defaultOptions = {
        url: '',
        body: '',
        headers: {
            'Content-Type': 'application/json'
        }
    };

module.exports.StashApi = StashApi;
module.exports.Project = require('./resources/project').Project;
module.exports.Branch = require('./resources/branch').Branch;

function StashApi (protocol, server, port, username, password) {
    this.baseUrl = protocol + '://' + username + ':' + password + '@' + server + ':' + port;
    this.apiUrl = '/rest/api/1.0'
}

// REPOS
StashApi.prototype.getRepos = function getRepos (projKey) {
    return utils.ensureJsonResponse(request.getAsync(this.buildUrl('/projects/' + projKey + '/repos')));
}

// PULL REQUESTS
StashApi.prototype.createPullRequest = function createPullRequest (projKey, repoSlug, pr) {
    var options = _.cloneDeep(defaultOptions),
        json = pr.toPostJsonString();
    options.url = this.buildUrl('/projects/' + projKey + '/repos/' + repoSlug + '/pull-requests');
    options.body = json;
    options.headers['Content-Length'] = Buffer.byteLength(json, 'utf8');
    return utils.ensureJsonResponse(request.postAsync(options))
}

// GROUPS
StashApi.prototype.getGroupMembers = function getGroupMembers (queryParams) {
    var url = utils.addQueryParams(this.buildUrl('/admin/groups/more-members'), queryParams);
    return utils.ensureJsonResponse(request.getAsync(url));
}

// UTIL
StashApi.prototype.buildUrl = function (endpoint) {
    return this.baseUrl + this.apiUrl + endpoint;
}