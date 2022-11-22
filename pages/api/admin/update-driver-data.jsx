import { Race, User, Team } from "../../../database/schemas";
import mongoose from "mongoose";

export default async function handler(req, res) {
  mongoose.connect(process.env.MONGODB_URI);

  const teams = await Team.find();
  const races = await Race.find();
  teams.forEach((team) => {
    const drivers = team.drivers;
    drivers.forEach((driver) => {
      let overtakes = null;
      let overtakesCount = 0;
      let points = null;
      let pointsCount = 0;
      races.forEach((race) => {
        if (race.name === driver.name) {
          const results = race.results;
          results.forEach((result) => {
            overtakes = overtakes + result.positionsGained;
            overtakesCount = overtakesCount + 1;
            points = points + parseInt(result.points);
            pointsCount = pointsCount + 1;
          });
        }
      });
      console.log(driver.name);
      console.log(overtakes / overtakesCount);
      console.log(points / pointsCount);
    });
  });

  //Loop through each team
  //For each driver in team
  //Get relevant data & process
  //Construct new 'drivers' object for the team
  //Update team documents
}
