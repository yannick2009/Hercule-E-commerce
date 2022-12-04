// REPONSE ✅
exports.success = (res, statusCode, data, token = undefined) => {
  let resultResponse = {
    status: 'success',
    length: data.length,
    data,
  };
  if (token) return (result.token = token);
  res.statusCode(statusCode).json(resultResponse);
};

// REPONSE ❌
exports.deleted = (res, statusCode, message) => {
  res.statusCode(statusCode).json({
    status: 'success',
    message,
  });
};
