import { Team } from "../../../database/schemas";
import mongoose from "mongoose";
import { TeamBuildDataDB } from "../../../components/team-build/TeamBuildData";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri);

  TeamBuildDataDB.forEach((team) => {
    console.log(team[0].drivers);
    const newTeam = new Team({
      name: team[0].name,
      drivers: team[0].drivers,
    });

    //console.log(newTeam);
    //newTeam.save();
  });

  res.status(200).json({ success: "Added drivers to DB" });
}
