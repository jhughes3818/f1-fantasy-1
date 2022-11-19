import axios from "axios";
import mongoose from "mongoose";
import { Race } from "../database/schemas";

const GetLatestRoundData = (props) => {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri);

  const round = 6;

  axios
    .get(`http://ergast.com/api/f1/current/${round}/results.json`)
    .then((response) => {
      const raceResults = response.data.MRData.RaceTable.Races[0].Results;
      raceResults.forEach((driver) => {
        const results = {
          finishingPosition: driver.position,
          startingPosition: driver.grid,
          points: driver.points,
          positionsGained: driver.grid - driver.position,
        };

        const name = driver.Driver.givenName + " " + driver.Driver.familyName;

        Race.findOneAndUpdate(
          { name: name },
          {
            $push: { results: results },
          }
        ).exec();
      });
    });
};

export default GetLatestRoundData;
