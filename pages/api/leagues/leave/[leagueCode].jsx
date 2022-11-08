import mongoose from "mongoose";
import { League, User } from "../../../../database/schemas";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri);

  const { leagueCode } = req.query;

  if (req.method === "GET") {
    const league = await League.findOne({ code: leagueCode }).exec();

    if (!league) {
      res.status(404).json({ error: "Cannot find league" });
    } else {
      res.status(200).json({ league: league });
    }
  } else if (req.method === "PUT") {
    const league = await League.findOne({ code: leagueCode }).exec();
    const members = league.members;

    const remainingMembers = members.filter(
      (member) => member.email !== req.body.user.email
    );

    await League.findOneAndUpdate(
      { code: leagueCode },
      { members: remainingMembers }
    ).exec();

    await User.findOneAndUpdate(
      { email: req.body.user.email },
      { league: null }
    ).exec();

    console.log("done");

    res.status(200).json({ message: "Added user to league" });
  }
}
