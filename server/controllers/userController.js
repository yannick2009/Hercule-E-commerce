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
exports.putInBasket = catchAsync(async (req, res, next) => {
  const user = req.user;
  const product = req.params.productId;

  await user.panier.push(product);
  await user.save();
  response.success(res, 200, user);
});

// SYSTEME DE PAIEMENT
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
exports.dealDonePdf = catchAsync(async (req, res, next) => {});

// LISTE D'ENVIES (LISTE DE PRODUITS, PRIX)
exports.favoris = catchAsync(async (req, res, next) => {
  const user = req.user;
  const product = req.params.productId;

  await user.envies.push(product);
  await user.save();
  response.success(res, 200, user);
});

// HISTOIRQUES DES COMMANDES
exports.dealsHistory = catchAsync(async (req, res, next) => {});

// NOTER UN PRODUIT
exports.giveMarktoProduct = catchAsync(async (req, res, next) => {});
