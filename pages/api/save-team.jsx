import { User } from "../../database/schemas";
import mongoose from "mongoose";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const uri =
  "mongodb+srv://jhughes3818:0bTCnmYr02zEbzFa@cluster0.ituixj2.mongodb.net/f1-data?retryWrites=true";

mongoose.connect(uri);

async function createTeam(user, team) {
  const existingUser = await User.findOne({ email: user.email }).exec();
  const newUser = new User({
    name: user.name,
    email: user.email,
    team: team,
    cash: 5,
  });
  //console.log(existingUser);
  if (existingUser) {
    User.findOneAndUpdate({ email: user.email }, { team: team }).exec();
  } else {
    newUser.save();
  }
}

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  console.log(req.body);
  await createTeam(session.user, req.body);

  res.status(200).json({ message: "success" });
}
