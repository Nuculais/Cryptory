const express = require('express');
const router = express.Router();
const User = require('../model/User')

// Require controller modules.
const user_instance_controller = require('../controllers/userinstanceController');


/* GET SINGLE PRODUCT BY ID */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/* UPDATE PRODUCT */
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/// BOOKINSTANCE ROUTES ///

// GET request for creating a UserInstance. NOTE This must come before route that displays UserInstance (uses id).
router.get('/profile/create', user_instance_controller.userinstance_create_get);

// POST request for creating UserInstance.
router.post('/profile/create', user_instance_controller.userinstance_create_post);

// GET request to delete UserInstance.
router.get('/profile/:id/delete', user_instance_controller.userinstance_delete_get);

// POST request to delete UserInstance.
router.post('/profile/:id/delete', user_instance_controller.userinstance_delete_post);

// GET request to update UserInstance.
router.get('/profile/:id/update', user_instance_controller.userinstance_update_get);

// POST request to update UserInstance.
router.post('/profile/:id/update', user_instance_controller.userinstance_update_post);

// GET request for one UserInstance.
router.get('/profile/:id', user_instance_controller.userinstance_detail);

// GET request for list of all UserInstance.
router.get('/profile', user_instance_controller.userinstance_detail);

module.exports = router;