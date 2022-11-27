import { Race, User, Driver } from "../../../database/schemas";
import mongoose from "mongoose";
import axios from "axios";

const uri = process.env.MONGODB_URI;
mongoose.connect(uri);

//Gets the results from the round entered & saves to races collection

const GetLatestRoundData = async (round) => {
  let results = {};
  let existingDrivers = [];
  const driversObject = await Driver.find();

  driversObject.forEach((driver) => {
    existingDrivers.push(driver.name);
  });

  await axios

    //Get round data from ergast and construct object.
    .get(`http://ergast.com/api/f1/2022/${round}/results.json`)
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

        //Get driver documents and insert latest result

        if (existingDrivers.includes(name)) {
          // const driverDoc = Driver.find({ name: name }).exec();
          let pointsArray = [];
          let seasonPoints = 0;
          let overtakes = 0;
          let overtakesCount = 0;
          let finishingPosition = [];
          let qualifyingPosition = [];
          const resultsArray = driversObject.find(
            (x) => x.name === name
          ).results;

          resultsArray.push(results);

          resultsArray.forEach((result) => {
            seasonPoints = seasonPoints + parseInt(results.points);
            pointsArray.push(parseInt(result.points));
            overtakes = overtakes + parseInt(result.positionsGained);
            overtakesCount = overtakesCount + 1;
            finishingPosition.push(result.finishingPosition);
            qualifyingPosition.push(result.startingPosition);
          });

          console.log(name);
          console.log(pointsArray);
          console.log(seasonPoints);

          Driver.findOneAndUpdate(
            { name: name },
            {
              results: resultsArray,
              seasonPoints: seasonPoints,
              overtakes: overtakes / overtakesCount,
              bestRaceResult: Math.min(...finishingPosition),
              bestQualifyingResult: Math.min(...qualifyingPosition),
            }
          ).exec();
        } else {
          // const newDriver = new Driver({ name: name, results: resultsArray });
          // newDriver.save();
        }
      });
    });
};

//Updates team points with the data from the latest round.
async function UpdateTeamPoints(round) {
  const driverResults = await Race.find().exec();
  const driverObject = {};
  driverResults.forEach((driver) => {
    driverObject[driver.name] = driver.results.slice(-1);
  });

  const users = await User.find().exec();

  users.forEach((user) => {
    let pointsScoredTeam = user.points;
    const team = user.team;
    team.forEach((driver) => {
      const name = driver.name;
      const pointsScored = driverObject[name];

      if (pointsScored) {
        pointsScoredTeam = pointsScoredTeam + parseInt(pointsScored[0].points);
      }
    });

    if (pointsScoredTeam) {
      User.findOneAndUpdate(
        { email: user.email },
        { points: pointsScoredTeam }
      ).exec();
    } else {
      User.findOneAndUpdate(
        {
          email: user.email,
        },
        { points: 0 }
      );
    }
  });
}

export default async function handler(req, res) {
  const roundToGet = req.body.round;
  await GetLatestRoundData(roundToGet);

  await UpdateTeamPoints();

  res.status(200).json({ message: "done", round: roundToGet });
}
