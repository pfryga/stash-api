'use strict';

var utils = require('../utils');

module.exports.Project = Project;

function Project (api) {
    this.api = api;
}

// PROJECTS
Project.prototype.getMany = function getProjects () {
    return utils.ensureJsonResponse(request.getAsync(this.buildUrl('/projects')));
};