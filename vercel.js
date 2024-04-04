const { createServer } = require('http');
const app = require('./server');

const server = createServer(app);

module.exports = server;
