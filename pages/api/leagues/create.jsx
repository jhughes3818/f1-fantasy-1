import mongoose from "mongoose";
import { League } from "../../../database/schemas";

function generateLeagueCode() {
  const min = Math.ceil(1000);
  const max = Math.floor(10000);
  const code = Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive

  return code;
}

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri);
  if (req.method === "GET") {
    const code = generateLeagueCode();
    console.log(code);
    res.status(200).json({ code: code });
  } else if (req.method === "POST") {
    const code = generateLeagueCode();
    const leagueName = req.body.name;
    await League.create({
      name: leagueName,
      code: code,
      members: [req.body.user],
    });
    res.status(200).json({ leagueName: leagueName, leagueCode: code });
  }
}
