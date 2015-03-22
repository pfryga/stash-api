'use strict';

var request = require('request'),
    fs = require('fs'),
    Promise = require("bluebird");
    request = Promise.promisifyAll(require("request"));

module.exports.StashApi = StashApi;

function StashApi (protocol, server, port, username, password) {
    this.baseUrl = protocol + '://' + username + ':' + password + '@' + server + ':' + port;
    this.apiUrl = '/rest/api/1.0'
    this.privateKeyData = fs.readFileSync(process.env['STASH_API_PRIVATE_KEY'], "utf8");
    this.oauth = null
}

StashApi.prototype.getProjects = function getProjects (page) {
    var self = this;
    return request.getAsync(this.buildUrl('/projects'));
};

StashApi.prototype.buildUrl = function (endpoint) {
    return this.baseUrl + this.apiUrl + endpoint;
}