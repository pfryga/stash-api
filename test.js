// requires that stash is running at the expected location,
// as defined by your environment variables

var util = require('util'),
    request = require('request'),
    stashApiModule = require('./src/app'),
    StashApi = stashApiModule.StashApi,
    PullRequest = stashApiModule.models.PullRequest,
    stash = new StashApi('http', 'localhost', '7990', 'hey', 'testing1234');

request.debug = true;

// PROJECTS
stash.getProjects()
.spread(function (response, body) {
    console.log('getProjects: ', JSON.stringify({
        statusCode: response.statusCode,
        body: body
    }, null, 2));
});

// REPOS
stash.getRepos('FOOB')
.spread(function (response, body) {
    console.log('getRepos: ', JSON.stringify({
        statusCode: response.statusCode,
        body: body
    }, null, 2));
});

// BRANCHES
stash.getBranches('FOOB', 'repo1')
.spread(function (response, body) {
    console.log('getBranches: ', JSON.stringify({
        statusCode: response.statusCode,
        body: body
    }, null, 2));
});

stash.getDefaultBranch('FOOB', 'repo1')
.spread(function (response, body) {
    console.log('getDefaultBranch: ', JSON.stringify({
        statusCode: response.statusCode,
        body: body
    }, null, 2));
});

// PULL REQUESTS
// TODO: implement the createPullRequest

// GROUPS
stash.getGroupMembers({
    'context': 'stash-users',
    'limit': '1000'
})
.spread(function (response, body) {
    console.log('getGroupMembers: ', JSON.stringify({
        statusCode: response.statusCode,
        body: body
    }, null, 2));
});