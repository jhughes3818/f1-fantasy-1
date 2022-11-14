import axios from "axios";
import mongoose from "mongoose";
import { Race } from "../../../database/schemas";

export default function handler(req, res) {
  const uri = process.env.MONGODB_URI;

  mongoose.connect(uri);

  //   axios
  //     .get("http://ergast.com/api/f1/current/last/results.json")
  //     .then((response) => {
  //       const raceResults = response.data.MRData.RaceTable.Races[0].Results;
  //       console.log(raceResults);

  //       const driverResults = [];

  //       raceResults.forEach((driver) => {
  //         const newDriver = new Race({
  //           name: driver.Driver.givenName + " " + driver.Driver.familyName,
  //           result: [
  //             {
  //               finishingPosition: driver.position,
  //               startingPosition: driver.grid,
  //               points: driver.points,
  //               positionsGained: driver.grid - driver.position,
  //             },
  //           ],
  //         });

  //         newDriver.save();

  //         const driverObject = {
  //           name: driver.Driver.givenName + " " + driver.Driver.familyName,
  //           result: [
  //             {
  //               finishingPosition: driver.position,
  //               startingPosition: driver.grid,
  //               points: driver.points,
  //               positionsGained: driver.grid - driver.position,
  //             },
  //           ],
  //         };
  //         driverResults.push(driverObject);
  //       });

  const rounds = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  ];

  rounds.forEach((round) => {
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

          //   Race.findOneAndUpdate(
          //     { name: name },
          //     {
          //       $push: { results: results },
          //     }
          //   ).exec();
        });
      });
  });

  res.status(200).json({ message: "success" });
}
