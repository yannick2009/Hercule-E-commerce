const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    nom: String,
    prenom: String,
    dateNaiss: Date,
    email: String,
    password: String,
    panier: [{ type: mongoose.Schema.objectId }],
    envies: [{ type: mongoose.Schema.objectId }],
  },
  { timestamps: true }
);
