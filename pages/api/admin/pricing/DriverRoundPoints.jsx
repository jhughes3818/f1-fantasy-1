import supabase from "../../../../database/supabaseClient";
import { getLatestRound } from "../../rounds/current-round";

// This endpoint is called by the admin page to calculate a price for each driver.
// It gets all of the driver's results from the driver_results table and then adds up all the points

export default async function handler(req, res) {
  const drivers = await supabase.from("drivers").select("*");
  const currentRound = await getLatestRound();
  const results = await supabase
    .from("driver_results")
    .select("*")
    .eq("round", currentRound[0].id);

  const overtakesPointsAwarded = 1;
  // const qualifyingPointsAwarded = 2;
  // const finishingPointsAwarded = 3;

  function qualifyingPointsAwarded(qualifyingPosition) {
    if (qualifyingPosition === 1) return 50;
    if (qualifyingPosition === 20) return 0;
    else {
      const points =
        (50 * Math.log10(20 / qualifyingPosition)) / Math.log10(20);
      return Math.round(points);
    }
  }

  function finishingPointsAwarded(position) {
    if (qualifyingPosition === 1) return 50;
    if (qualifyingPosition === 20) return 0;
    else {
      const points =
        (50 * Math.log10(20 / qualifyingPosition)) / Math.log10(20);
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

  // For each driver, get the average qualifying position, average finishing position and average overtakes. Then calculate the points for each of these and save to an array with the driver_id as the key.

  const driverPoints = [];
  results.data.forEach((driver) => {
    const qualifyingPosition = driver.qualifying_position;

    const finishingPosition = driver.finishing_position;

    const overtakes = driver.overtakes;

    console.log(driver.ergast_id);

    const qualifyingPoints = qualifyingPointsAwarded(qualifyingPosition);
    const finishingPoints = finishingPointsAwarded(finishingPosition);
    const overtakesPoints = overtakes * overtakesPointsAwarded;

    console.log(
      driver.ergast_id,
      qualifyingPoints,
      finishingPoints,
      overtakesPoints
    );

    driverPoints.push({
      driver: driver.ergast_id,
      qualifying: qualifyingPoints,
      finishing: finishingPoints,
      overtakes: overtakesPoints,
    });
  });

  // Update points column in driver_results table with the points calculated above
  for (let i = 0; i < driverPoints.length; i++) {
    const { data, error } = await supabase
      .from("driver_results")
      .update({
        points: totalPoints(
          driverPoints[i].qualifying,
          driverPoints[i].finishing,
          driverPoints[i].overtakes
        ),
      })
      .eq("ergast_id", driverPoints[i].driver)
      .eq("round", currentRound[0].id);

    if (error) {
      console.log(error);
    }
  }

  res.status(200).json({ message: "success" });
}
