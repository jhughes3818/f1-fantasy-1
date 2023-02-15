import axios from "axios";

import supabase from "../../../../database/supabaseClient";

// This endpoint downloads the latest race results from Ergast and updates the driver_results table in the database with each drivers result and the points awarded for that result

export default async function handler(req, res) {
  const drivers = await supabase.from("drivers").select("*");

  const { data: currentRound, error } = await supabase
    .from("round_status")
    .select("*")
    .eq("current_round", true)
    .single();

  console.log(currentRound);

  const hasEnded = currentRound.has_ended;

  if (!hasEnded) {
    res.status(200).json({
      message: "The round has not yet ended. Please try again later.",
    });
    return;
  }

  const current_round = currentRound.round_number;
  const year = currentRound.year;
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
}

async function driverExists(driver, driver_id, current_round, year) {
  const { data, error } = await supabase
    .from("drivers")
    .select("*")
    .eq("ergast_id", driver_id);

  const driverKey = data;

  // console.log(driver.grid);

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
}

const maxPoints = 40;

function qualifyingPointsAwarded(qualifyingPosition) {
  if (qualifyingPosition === 1) return maxPoints;
  if (qualifyingPosition === 20) return 0;
  else {
    const points =
      (maxPoints * Math.log10(20 / qualifyingPosition)) / Math.log10(20);
    return Math.round(points);
  }
}

function finishingPointsAwarded(finishingPosition) {
  if (finishingPosition === 1) return maxPoints;
  if (finishingPosition === 20) return 0;
  else {
    const points =
      (maxPoints * Math.log10(20 / finishingPosition)) / Math.log10(20);
    return Math.round(points);
  }
}

function totalPoints(qualifyingPoints, finishingPoints, overtakesPoints) {
  if (qualifyingPoints + finishingPoints + overtakesPoints >= 0) {
    return qualifyingPoints + finishingPoints + overtakesPoints;
  } else {
    return 0;
  }
}
