const catchAsync = (fn) => {
  return (req, res, next) => {
    fn.catch((err) => next(err));
  };
};

module.exports = catchAsync;
