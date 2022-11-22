import { Race, User } from "../../../database/schemas";
import mongoose from "mongoose";
import axios from "axios";

const uri = process.env.MONGODB_URI;
mongoose.connect(uri);

const GetLatestRoundData = async (round) => {
  let results = {};

  await axios
    .get(`http://ergast.com/api/f1/current/${round}/results.json`)
    .then((response) => {
      const raceResults = response.data.MRData.RaceTable.Races[0].Results;
      raceResults.forEach((driver) => {
        results = {
          finishingPosition: driver.position,
          startingPosition: driver.grid,
          points: driver.points,
          positionsGained: driver.grid - driver.position,
        };

        const name = driver.Driver.givenName + " " + driver.Driver.familyName;

        const driverObject = Race.findOne({ name: name }).exec();

        if (driverObject) {
          Race.findOneAndUpdate(
            { name: name },
            {
              $push: { results: results },
            }
          ).exec();
        } else {
          const newDriver = new Race({ name: name, results: results });
          newDriver.save;
        }
      });
    });
};

async function UpdateTeamPoints(round) {
  const driverResults = await Race.find().exec();
  const driverObject = {};
  driverResults.forEach((driver) => {
    driverObject[driver.name] = driver.results[1];
  });

  console.log(driverObject);
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

export default async function handler(req, res) {
  const roundToGet = req.body.round;
  await GetLatestRoundData(roundToGet);
  console.log("Got round data");

  //await UpdateTeamPoints();
  console.log("Updated Points");
  console.log(roundToGet);
  res.status(200).json({ message: "done", round: roundToGet });
}
