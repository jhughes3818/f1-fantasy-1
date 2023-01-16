import supabase from "../../../../database/supabaseClient";
import { getLatestRound } from "../../rounds/current-round";

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
    console.log(driver.ergast_id);
    const averageQualifyingPosition = driver.qualifying_position;
    console.log("Average qualifying position: " + averageQualifyingPosition);
    const averageFinishingPosition = driver.finishing_position;
    console.log("Average finishing position: " + averageFinishingPosition);
    const averageOvertakes = driver.overtakes;
    console.log("Average overtakes: " + averageOvertakes);

    const qualifyingPoints = qualifyingPointsAwarded(averageQualifyingPosition);
    const finishingPoints = finishingPointsAwarded(averageFinishingPosition);
    const overtakesPoints = averageOvertakes * overtakesPointsAwarded;

    driverPoints.push({
      driver: driver.ergast_id,
      qualifying: qualifyingPoints,
      finishing: finishingPoints,
      overtakes: overtakesPoints,
    });
  });

  console.log(driverPoints);

  // Update points column in driver table with the points for each driver.
  for (let i = 0; i < driverPoints.length; i++) {
    const { data, error } = await supabase
      .from("drivers")
      .update({
        points: totalPoints(
          driverPoints[i].qualifying,
          driverPoints[i].finishing,
          driverPoints[i].overtakes
        ),
      })
      .eq("ergast_id", driverPoints[i].driver);
  }

  res.status(200).json({ message: "success" });
}
