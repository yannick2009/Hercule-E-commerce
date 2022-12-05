const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'votre nom svp'],
      lowercase: true,
    },
    categorie: {
      type: String,
      enum: ['sneaker', 'culotte', 'T-shirt', 'complet'],
      required: [
        true,
        'une catégorie est necessaire pour chaque article',
      ],
    },
    quantite: {
      type: Number,
      default: 10,
      max: 100,
    },
    description: {
      type: String,
      default: '',
    },
    note: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    image: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    timeseries: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
