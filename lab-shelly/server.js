'use strict';

const http = require('http');
const Router = require('./lib/router');

const PORT = process.env.PORT || 3000;

const router = new Router();
require('./routes/cat-routes')(router);
const server = module.exports = http.createServer(router.route());

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
