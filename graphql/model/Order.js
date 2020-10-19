const { model, Schema } = require("mongoose");

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      description: { type: String, required: true },
      date: { type: String, required: true },
    },
  ],
});

module.exports = model("Order", orderSchema);
