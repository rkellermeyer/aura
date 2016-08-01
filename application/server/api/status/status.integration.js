'use strict';

var app = require('../..');
import request from 'supertest';

var newStatus;

describe('Status API:', function() {

  describe('GET /statuses', function() {
    var statuss;

    beforeEach(function(done) {
      request(app)
        .get('/statuses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          statuss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      statuss.should.be.instanceOf(Array);
    });

  });

  describe('POST /statuses', function() {
    beforeEach(function(done) {
      request(app)
        .post('/statuses')
        .send({
          name: 'New Status',
          info: 'This is the brand new status!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newStatus = res.body;
          done();
        });
    });

    it('should respond with the newly created status', function() {
      newStatus.name.should.equal('New Status');
      newStatus.info.should.equal('This is the brand new status!!!');
    });

  });

  describe('GET /statuses/:id', function() {
    var status;

    beforeEach(function(done) {
      request(app)
        .get('/statuses/' + newStatus._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          status = res.body;
          done();
        });
    });

    afterEach(function() {
      status = {};
    });

    it('should respond with the requested status', function() {
      status.name.should.equal('New Status');
      status.info.should.equal('This is the brand new status!!!');
    });

  });

  describe('PUT /statuses/:id', function() {
    var updatedStatus;

    beforeEach(function(done) {
      request(app)
        .put('/statuses/' + newStatus._id)
        .send({
          name: 'Updated Status',
          info: 'This is the updated status!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedStatus = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStatus = {};
    });

    it('should respond with the updated status', function() {
      updatedStatus.name.should.equal('Updated Status');
      updatedStatus.info.should.equal('This is the updated status!!!');
    });

  });

  describe('DELETE /statuses/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/statuses/' + newStatus._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when status does not exist', function(done) {
      request(app)
        .delete('/statuses/' + newStatus._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
