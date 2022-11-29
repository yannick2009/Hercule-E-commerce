const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");

// APP INITIALISATION
const app = express();

// MIDDLEWARE
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EXPORTATION

module.exports = app;
