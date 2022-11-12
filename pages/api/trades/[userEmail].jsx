import mongoose from "mongoose";
import { Trade } from "../../../database/schemas";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;

  mongoose.connect(uri);

  const userEmail = req.query.userEmail;
  //console.log(userEmail);

  const trade = req.body.trade;

  if (req.method === "PUT") {
    const userTrades = await Trade.findOne({ user: userEmail }).exec();

    if (userTrades != null) {
      await Trade.findOneAndUpdate(
        {
          user: userEmail,
        },
        {
          $push: { trades: trade },
        }
      ).exec();
    } else {
      const newTrade = new Trade({
        user: userEmail,
        trades: trade,
      });
      newTrade.save();
    }
  }
}
