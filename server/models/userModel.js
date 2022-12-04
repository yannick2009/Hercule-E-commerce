const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema(
  {
    nom: { type: String, required: [true, 'votre nom SVP !'] },
    prenom: { type: String, required: [true, 'votre prenom SVP !'] },
    dateNaiss: {
      type: Date,
      required: [true, 'votre de naissance SVP !'],
      validate: {
        validator: function (date) {
          return (
            date &&
            new Date(Date.now()).getFullYear() -
              new Date(date).getFullYear() >
              16
          );
        },
        message: `vous n'avez pas l'age requis pour pouvoir effectuer des achats sur ce site`,
      },
    },
    email: {
      type: String,
      validate: [validator.isEmail, `votre E-mail n'est pas valide`],
      required: [true, 'Veillez entrer votre E-mail !'],
    },
    password: String,
    panier: [{ type: mongoose.Schema.objectId, populate: true }],
    envies: [{ type: mongoose.Schema.objectId, populate: true }],
  },
  { timestamps: true, timeseries: true }
);

module.exports = mongoose.model('User', userSchema);
