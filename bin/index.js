// Project/index.js
process.stdout.isTTY = true;
// If error with bash console
// Look here https://github.com/nodejs/node/issues/3006

const cluster = require('cluster');
// Cluster download
if (cluster.isMaster) {
    require('./master');
}
else {
    require('./worker');
}
