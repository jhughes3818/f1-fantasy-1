import mongoose from "mongoose";
import { League } from "../../../database/schemas";

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
    const newMember = req.body.user;
    const league = await League.findOne({ code: leagueCode }).exec();
    const members = league.members;
    let memberNames = [];
    members.forEach((member) => {
      memberNames.push(member.name);
    });
    if (!memberNames.includes(req.body.user.name)) {
      members.push(newMember);

      await League.findOneAndUpdate(
        { code: leagueCode },
        { members: members }
      ).exec();
    }

    res.status(200).json({ message: "Added user to league" });
  }
}
