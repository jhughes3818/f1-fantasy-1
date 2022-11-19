import mongoose from "mongoose";
import { League, User } from "../database/schemas";

export default async function UpdateLeaguePoints() {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri);

  const usersInLeague = await User.findMany({ league: "9153" });

  usersInLeague.forEach((user) => {
    League;
  });
}
