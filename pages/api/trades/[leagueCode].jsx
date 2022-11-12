import mongoose from "mongoose";
import { Trade } from "../../../database/schemas";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;

  mongoose.connect(uri);

  const leagueCode = req.query.leagueCode;
  //console.log(userEmail);

  const trade = req.body.trade;

  if (req.method === "PUT") {
    const userTrades = await Trade.findOne({ league: leagueCode }).exec();

    if (userTrades != null) {
      await Trade.findOneAndUpdate(
        {
          league: leagueCode,
        },
        {
          $push: { trades: trade },
        }
      ).exec();
      res.status(200).json({ message: "Added trade" });
    } else {
      const newTrade = new Trade({
        league: leagueCode,
        trades: trade,
      });
      newTrade.save();
      res.status(200).json({ message: "Added trade" });
    }
  }
}
