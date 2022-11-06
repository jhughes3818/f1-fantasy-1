import mongoose from "mongoose";
import { Team } from "../../../database/schemas";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri);

  const teams = await Team.find();

  res.status(200).json({ teams: teams });
}
