const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Product", productSchema);
