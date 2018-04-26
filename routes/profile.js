const Ctrl = require('../controllers/todos')

const express = require('express');
const router = express.Router();
const User = require('../model/User')
 
router.get('/', Ctrl.findAll)
router.post('/', Ctrl.create)
router.post('/:id', Ctrl.update)
router.delete('/:id', Ctrl.destroy)
 
module.exports = router.routes()
