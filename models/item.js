const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be a negative number.'],
  },
  num_in_stock: {
    type: Number,
    required: true,
    min: [0, 'Stock amount cannot be a negative number.'],
  },
  imageUrl: { type: String },
});

ItemSchema.virtual('url').get(function () {
  return `/inventory/item/${this._id}`;
});

ItemSchema.virtual('total_value').get(function () {
  return this.num_in_stock * this.price;
});

module.exports = mongoose.model('Item', ItemSchema);
