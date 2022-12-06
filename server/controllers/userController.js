const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const response = require('../utils/response');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

// FONCTIONS
const calculPrice = (array) => {
  let value = 0;
  array.forEach((e) => {
    value = value + e.prix;
  });
  return value;
};
/////////////////////////////////////////////////////////////

// MOTEUR DE RECHERCHE & FILTRE DE RECHERCHE

// faire une recherche
exports.makeSearch = catchAsync(async (req, res, next) => {
  const { value, categorie } = req.body;
  if (value.trim() || categorie.trim()) {
    //regex expression
    let regex = `/^${value}/`;
    // result
    const products = Product.find({
      nom: { $regex: regex, $option: 'si' },
      categorie,
    });
    response.success(res, 200, products);
  }
});

//SYSTEME DE PANIER (LISTE DES PRODUITS, PRIX & CODE PROMO)

// ajouter au panier
exports.inBasket = catchAsync(async (req, res, next) => {
  const user = User.findById(req.user.id);
  const product = req.params.productId;

  // user.panier.push(product);
  user.panier = [product, ...user.panier];
  await user.save();
  response.success(res, 200, user);
});

// retirer du panier
exports.outBasket = catchAsync(async (req, res, next) => {
  const user = req.user;
  const productId = req.params.productId;

  user.panier = user.panier.map(
    (product) => product.id !== productId
  );
  await user.save();
  response.success(res, 200, user);
});

// SYSTEME DE PAIEMENT

// commander
exports.orderProducts = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const currentUser = await User.findById(userId);
  // le prix de tous les produits dans le panier
  const productsPrice = calculPrice(currentUser.panier);
  // commande
  const options = {
    user: currentUser.id,
    products: currentUser.panier,
    prix: productsPrice,
  };
  //paiement par carte bacnaire
  //validation
  await Order.create(options);
  (await currentUser.panier) === [];
  currentUser.save({ validateBeforeSave: false });
});

// POUVOIR TELECHARGER SON RECU
exports.dealDonePdf = catchAsync(async (req, res, next) => {
  // recuperer id de la commande
  // generer tableau html pour la commande
  // transformation en pdf
  // telechargement du pdf
});

// LISTE D'ENVIES (LISTE DE PRODUITS, PRIX)

// ajouter aux favoris
exports.inFavoris = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const product = req.params.productId;

  // await user.envies.push(product);
  user.envies = [product, ...user.envies];
  await user.save();
  response.success(res, 200, user);
});

// retirer des favoris
exports.outFavoris = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const productId = req.params.productId;

  user.envies = user.envies.map(
    (product) => product.id !== productId
  );
  await user.save();
  response.success(res, 200, user);
});

// HISTOIRQUES DES COMMANDES
exports.dealsHistory = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: 'commands',
  });
  response.success(res, 200, user.commands);
});

// NOTER UN PRODUIT
exports.giveMarktoProduct = catchAsync(async (req, res, next) => {});
