const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.objectId },
    products: [{ type: mongoose.Schema.objectId }],
    prix: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
