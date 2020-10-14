const { model, Schema } = require("mongoose");

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  products: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      description: { type: String, required: true },
    },
  ],
});

module.exports = model("Cart", cartSchema);
