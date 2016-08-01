'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var statusCtrlStub = {
  index: 'statusCtrl.index',
  show: 'statusCtrl.show',
  create: 'statusCtrl.create',
  update: 'statusCtrl.update',
  destroy: 'statusCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var statusIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './status.controller': statusCtrlStub
});

describe('Status API Router:', function() {

  it('should return an express router instance', function() {
    statusIndex.should.equal(routerStub);
  });

  describe('GET /statuses', function() {

    it('should route to status.controller.index', function() {
      routerStub.get
        .withArgs('/', 'statusCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /statuses/:id', function() {

    it('should route to status.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'statusCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /statuses', function() {

    it('should route to status.controller.create', function() {
      routerStub.post
        .withArgs('/', 'statusCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /statuses/:id', function() {

    it('should route to status.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'statusCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /statuses/:id', function() {

    it('should route to status.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'statusCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /statuses/:id', function() {

    it('should route to status.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'statusCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
