import mongoose from "mongoose";

const User =
  mongoose.models.User ||
  mongoose.model("User", {
    name: String,
    email: String,
    team: Object,
    cash: Number,
  });

// const Prediction = mongoose.model("Prediction", {
//   year: Number,
//   season: Array,
// });

// const Price = mongoose.model("Price", {
//   name: String,
//   price: Array,
// });

export { User };
