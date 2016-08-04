'use strict';

var express = require('express');
var controller = require('./project-profile.controller');
const auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.update);
router.put('/:id/point', controller.addPoint);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.delete('/:id/point/:pointId', controller.archivePoint);

module.exports = router;
