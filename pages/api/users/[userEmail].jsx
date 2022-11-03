import { User } from "../../../database/schemas";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri);
  const userEmail = req.query;

  const leagueCode = req.body.league;
  if (req.method === "PUT") {
    await User.findOneAndUpdate(
      { email: userEmail.userEmail },
      { league: leagueCode }
    ).exec();
    res.status(200).json({ message: "Successfully joined league" });
  }
}
