'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server module', function () {

  before(done => {
    server.listen(3000);
    done();
  });
// ++++++++ POST +++++++++
  describe('POST method', function() {
    describe('a properly formatted request', function() {
      it('should return a 200 response' , done => {
        chai.request(server)
        .post('/api/cat')
        .send({name: 'milo', mood: 'happy'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });
      it('should return a response object', done => {
        chai.request(server)
        .post('/api/cat')
        .send({name: 'milo', mood: 'happy'})
        .end((err, res) => {
          expect(res).to.be.an('object');
          done();
        });
      });
      it('should create a cat with name', done => {
        chai.request(server)
        .post('/api/cat')
        .send({name: 'milo', mood: 'happy'})
        .end((err, res) => {
          expect(res.body.name).to.equal('milo');
          expect(res.body.mood).to.equal('happy');
          done();
        });
      });
      it('should create a cat with a mood', done => {
        chai.request(server)
        .post('/api/cat')
        .send({name: 'milo', mood: 'happy'})
        .end((err, res) => {
          expect(res.body.mood).to.equal('happy');
          done();
        });
      });
    });
    describe('a request with no body provided or invalid body', function() {
      it('should return an error response 400 with "bad request"', done => {
        chai.request(server)
        .post('/api/cat')
        .send({name: 'milo', type: 'cat'})
        .end((err, res) => {
          expect(res.text).to.equal('bad request');
          expect(res).to.have.status(400);
          done();
        });
      });
    });

    describe('an unregistered route', function() {
      it('should respond with 404', done => {
        chai.request(server)
        .get('/api/dog')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
      });
    });
  });

  // +++++++++++++++++++++GET ++++++++++++++++++++++++++++++
  describe('GET method', function() {
    let resource;
    before(done => {
      chai.request(server)
      .post('/api/cat')
      .send({name: 'eva', mood: 'grumpy'})
      .end((err, res) => {
        resource = JSON.parse(res.text);
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete('/api/cat')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });

    describe('/api/cat route', function() {

      describe('a property formatted request', function() {
        it('should return a 200 response', done => {
          chai.request(server)
          .get(`/api/cat?id=${resource.id}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
        });
        it('should return the expected response given a proper id', done => {
          chai.request(server)
          .get(`/api/cat?id=${resource.id}`)
          .end((err, res) => {
            let expected = JSON.parse(res.text);
            expect(resource).to.deep.equal(expected);
            done();
          });
        });
        it('should return a response body object given a proper id', done => {
          chai.request(server)
          .get(`/api/cat?id=${resource.id}`)
          .end((err, res) => {
            expect(res).to.be.an('object');
            done();
          });
        });
      });
      describe('an improperly formatted request', function() {
        it('should return an error response 400 of "not found"', done => {
          chai.request(server)
          .get(`/api/cat?foo=${resource.id}`)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
        });
      });
      describe('unregistered route', function() {
        it('should respond with 404 for an id not found', done => {
          chai.request(server)
          .get('/api/dog')
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
        });
      });
    });
  });
  // ++++++++++++++ PUT +++++++++++++++++++++++++++
  describe('PUT method', function() {
    describe('/api/cat route', function() {

      let resource;
      before(done => {
        chai.request(server)
        .post('/api/cat')
        .send({name: 'eva', mood: 'grumpy'})
        .end((err, res) => {
          resource = JSON.parse(res.text);
          done();
        });
      });

      after(done => {
        chai.request(server)
        .delete('/api/cat')
        .query({id: resource.id})
        .end(() => {
          done();
        });
      });

      describe('a properly formatted request', function() {

        it('should return a 202 response', done => {
          chai.request(server)
          .put('/api/cat')
          .query({id: resource.id})
          .send({name: 'mia', mood: 'happy'})
          .end((err, res) => {
            expect(res).to.have.status(202);
            done();
          });
        });
        it('should return a response body object', done => {
          chai.request(server)
          .put('/api/cat')
          .query({id: resource.id})
          .send({name: 'mia', mood: 'happy'})
          .end((err, res) => {
            expect(res).to.be.an('object');
            done();
          });
        });
        it('should update the item to name: mia', done => {
          chai.request(server)
          .put('/api/cat')
          .query({id: resource.id})
          .send({name: 'mia', mood: 'happy'})
          .end((err, res) => {
            let expected = JSON.parse(res.body);
            expect(resource).to.not.equal(expected);
            expect(expected.name).to.equal('mia');
            done();
          });
        });
        it('should update the item to mood: happy', done => {
          chai.request(server)
          .put('/api/cat')
          .query({id: resource.id})
          .send({name: 'mia', mood: 'happy'})
          .end((err, res) => {
            let expected = JSON.parse(res.body);
            expect(resource).to.not.equal(expected);
            expect(expected.mood).to.equal('happy');
            done();
          });
        });
      });
    });

    describe('unregistered route', function() {
      it('should return a 404 for unregistered route', done => {
        chai.request(server)
        .put('/api/dog')
        .send({name: 'mia', mood: 'happy'})
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
      });
    });
  });

  // ++++++++++++++++++++++++ DELETE ++++++++++++++++++++++++
  describe('DELETE method', function() {

    let resource;
    before(done => {
      chai.request(server)
      .post('/api/cat')
      .send({name: 'eva', mood: 'grumpy'})
      .end((err, res) => {
        resource = JSON.parse(res.text);
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete('/api/cat')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });

    describe('/api/cat route', function() {

      describe('a response with a valid id', function() {
        it('should return a 204 response', done => {
          chai.request(server)
          .delete('/api/cat')
          .query({id: resource.id})
          .end((err, res) => {
            expect(res).to.have.status(204);
            done();
          });
        });
      });
      describe('an unregistered request', function() {
        it('should return a 404 request', done => {
          chai.request(server)
          .delete('/api/dog')
          .query({id: resource.id})
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
        });
      });
      describe('a request with an improper id', function() {
        it('should return a 400 response', done => {
          chai.request(server)
          .delete('/api/cat')
          .query({})
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
        });
      });
    });
  });
  after(done => {
    server.close();
    done();
  });
});
