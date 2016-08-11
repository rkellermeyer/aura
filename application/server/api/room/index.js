'use strict';

var express = require('express');
var controller = require('./room.controller');
var auth = require('../../auth/auth.service')
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.delete('/:id/message/:messageId', auth.isAuthenticated(), controller.destroyMessage);

module.exports = router;
