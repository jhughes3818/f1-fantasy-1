import { User } from "../../../database/schemas";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri);
  const userEmail = req.query;

  const leagueCode = req.body.league;

  if (req.method === "PUT") {
    console.log("request received");
    console.log(leagueCode);
    await User.findOneAndUpdate(
      { email: userEmail.userEmail },
      { league: leagueCode }
      //req.body
    ).exec();
    res.status(200).json({ message: "Successfully joined league" });
  }
  if (req.method === "GET") {
    const user = await User.findOne({ email: userEmail.userEmail }).exec();
    if (user) {
      res.status(200).json({ user: user });
    } else {
      res.status(404).json({ error: "User does not exist" });
    }
  }
}
