import supabase from "../../../../database/supabaseClient";

export default async function handler(req, res) {
  const drivers = await supabase.from("drivers").select("*");

  const overtakesPointsAwarded = 1;
  const qualifyingPointsAwarded = 2;
  const finishingPointsAwarded = 3;

  // For each driver, get the average qualifying position, average finishing position and average overtakes. Then calculate the points for each of these and save to an array with the driver_id as the key.

  const driverPoints = [];
  drivers.data.forEach((driver) => {
    const averageQualifyingPosition = driver.average_qualifying_position;
    const averageFinishingPosition = driver.average_finishing_position;
    const averageOvertakes = driver.average_overtakes;

    const qualifyingPoints =
      averageQualifyingPosition * qualifyingPointsAwarded;
    const finishingPoints = averageFinishingPosition * finishingPointsAwarded;
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
        points:
          driverPoints[i].qualifying +
          driverPoints[i].finishing +
          driverPoints[i].overtakes,
      })
      .eq("ergast_id", driverPoints[i].driver);
  }

  res.status(200).json({ message: "success" });
}
