'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var projectProfileCtrlStub = {
  index: 'projectProfileCtrl.index',
  show: 'projectProfileCtrl.show',
  create: 'projectProfileCtrl.create',
  update: 'projectProfileCtrl.update',
  destroy: 'projectProfileCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var projectProfileIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './project-profile.controller': projectProfileCtrlStub
});

describe('ProjectProfile API Router:', function() {

  it('should return an express router instance', function() {
    projectProfileIndex.should.equal(routerStub);
  });

  describe('GET /api/project_profiles', function() {

    it('should route to projectProfile.controller.index', function() {
      routerStub.get
        .withArgs('/', 'projectProfileCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/project_profiles/:id', function() {

    it('should route to projectProfile.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'projectProfileCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/project_profiles', function() {

    it('should route to projectProfile.controller.create', function() {
      routerStub.post
        .withArgs('/', 'projectProfileCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/project_profiles/:id', function() {

    it('should route to projectProfile.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'projectProfileCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/project_profiles/:id', function() {

    it('should route to projectProfile.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'projectProfileCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/project_profiles/:id', function() {

    it('should route to projectProfile.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'projectProfileCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
