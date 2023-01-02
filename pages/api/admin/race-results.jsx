import axios from "axios";
import { getLatestRound } from "../rounds/current-round";
import supabase from "../../../database/supabaseClient";

export default async function handler(req, res) {
  const drivers = await supabase.from("drivers").select("*");
  console.log(drivers.data);

  getLatestRound().then((data) => {
    console.log(data);
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
      console.log(results);

      //check if value is in array
      //https://stackoverflow.com/questions/237104/how-do-i-check-if-an-array-includes-an-object-in-javascript

      results.forEach((driver) => {
        const driver_id = driver.Driver.driverId; //ergast_id
        if (driverIDs.includes(driver_id)) {
          console.log("driver exists");
          //write results to database
        } else {
          console.log("driver doesn't exist");
          //add driver to database
          insertDriver({
            ergast_id: driver.Driver.driverId,
            first_name: driver.Driver.givenName,
            last_name: driver.Driver.familyName,
            team: driver.Constructor.name,
          });

          // console.log(data);
          // console.log(error);
          //write results to database
        }
      });
      //console.log(results);
      //
    });
  });

  res.status(200).json({ message: "success" });
}

async function insertDriver(driverObject) {
  const { data, error } = await supabase.from("drivers").insert([driverObject]);

  if (error) {
    return error;
  }
  return data;
}

//Steps for saving race results
//Get current list of drivers
//For each driver in results, check if they exist in current list of drivers
//If they do, write their results to the database
//If they don't, add them to the drivers table and then write their results to the database
