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

  // For each driver, get the average qualifying position, average finishing position and average overtakes. Then calculate the points for each of these and save to an array with the driver_id as the key.

  const driverPoints = [];
  results.data.forEach((driver) => {
    const qualifyingPosition = driver.qualifying_position;

    const finishingPosition = driver.finishing_position;

    const overtakes = driver.overtakes;

    const qualifyingPoints = qualifyingPointsAwarded(qualifyingPosition);
    const finishingPoints = finishingPointsAwarded(finishingPosition);
    const overtakesPoints = overtakes * overtakesPointsAwarded;

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
      .from("drivers_results")
      .update({
        points: totalPoints(
          driverPoints[i].qualifying,
          driverPoints[i].finishing,
          driverPoints[i].overtakes
        ),
      })
      .eq("ergast_id", driverPoints[i].driver)
      .eq("round", currentRound[0].id);
  }

  res.status(200).json({ message: "success" });
}
