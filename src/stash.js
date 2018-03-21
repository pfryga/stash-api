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

function StashApi (protocol, server, port, username, password) {
    this.baseUrl = protocol + '://' + encodeURIComponent(username) + ':' + encodeURIComponent(password) + '@' + server + ':' + port;
    this.apiUrl = '/rest/api/1.0'
}

// PROJECTS
StashApi.prototype.getProjects = function getProjects () {
    return utils.ensureJsonResponse(request.getAsync(this.buildUrl('/projects')));
};

// REPOS
StashApi.prototype.getRepos = function getRepos (projKey) {
    return utils.ensureJsonResponse(request.getAsync(this.buildUrl('/projects/' + projKey + '/repos')));
};

// BRANCHES
StashApi.prototype.getBranches = function getBranches (projKey, repoSlug, filterText) {
    var queryString = '';
    if (filterText) { queryString += '?filterText' + encodeURIComponent(filterText); }
    return utils.ensureJsonResponse(request.getAsync(this.buildUrl('/projects/' + projKey + '/repos/' + repoSlug + '/branches' + queryString)));
};

StashApi.prototype.getDefaultBranch = function getDefaultBranch (projKey, repoSlug) {
    return utils.ensureJsonResponse(request.getAsync(this.buildUrl('/projects/' + projKey + '/repos/' + repoSlug + '/branches/default')));
};

// COMMITS
StashApi.prototype.getCommit = function getCommits (projKey, repoSlug, commitId) {
    return utils.ensureJsonResponse(request.getAsync(this.buildUrl('/projects/' + projKey + '/repos/' + repoSlug + '/commits/' + commitId)));
}

// PULL REQUESTS
StashApi.prototype.getPullRequests = function getCommits (projKey, repoSlug) {
    return utils.ensureJsonResponse(request.getAsync(this.buildUrl('/projects/' + projKey + '/repos/' + repoSlug + '/pull-requests')));
}

StashApi.prototype.getPullRequest = function getCommits (projKey, repoSlug, prId) {
    return utils.ensureJsonResponse(request.getAsync(this.buildUrl('/projects/' + projKey + '/repos/' + repoSlug + '/pull-requests/' + prId)));
}

StashApi.prototype.approvePullRequest = function approvePullRequest (projKey, repoSlug, pullRequestId) {
    var options = _.cloneDeep(defaultOptions);
    options.url = this.buildUrl('/projects/' + projKey + '/repos/' + repoSlug + '/pull-requests/' + pullRequestId + '/approve');
    return utils.ensureJsonResponse(request.postAsync(options));
}

StashApi.prototype.createPullRequest = function createPullRequest (projKey, repoSlug, pr) {
    var options = _.cloneDeep(defaultOptions),
        json = pr.toPostJsonString();
    options.url = this.buildUrl('/projects/' + projKey + '/repos/' + repoSlug + '/pull-requests');
    options.body = json;
    options.headers['Content-Length'] = Buffer.byteLength(json, 'utf8');
    return utils.ensureJsonResponse(request.postAsync(options))
};

// GROUPS
StashApi.prototype.getGroupMembers = function getGroupMembers (queryParams) {
    var url = utils.addQueryParams(this.buildUrl('/admin/groups/more-members'), queryParams);
    return utils.ensureJsonResponse(request.getAsync(url));
};

// UTIL
StashApi.prototype.buildUrl = function (endpoint) {
    return this.baseUrl + this.apiUrl + endpoint;
};

// COMMENTS
StashApi.prototype.createPullRequestComment = function createPullRequestComment (projectKey, repositorySlug, pr, comment) {
    var body = JSON.stringify(comment);
    var options = _.cloneDeep(defaultOptions);
    options.url = this.buildUrl('/projects/' + projectKey + '/repos/' + repositorySlug + '/pull-requests/' + pr + '/comments' );
    options.body = body;
    options.headers['Content-Length'] = Buffer.byteLength(body, 'utf8');
    return utils.ensureJsonResponse(request.postAsync(options))
}
