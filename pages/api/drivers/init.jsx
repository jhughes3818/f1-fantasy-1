import { Team, Driver } from "../../../database/schemas";
import mongoose from "mongoose";
import { TeamBuildData } from "../../../components/team-build/TeamBuildData";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri);

  TeamBuildData.forEach((driver) => {
    const newDriver = new Driver({
      id: driver.id,
      name: driver.name,
      team: driver.team,
      seasonPoints: driver.seasonPoints,
      price: driver.price,
      overtakes: driver.overtakes,
      bestRaceResult: driver.bestRaceResult,
      bestQualifyingResult: driver.bestQualifyingResult,
    });

    newDriver.save();
  });

  res.status(200).json({ success: "Added drivers to DB" });
}
