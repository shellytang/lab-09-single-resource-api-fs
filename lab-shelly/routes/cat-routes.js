'use strict';

const debug = require('debug')('http:cat-routes');
const storage = require('../lib/storage');
const Cat = require('../model/cat');

module.exports = function(router) {

  router.get('/api/cat', function(req, res) {
    debug('GET /api/cat');
    if(req.url.query.id) {
      storage.fetchItem('cat', req.url.query.id)
      .then(cat => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(cat));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  });

  router.post('/api/cat', function(req, res) {
    debug('POST /api/cat');
    try {
      let cat = new Cat(req.body.name, req.body.mood);
      storage.createItem('cat', cat);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(cat));
      res.end();
    } catch(err) {
      console.error(err);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  });

  router.delete('/api/cat', function(req, res) {
    debug('DELETE /api/cat');
    if(req.url.query.id) {
      // console.log(req.url.query.id);
      storage.deleteItem('cat', req.url.query.id)
      .then(cat => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(cat));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  });

  router.put('/api/cat', function(req, res) {
    debug('PUT /api/cat');
    if(req.url.query.id) {
      storage.updateItem('cat', req.url.query.id, req.body.name, req.body.mood)
      .then(cat => {
        //put request for VALID id (success)
        // cat.name = req.body.name;
        // cat.mood = req.body.mood;
        console.log('cat is: ', cat);
        res.writeHead(202, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(cat));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  });
};
