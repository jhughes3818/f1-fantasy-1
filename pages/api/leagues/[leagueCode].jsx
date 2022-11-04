import mongoose from "mongoose";
import { League } from "../../../database/schemas";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri);

  const { leagueCode } = req.query;

  if (req.method === "GET") {
    const league = await League.findOne({ code: leagueCode }).exec();

    if (!league) {
      // const newLeague = new League({
      //   name: "Test",
      //   code: leagueCode,
      //   members: [],
      // });

      res.status(404).json({ error: "Cannot find league" });

      //newLeague.save();
    } else {
      res.status(200).json({ league: league.code });
    }
  } else if (req.method === "PUT") {
    const newMember = [req.body.user];
    await League.findOneAndUpdate(
      { code: leagueCode },
      { members: newMember }
    ).exec();
    res.status(200).json({ message: "Added user to league" });
  }
}
