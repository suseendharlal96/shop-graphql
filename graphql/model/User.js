const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  myList: [
    {
      id: { type: Number },
      name: { type: String },
      date: { type: String },
      overview: { type: String },
      rating: { type: Number },
      image: { type: String },
    },
  ],
});

module.exports = model("User", userSchema);
