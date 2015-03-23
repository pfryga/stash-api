'use strict';

module.exports.StashApi = require('./stash').StashApi;

module.exports.models = {};
module.exports.models.PullRequest = require('./models/pull-request').PullRequest;