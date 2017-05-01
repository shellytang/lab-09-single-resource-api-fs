'use strict';

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
    //code taken from lab 9 demo
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
        it('should return a the expected response given a proper id', done => {
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
      describe('an impropery formatted request', function() {
        it('should return an error response 400 of "not found"', done => {
          chai.request(server)
          .get(`/api/cat?foo=${resource.id}`) //foo should be id...
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
            console.error();
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
          it('should return an updated item with name: mia', done => {
            chai.request(server)
            .put('/api/cat')
            .query({id: resource.id})
            .send({name: 'mia', mood: 'happy'})
            .end((err, res) => {
              let expected = JSON.parse(res.text);
              expect(resource).to.not.equal(expected);
              expect(expected.name).to.equal('mia');
              done();
            });
          });
          it('should return an updated item with mood: happy', done => {
            chai.request(server)
            .put('/api/cat')
            .query({id: resource.id})
            .send({name: 'mia', mood: 'happy'})
            .end((err, res) => {
              let expected = JSON.parse(res.text);
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


  after(done => {
    server.close();
    done();
  });
});
