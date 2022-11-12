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
    members: Array,
  });

const Team =
  mongoose.models.Team ||
  mongoose.model("Team", {
    name: String,
    drivers: Array,
  });

const Trade =
  mongoose.models.Trade ||
  mongoose.model("Trade", {
    league: Number,
    trades: Array,
  });

// const Prediction = mongoose.model("Prediction", {
//   year: Number,
//   season: Array,
// });

// const Price = mongoose.model("Price", {
//   name: String,
//   price: Array,
// });

export { Trade, User, League, Team };
