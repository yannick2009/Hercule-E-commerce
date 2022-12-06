const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId },
    products: [{ type: mongoose.Types.ObjectId }],
    prix: Number,
    codeCoupon: { type: String, default: '' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('Order', orderSchema);
