const express = require('express');
const userControllers = require('../controllers/userController');
const authControllers = require('../controllers/authController');
const adminControllers = require('../controllers/adminController');
const protect = require('../controllers/protect');

const router = express.Router();

router.route('/login').post(authControllers.login);
router.route('/sign-up').post(authControllers.signup);

// Router.route('/').post(userControllers);

module.exports = router;
