import mongoose from "mongoose";
import { Team, Driver } from "../../../database/schemas";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri);

  const teams = await Driver.find();

  res.status(200).json({ teams: teams });
}
