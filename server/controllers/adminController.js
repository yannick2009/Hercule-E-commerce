const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const response = require('../utils/response');

exports.createUSer = catchAsync(async (req, res, next) => {
  const userInfo = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    dateNaiss: req.body.dateNaiss,
    email: req.body.email,
    numero: req.body.numero,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };
  const newUser = User.create(userInfo);
  response(res, 200, newUser);
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  user ? response.success(res, 200, user) : next(new AppError());
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  (await User.findById(id))
    ? await User.findByIdAndDelete(id)
    : next(new AppError(`cet utilisateur là n'existe pas`, 404));
  response.deleted(res, 200, 'utilisateur supprimé avec success');
});

exports.allUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});
  response.success(res, 200, users);
});
