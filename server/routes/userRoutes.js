const express = require('express');
const userControllers = require('../controllers/userController');
const authControllers = require('../controllers/authController');
const adminControllers = require('../controllers/adminController');
const protect = require('../controllers/protect');

const router = express.Router();

router.route('/login').post(authControllers.login); // se connecter
router.route('/sign-up').post(authControllers.signup); // s'inscrire

// ADMIN
router
  .route('/')
  .get(adminControllers.allUsers) // Tous les utlisateurs
  .post(adminControllers.createUSer); // creer un utilisateur

router
  .route('/:userId')
  .get(adminControllers.getUser) // recuperer un utilisateur
  .patch(adminControllers.modifUser) // modifier les infos de un utilisateur
  .delete(adminControllers.deleteUser); // supprimer un utilisateur

// USER
router.use(protect);

router.route('/search').post(userControllers.makeSearch); // faire une recherche

router.route('/in-basket/:productId').post(userControllers.inBasket); // mettre dans le panier
router
  .route('/out-basket/:productId')
  .post(userControllers.outBasket); // retirer du panier

router.route('/in-favoris').post(userControllers.inFavoris); // ajouter aux favoris
router.route('/out-favoris').post(userControllers.outFavoris); // supprimer des favoris

router.route('/command').post(userControllers.orderProducts); // commander un ou des produits
router
  .route('/command/:orderId')
  .get(userControllers.oneOrder) // voir une ancienne commande
  .post(userControllers.genPdf); // generer un pdf en guise de recu pour une ancienne commande

router.route('/history').get(userControllers.dealsHistory); // voir la liste des anciennes commandes

module.exports = router; // EXPORTATION
