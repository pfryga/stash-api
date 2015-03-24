# stash-api
[limited] REST Client for Atlassian Stash

## Install
``` bash
npm install stash-api --save
```

## Usage
Use the module to create a pull request:
``` javascript
var stashApiModule = require('stash-api'),
    StashApi = stashApiModule.StashApi
    PullRequest = stashApiModule.models.PullRequest,
    stash = new StashApi('http', 'localhost', '7990', 'username', 'password');
   
// create a PR 
pr = new PullRequest();
pr.title = 'Some Pull Request Title';
pr.description = 'description';
// reviewers for the PR
pr.reviewers = [
    {
        user: {
            name: 'reviewer1'
        }
    },
    {
        user: {
            name: 'reviewer2'
        }
    }
];
// what is the branch we are coming from?
pr.fromRef = {
    id: 'refs/heads/branch1',
    repository: {
        slug: 'repo1',
        project: {
            key: 'PROJ'
        }
    }
};
// what is the branch we are requesting a pull request to?
pr.toRef = {
    id: 'refs/heads/master',
    repository: {
        slug: 'repo1',
        project: {
            key: 'PROJ'
        }
    }
};

// make the actual request
stash.createPullRequest('PROJ', 'repo1', pr)
.spread(function (response, body) { // we use bluebird promises!
    if (response.statusCode === 201) {
        logger.info('successfully created pull request');
        // open chrome on the user's machine to the PR url
        // do other stuff
        // ...
    } else {
        logger.error('boooooo, error while creating pull request', {
            body: body,
            statusCode: response.statusCode
        });
    }
});
```


## Notes
- Only a small subset of the currently supported commands are implemented because I only needed it for (a Stash CLI I am working on)[https://github.com/ingshtrom/stash-creview].
- no tests were done. This client is supposed to do next to nothing other than query Stash and return a promise to the client.