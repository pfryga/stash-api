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

StashApi.prototype.getProjects = function getProjects () {
    return request.getAsync(this.buildUrl('/projects'));
};

StashApi.prototype.getRepos = function getRepos (projKey) {
    return request.getAsync(this.buildUrl('/projects/' + projKey + '/repos'));
}

StashApi.prototype.getBranches = function getBranches (projKey, repoSlug) {
    return request.getAsync(this.buildUrl('/projects/' + projKey + '/repos/' + repoSlug + '/branches'));
}

StashApi.prototype.createPullRequest = function createPullRequest (projKey, repoSlug, pr) {
    var options = _.cloneDeep(defaultOptions),
        json = pr.toPostJsonString();
    options.url = this.buildUrl('/projects/' + projKey + '/repos/' + repoSlug + '/pull-requests');
    options.body = json;
    options.headers['Content-Length'] = Buffer.byteLength(json, 'utf8');
    return request.postAsync(options);
}

// TODO: finish
// StashApi.prototype.updatePullRequest = function updatePullRequest (projKey, repoSlug, pr) {
//     var options = _.cloneDeep(defaultOptions),
//         json = pr.toJsonString();
//     options.url = this.buildUrl('/projects/' + projKey + '/repos/' + repoSlug + '/pull-requests');
//     options.body = json;
//     options.headers['Content-Length'] = Buffer.byteLength(json, 'utf8');
//     return request.putAsync(options);
// }

StashApi.prototype.buildUrl = function (endpoint) {
    return this.baseUrl + this.apiUrl + endpoint;
}