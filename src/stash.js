'use strict';

var request = require('request'),
    Buffer = require('buffer').Buffer,
    _ = require('lodash'),
    Promise = require("bluebird"),
    request = Promise.promisifyAll(require("request")),
    defaultOptions = {
        url: '',
        body: '',
        headers: {
            'Content-Type': 'application/json'
        }
    };

module.exports.StashApi = StashApi;

function StashApi (protocol, server, port, username, password) {
    this.baseUrl = protocol + '://' + username + ':' + password + '@' + server + ':' + port;
    this.apiUrl = '/rest/api/1.0'
}

// PROJECTS
StashApi.prototype.getProjects = function getProjects () {
    return ensureJsonResponse(request.getAsync(this.buildUrl('/projects')));
};

// REPOS
StashApi.prototype.getRepos = function getRepos (projKey) {
    return ensureJsonResponse(request.getAsync(this.buildUrl('/projects/' + projKey + '/repos')));
}

// BRANCHES
StashApi.prototype.getBranches = function getBranches (projKey, repoSlug) {
    return ensureJsonResponse(request.getAsync(this.buildUrl('/projects/' + projKey + '/repos/' + repoSlug + '/branches')));
}

StashApi.prototype.getDefaultBranch = function getDefaultBranch (projKey, repoSlug) {
    return ensureJsonResponse(request.getAsync(this.buildUrl('/projects/' + projKey + '/repos/' + repoSlug + '/branches/default')));
}

// PULL REQUESTS
StashApi.prototype.createPullRequest = function createPullRequest (projKey, repoSlug, pr) {
    var options = _.cloneDeep(defaultOptions),
        json = pr.toPostJsonString();
    options.url = this.buildUrl('/projects/' + projKey + '/repos/' + repoSlug + '/pull-requests');
    options.body = json;
    options.headers['Content-Length'] = Buffer.byteLength(json, 'utf8');
    return ensureJsonResponse(request.postAsync(options))
}

// UTIL
StashApi.prototype.buildUrl = function (endpoint) {
    return this.baseUrl + this.apiUrl + endpoint;
}

function ensureJsonResponse (promise) {
    return promise
    .spread(function (response, body) {
        if (body && typeof body === 'string') {
            body = JSON.parse(body);
        }
        return [response, body];
    });
}