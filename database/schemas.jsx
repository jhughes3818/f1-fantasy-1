import mongoose from "mongoose";

const User =
  mongoose.models.User ||
  mongoose.model("User", {
    name: String,
    email: String,
    team: Object,
    cash: Number,
    league: Number,
  });

const League =
  mongoose.models.League ||
  mongoose.model("League", {
    name: String,
    code: Number,
    members: Object,
  });

// const Prediction = mongoose.model("Prediction", {
//   year: Number,
//   season: Array,
// });

// const Price = mongoose.model("Price", {
//   name: String,
//   price: Array,
// });

export { User, League };
