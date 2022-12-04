const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { promisify } = require('node:util');

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

  req.user = currentUser;
  next();
});
