var express = require('express');
var router = express.Router();

const UserController = require('../controllers/user');

router.get('/user', UserController.getCurrentUser);
router.post('/user', UserController.createUser);

module.exports = router;
