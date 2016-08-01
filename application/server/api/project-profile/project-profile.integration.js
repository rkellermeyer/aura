'use strict';

var app = require('../..');
import request from 'supertest';

var newProjectProfile;

describe('ProjectProfile API:', function() {

  describe('GET /api/project_profiles', function() {
    var projectProfiles;

    beforeEach(function(done) {
      request(app)
        .get('/api/project_profiles')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          projectProfiles = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      projectProfiles.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/project_profiles', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/project_profiles')
        .send({
          name: 'New ProjectProfile',
          info: 'This is the brand new projectProfile!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newProjectProfile = res.body;
          done();
        });
    });

    it('should respond with the newly created projectProfile', function() {
      newProjectProfile.name.should.equal('New ProjectProfile');
      newProjectProfile.info.should.equal('This is the brand new projectProfile!!!');
    });

  });

  describe('GET /api/project_profiles/:id', function() {
    var projectProfile;

    beforeEach(function(done) {
      request(app)
        .get('/api/project_profiles/' + newProjectProfile._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          projectProfile = res.body;
          done();
        });
    });

    afterEach(function() {
      projectProfile = {};
    });

    it('should respond with the requested projectProfile', function() {
      projectProfile.name.should.equal('New ProjectProfile');
      projectProfile.info.should.equal('This is the brand new projectProfile!!!');
    });

  });

  describe('PUT /api/project_profiles/:id', function() {
    var updatedProjectProfile;

    beforeEach(function(done) {
      request(app)
        .put('/api/project_profiles/' + newProjectProfile._id)
        .send({
          name: 'Updated ProjectProfile',
          info: 'This is the updated projectProfile!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProjectProfile = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProjectProfile = {};
    });

    it('should respond with the updated projectProfile', function() {
      updatedProjectProfile.name.should.equal('Updated ProjectProfile');
      updatedProjectProfile.info.should.equal('This is the updated projectProfile!!!');
    });

  });

  describe('DELETE /api/project_profiles/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/project_profiles/' + newProjectProfile._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when projectProfile does not exist', function(done) {
      request(app)
        .delete('/api/project_profiles/' + newProjectProfile._id)
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
