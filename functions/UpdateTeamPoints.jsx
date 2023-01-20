import mongoose from "mongoose";
import { Race, User } from "../database/schemas";

async function UpdateTeamPoints(props) {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri);

  const driverResults = await Race.find().exec();
  const driverObject = {};
  driverResults.forEach((driver) => {
    driverObject[driver.name] = driver.results[1];
  });

  const users = await User.find().exec();

  users.forEach((user) => {
    let pointsScoredTeam = user.points;
    const team = user.team;
    team.forEach((driver) => {
      const name = driver.name;
      const pointsScored = driverObject[name];

      pointsScoredTeam = pointsScoredTeam + parseInt(pointsScored.points);
    });
    User.findOneAndUpdate(
      { email: user.email },
      { points: pointsScoredTeam }
    ).exec();
  });
}

export default UpdateTeamPoints;
