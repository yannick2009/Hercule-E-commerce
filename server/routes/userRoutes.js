const express = require('express');
const userControllers = require('../controllers/userController');
const authControllers = require('../controllers/authController');
const adminControllers = require('../controllers/adminController');
const protect = require('../controllers/protect');

const router = express.Router();

router.route('/login').post(authControllers.login);
router.route('/sign-up').post(authControllers.signup);

// ADMIN
router
  .route('/')
  .get(adminControllers.allUsers)
  .post(adminControllers.createUSer);

router
  .route('/:userId')
  .get(adminControllers.getUser)
  .patch(adminControllers.modifUser)
  .delete(adminControllers.deleteUser);

// USER
router.use(protect);

router.route('/search').post(userControllers.makeSearch);

router.route('/in-basket/:productId').post(userControllers.inBasket);
router
  .route('/out-basket/:productId')
  .post(userControllers.outBasket);

router.route('/in-favoris').post(userControllers.inFavoris);
router.route('/out-favoris').post(userControllers.outFavoris);

router.route('/command').post(userControllers.orderProducts);
router.route('/command/:orderId').post(userControllers.orderProducts);

module.exports = router;
