const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WomenSchema = new Schema({
  product_name: {
    type: String,
   required: true,
  },
  description: String,
  image_url: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/002/387/785/small/handwatch-icon-free-vector.jpg",
    set: (v) =>
      v === ""
        ? "https://static.vecteezy.com/system/resources/thumbnails/002/387/785/small/handwatch-icon-free-vector.jpg"
        : v,
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
  
  reviews:[
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
});

const Women = mongoose.model("Women", WomenSchema);
module.exports = Women;