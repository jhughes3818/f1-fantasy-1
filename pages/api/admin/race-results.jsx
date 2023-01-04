import axios from "axios";
import { getLatestRound } from "../rounds/current-round";
import supabase from "../../../database/supabaseClient";

export default async function handler(req, res) {
  const drivers = await supabase.from("drivers").select("*");

  getLatestRound().then((data) => {
    const current_round = data[0].round_number;
    const year = data[0].year;
    const url = `https://ergast.com/api/f1/${year}/${current_round}/results.json`;
    console.log(url);
    axios.get(url).then((response) => {
      const results = response.data.MRData.RaceTable.Races[0].Results;
      let driverIDs = [];
      drivers.data.forEach((driver) => {
        driverIDs.push(driver.ergast_id);
      });

      results.forEach((driver) => {
        const driver_id = driver.Driver.driverId; //ergast_id
        if (driverIDs.includes(driver_id)) {
          console.log("driver exists");

          driverExists(driver, driver_id, current_round, year);

          console.log("Added result row");
        } else {
          console.log("driver doesn't exist");
          //add driver to database
          driverDoesNotExist(driver, driver_id, current_round, year);

          console.log(
            "driver added: " +
              driver.Driver.givenName +
              " " +
              driver.Driver.familyName
          );

          console.log("Added result row");
        }
      });
      //console.log(results);
      //
    });
  });

  res.status(200).json({ message: "success" });
}

async function driverExists(driver, driver_id, current_round, year) {
  const { data, error } = await supabase
    .from("drivers")
    .select("*")
    .eq("ergast_id", driver_id);

  const driverKey = data;

  const resultObject = {
    ergast_id: driver.Driver.driverId,
    round: current_round,
    year: year,
    driver_id: driverKey[0].id,
    qualifying_position: driver.grid,
    finishing_position: driver.position,
    overtakes: driver.grid - driver.position,
  };

  const { data2, error2 } = await supabase
    .from("driver_results")
    .insert([resultObject]);
}

async function driverDoesNotExist(driver, driver_id, current_round, year) {
  const { data, error } = await supabase.from("drivers").insert([driverObject]);

  const { data3, error3 } = await supabase
    .from("drivers")
    .select("*")
    .eq("ergast_id", driver_id);

  const driverKey = data3;

  const resultObject = {
    ergast_id: driver.Driver.driverId,
    round: current_round,
    year: year,
    driver_id: driverKey[0].id,
    qualifying_position: driver.grid,
    finishing_position: driver.position,
    overtakes: driver.grid - driver.position,
  };

  const { data2, error2 } = await supabase
    .from("driver_results")
    .insert([resultObject]);
}
//Steps for saving race results
//Get current list of drivers
//For each driver in results, check if they exist in current list of drivers
//If they do, write their results to the database
//If they don't, add them to the drivers table and then write their results to the database
