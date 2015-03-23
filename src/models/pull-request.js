'use strict';

var _ = require('lodash');

module.exports.PullRequest = PullRequest

/**
 *
{
    "id": 101,
    "version": 1,
    "title": "Talking Nerdy",
    "description": "It’s a kludge, but put the tuple from the database in the cache.",
    "state": "OPEN",
    "open": true,
    "closed": false,
    "createdDate": 1359075920,
    "updatedDate": 1359085920,
    "fromRef": {
        "id": "refs/heads/feature-ABC-123",
        "repository": {
            "slug": "my-repo",
            "name": null,
            "project": {
                "key": "PRJ"
            }
        }
    },
    "toRef": {
        "id": "refs/heads/master",
        "repository": {
            "slug": "my-repo",
            "name": null,
            "project": {
                "key": "PRJ"
            }
        }
    },
    "locked": false,
    "author": {
        "user": {
            "name": "tom",
            "emailAddress": "tom@example.com",
            "id": 115026,
            "displayName": "Tom",
            "active": true,
            "slug": "tom",
            "type": "NORMAL"
        },
        "role": "AUTHOR",
        "approved": true
    },
    "reviewers": [
        {
            "user": {
                "name": "jcitizen",
                "emailAddress": "jane@example.com",
                "id": 101,
                "displayName": "Jane Citizen",
                "active": true,
                "slug": "jcitizen",
                "type": "NORMAL"
            },
            "role": "REVIEWER",
            "approved": true
        }
    ],
    "participants": [
        {
            "user": {
                "name": "harry",
                "emailAddress": "harry@example.com",
                "id": 99049120,
                "displayName": "Harry",
                "active": true,
                "slug": "harry",
                "type": "NORMAL"
            },
            "role": "PARTICIPANT",
            "approved": true
        },
        {
            "user": {
                "name": "dick",
                "emailAddress": "dick@example.com",
                "id": 3083181,
                "displayName": "Dick",
                "active": true,
                "slug": "dick",
                "type": "NORMAL"
            },
            "role": "PARTICIPANT",
            "approved": false
        }
    ],
    "link": {
        "url": "http://link/to/pullrequest",
        "rel": "self"
    },
    "links": {
        "self": [
            {
                "href": "http://link/to/pullrequest"
            }
        ]
    }
}
 */
function PullRequest () {
    // required for POST
    this.title = '';
    this.description = '';
    this.state = 'OPEN';
    this.open = true
    this.closed = false;
    this.fromRef = {};
    this.toRef = {};
    this.locked = false;
    this.reviewers = [];

    // used for GET, PUT
    this.id = '';
    this.version = 1;
    this.createdDate = 0;
    this.updatedDate = 0;
    this.author = {};
    this.participants = [];
    this.link = {};
    this.links = {};
}

PullRequest.prototype.toPostJsonString = function toPostJson () {
    return JSON.stringify({
        title: this.title || '',
        description: this.description || '',
        state: this.state || 'OPEN',
        open: _.isBoolean(this.open) ? this.open : true,
        closed: _.isBoolean(this.closed) ? this.closed : true,
        fromRef: this.fromRef || {},
        toRef: this.toRef || {},
        locked: _.isBoolean(this.locked) ? this.locked : true,
        reviewers: this.reviewers || []
    });
}

PullRequest.prototype.toJsonString = function toJSON () {
    return JSON.stringify({
        id: this.id || '',
        version: this.version || 0,
        title: this.title || '',
        description: this.description || '',
        state: this.state || 'OPEN',
        open: _.isBoolean(this.open) ? this.open : true,
        closed: _.isBoolean(this.closed) ? this.closed : true,
        createdDate: this.createdDate || 0,
        updatedDate: this.updatedDate || 0,
        fromRef: this.fromRef || {},
        toRef: this.toRef || {},
        locked: _.isBoolean(this.locked) ? this.locked : true,
        author: this.author || {},
        reviewers: this.reviewers || [],
        participants: this.participants || [],
        link: this.link || {},
        links: this.links || {}
    });
}