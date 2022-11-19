import mongoose from "mongoose";
import { Race, User } from "../database/schemas";

async function UpdateTeamPoints() {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri);

  const driverResults = await Race.find().exec();
  const driverObject = {};
  driverResults.forEach((driver) => {
    driverObject[driver.name] = driver.results[0];
  });

  console.log(driverObject);
  const users = await User.find().exec();

  users.forEach((user) => {
    let pointsScoredTeam = 0;
    const team = user.team;
    team.forEach((driver) => {
      const name = driver.name;
      const pointsScored = driverObject[name];

      //   console.log(name);
      //   console.log(pointsScored.points);
      pointsScoredTeam = pointsScoredTeam + parseInt(pointsScored.points);
    });
    console.log(user.email);
    console.log(pointsScoredTeam);
    User.findOneAndUpdate(
      { email: user.email },
      { points: pointsScoredTeam }
    ).exec();
  });
}

export default UpdateTeamPoints;
