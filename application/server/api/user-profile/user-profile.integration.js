'use strict';

var app = require('../..');
import request from 'supertest';

var newUserProfile;

describe('UserProfile API:', function() {

  describe('GET /api/user_profiles', function() {
    var userProfiles;

    beforeEach(function(done) {
      request(app)
        .get('/api/user_profiles')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          userProfiles = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      userProfiles.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/user_profiles', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/user_profiles')
        .send({
          name: 'New UserProfile',
          info: 'This is the brand new userProfile!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUserProfile = res.body;
          done();
        });
    });

    it('should respond with the newly created userProfile', function() {
      newUserProfile.name.should.equal('New UserProfile');
      newUserProfile.info.should.equal('This is the brand new userProfile!!!');
    });

  });

  describe('GET /api/user_profiles/:id', function() {
    var userProfile;

    beforeEach(function(done) {
      request(app)
        .get('/api/user_profiles/' + newUserProfile._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          userProfile = res.body;
          done();
        });
    });

    afterEach(function() {
      userProfile = {};
    });

    it('should respond with the requested userProfile', function() {
      userProfile.name.should.equal('New UserProfile');
      userProfile.info.should.equal('This is the brand new userProfile!!!');
    });

  });

  describe('PUT /api/user_profiles/:id', function() {
    var updatedUserProfile;

    beforeEach(function(done) {
      request(app)
        .put('/api/user_profiles/' + newUserProfile._id)
        .send({
          name: 'Updated UserProfile',
          info: 'This is the updated userProfile!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUserProfile = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUserProfile = {};
    });

    it('should respond with the updated userProfile', function() {
      updatedUserProfile.name.should.equal('Updated UserProfile');
      updatedUserProfile.info.should.equal('This is the updated userProfile!!!');
    });

  });

  describe('DELETE /api/user_profiles/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/user_profiles/' + newUserProfile._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when userProfile does not exist', function(done) {
      request(app)
        .delete('/api/user_profiles/' + newUserProfile._id)
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
