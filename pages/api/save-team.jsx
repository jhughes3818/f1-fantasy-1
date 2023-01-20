import { User } from "../../database/schemas";
import mongoose from "mongoose";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const uri = process.env.MONGODB_URI;

mongoose.connect(uri);

async function createTeam(user, team, cash) {
  const existingUser = await User.findOne({ email: user.email }).exec();
  const newUser = new User({
    name: user.name,
    email: user.email,
    team: team,
    cash: cash,
  });

  if (existingUser) {
    User.findOneAndUpdate(
      { email: user.email },
      { team: team, cash: cash }
    ).exec();
  } else {
    newUser.save();
  }
}

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  await createTeam(session.user, req.body.drivers, req.body.cash);

  res.status(200).json({ message: "success" });
}
