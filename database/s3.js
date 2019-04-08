var access = require('../config/config.js');

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Check if environment supports native promises
if (typeof Promise === 'undefined') {
    AWS.config.setPromisesDependency(require('bluebird'));
}

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: access.ACCESSKEYID,
    secretAccessKey: access.SECRETACCESSKEY,
});

// Create S3 service object
var s3 = new AWS.S3({
    apiVersion: '2006-03-01'
});

function listObjects(folder) {
    return s3.listObjects(
        {Bucket: 'hrla28renttherunway', Prefix: folder }
    ).promise();
}

module.exports = listObjects;