const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const path = require("node:path");

// APP INITIALISATION
const app = express();

// MIDDLEWARE
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

// GLOBAL ERROR

// EXPORTATION

module.exports = app;
