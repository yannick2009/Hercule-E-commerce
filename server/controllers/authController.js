const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const response = require('../utils/response');
const AppError = require('../utils/appError');
const { promisify } = require('node:util');

// FONCTIONS UTILS

const createToken = async (res, statusCode, user) => {
  const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY, {
    expiresIn: process.env.TOKEN_EXIRE_IN,
  });

  res.cookie('token', token, {
    expires: new Date(Date.now() + 24 * 60 * 60),
    httpOnly: true,
  });

  response.success(res, statusCode, user, token);
};

// INSCRIPTION
exports.signup = catchAsync(async (req, res, next) => {
  const originfields = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    dateNaiss: req.body.dateNaiss,
    email: req.body.email,
    password: req.body.password,
    numero: req.body.numero,
    confirmPassword: req.body.confirmPassword,
  };
  const newUser = await User.create(originfields);

  createToken(res, 200, newUser);
});

// CONNEXION
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(
      new AppError(
        'veillez remplir les deux champs pour votre identification',
        401
      )
    );
  const user = await User.findOne(email);
  if (!user || !user.correctPassword(password, user.password))
    return next(
      new AppError('E-mail ou mot de passe incorrect !', 400)
    );
  createToken(res, 200, user);
});

// MIDDLEWARE PROTECTION
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    token = req.cookies.token;
  }
  if (!token)
    return next(new AppError('Veillez vous connecter', 401));

  const decoded_id = await promisify(jwt.verify)(
    token,
    process.env.TOKEN_KEY
  );
  const currentUser = await User.findById(decoded_id);
  if (!currentUser)
    return next(new AppError(`cet utilisateur n'existe plus`));
});
