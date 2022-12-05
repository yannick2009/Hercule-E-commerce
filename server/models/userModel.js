const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

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
      trim: true,
      validate: [validator.isEmail, `votre E-mail n'est pas valide`],
      required: [true, 'Veillez entrer votre E-mail !'],
    },
    numero: {
      type: Number,
      required: [
        true,
        'veillez entrer un numero de telephone joignable',
      ],
      minLength: 10,
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'veillez entrer un mot de passe SVP !'],
    },
    passwordConfirm: {
      type: String,
      trim: true,
      required: [true, 'veillez confirmer votre mot de passe SVP !'],
      validate: {
        validator: function (password) {
          return password === this.password;
        },
        message: 'les mots de passe ne sont pas identiques',
      },
    },
    panier: [
      {
        type: mongoose.Types.objectId,
        ref: 'Product',
        populate: true,
      },
    ],
    envies: [
      {
        type: mongoose.Types.objectId,
        ref: 'Product',
        populate: true,
      },
    ],
    // codeCoupon: String,
  },
  { timestamps: true }
);

// METHODS
userSchema.methods.correctPassword = async function (
  password,
  userPassword
) {
  return await bcrypt.compare(password, userPassword);
};

// VIRTUALS
userSchema.virtual('commands', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'user',
});

// PRE 
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(12, 'a');
  this.password = bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;
  // this.codeCoupon = 'AM-NEW';
  next();
});

module.exports = mongoose.model('User', userSchema);
