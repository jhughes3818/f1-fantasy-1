import mongoose from "mongoose";
import { User } from "../../database/schemas";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const uri =
  "mongodb+srv://jhughes3818:0bTCnmYr02zEbzFa@cluster0.ituixj2.mongodb.net/f1-data?retryWrites=true";

mongoose.connect(uri);

let team = null;

async function retrieveUser(email) {
  const user = await User.findOne({ email: email }).exec();

  user ? (team = user.team) : (team = []);
}

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  await retrieveUser(session.user.email);

  res.status(200).json({ team: team });
}
