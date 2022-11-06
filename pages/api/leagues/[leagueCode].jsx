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
    const newMember = {
      name: req.body.user.name,
      email: req.body.user.email,
      points: 0,
    };
    //const newMember = req.body.user;
    const league = await League.findOne({ code: leagueCode }).exec();
    const members = league.members;
    let memberEmails = [];
    members.forEach((member) => {
      memberEmails.push(member.email);
    });
    console.log(memberEmails);
    if (memberEmails.includes(req.body.user.email) === false) {
      members.push(newMember);

      await League.findOneAndUpdate(
        { code: leagueCode },
        { members: members }
      ).exec();
    }

    res.status(200).json({ message: "Added user to league" });
  }
}
