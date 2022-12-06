const path = require('node:path');
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalError = require('./controllers/errorController');
const userRoute = require('./routes/userRoutes')

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '500kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRoute);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `cet URL ${req.originalUrl} n'existe pas sur le server`,
      404
    )
  );
});

app.use(globalError);

module.exports = app;
