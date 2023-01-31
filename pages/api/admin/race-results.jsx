import axios from "axios";
import { getLatestRound } from "../rounds/current-round";
import supabase from "../../../database/supabaseClient";

export default async function handler(req, res) {
  const drivers = await supabase.from("drivers").select("*");

  getLatestRound().then((data) => {
    const current_round = data[0].round_number;
    const year = data[0].year;
    const url = `https://ergast.com/api/f1/${year}/${current_round}/results.json`;

    axios.get(url).then((response) => {
      const results = response.data.MRData.RaceTable.Races[0].Results;
      let driverIDs = [];
      drivers.data.forEach((driver) => {
        driverIDs.push(driver.ergast_id);
      });

      results.forEach((driver) => {
        const driver_id = driver.Driver.driverId; //ergast_id
        if (driverIDs.includes(driver_id)) {
          driverExists(driver, driver_id, current_round, year);
        } else {
          //add driver to database
          driverDoesNotExist(driver, driver_id, current_round, year);

          //Add a 2 second delay to allow the database to update
          setTimeout(function () {
            driverExists(driver, driver_id, current_round, year);
          }, 2000);

          //driverExists(driver, driver_id, current_round, year);
        }
      });

      //
      res.status(200).json({ message: "success" });
    });
  });
}

async function driverExists(driver, driver_id, current_round, year) {
  const { data, error } = await supabase
    .from("drivers")
    .select("*")
    .eq("ergast_id", driver_id);

  const driverKey = data;

  console.log(driver.grid);

  const qualifyingPoints = qualifyingPointsAwarded(parseInt(driver.grid));
  console.log(qualifyingPoints);
  const finishingPoints = finishingPointsAwarded(parseInt(driver.position));
  console.log(finishingPoints);
  const overtakesPoints = driver.grid - driver.position;

  const points = totalPoints(
    qualifyingPoints,
    finishingPoints,
    overtakesPoints
  );

  const resultObject = {
    ergast_id: driver.Driver.driverId,
    round: current_round,
    year: year,
    driver_id: driverKey[0].id,
    qualifying_position: driver.grid,
    finishing_position: driver.position,
    overtakes: driver.grid - driver.position,
    points: points,
  };

  const { data2, error2 } = await supabase
    .from("driver_results")
    .insert([resultObject]);
}

async function driverDoesNotExist(driver, driver_id, current_round, year) {
  const driverObject = {
    ergast_id: driver.Driver.driverId,
    first_name: driver.Driver.givenName,
    last_name: driver.Driver.familyName,
    team: driver.Constructor.name,
  };

  const { data, error } = await supabase.from("drivers").insert([driverObject]);

  const { data3, error3 } = await supabase
    .from("drivers")
    .select("*")
    .eq("ergast_id", driver.Driver.driverId);

  // const driverKey = data3;

  // const resultObject = {
  //   ergast_id: driver.Driver.driverId,
  //   round: current_round,
  //   year: year,
  //   driver_id: driverKey[0].id,
  //   qualifying_position: driver.grid,
  //   finishing_position: driver.position,
  //   overtakes: driver.grid - driver.position,
  // };

  // const { data2, error2 } = await supabase
  //   .from("driver_results")
  //   .insert([resultObject]);
}
//Steps for saving race results
//Get current list of drivers
//For each driver in results, check if they exist in current list of drivers
//If they do, write their results to the database
//If they don't, add them to the drivers table and then write their results to the database

function qualifyingPointsAwarded(qualifyingPosition) {
  switch (qualifyingPosition) {
    case 1:
      return 25;
    case 2:
      return 18;
    case 3:
      return 15;
    case 4:
      return 12;
    case 5:
      return 10;
    case 6:
      return 8;
    case 7:
      return 6;
    case 8:
      return 4;
    case 9:
      return 2;
    case 10:
      return 1;
    default:
      return 0;
  }
}

function finishingPointsAwarded(finishingPosition) {
  switch (finishingPosition) {
    case 1:
      return 25;
    case 2:
      return 18;
    case 3:
      return 15;
    case 4:
      return 12;
    case 5:
      return 10;
    case 6:
      return 8;
    case 7:
      return 6;
    case 8:
      return 4;
    case 9:
      return 2;
    case 10:
      return 1;
    default:
      return 0;
  }
}

function totalPoints(qualifyingPoints, finishingPoints, overtakesPoints) {
  if (qualifyingPoints + finishingPoints + overtakesPoints >= 0) {
    return qualifyingPoints + finishingPoints + overtakesPoints;
  } else {
    return 0;
  }
}
