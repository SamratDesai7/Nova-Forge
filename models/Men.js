const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenSchema = new Schema({
  product_name: {
    type: String,
    required: true,
    trim: true // remove leading and trailing whitespace
  },
  description: {
    type: String,
    trim: true // remove leading and trailing whitespace
  },
  image_url: {
    type: String,
    default: "https://imagescdn.pantaloons.com/img/app/product/8/804190-11154274.jpg?auto=format&w=450",
    set: (v) => v === "" ? "https://imagescdn.pantaloons.com/img/app/product/8/804190-11154274.jpg?auto=format&w=450" : v
  },
  sizes: {
    type: [{ type: String }],
    trim: true // remove leading and trailing whitespace
  },
  price: {
    type: Number,
    required: true,
    min: 0 // ensure price is non-negative
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
}, {
  timestamps: true // automatically add createdAt and updatedAt fields
});

const Men = mongoose.model("Men", MenSchema);
module.exports = Men;