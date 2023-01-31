import supabase from "../../../../database/supabaseClient";

export default async function handler(req, res) {
  const drivers = await supabase.from("drivers").select("*");
  const results = await supabase
    .from("driver_results")
    .select("*")
    .order("round", { ascending: false });

  // For each driver, get all the rows from the results table, then calculate the average finishing position, average qualifying position and average overtakes. Save to an array with the driver_id as the key.

  const driverAverages = [];

  for (let i = 0; i < drivers.data.length; i++) {
    const results = await supabase
      .from("driver_results")
      .select("*")
      .eq("ergast_id", drivers.data[i].ergast_id);
    const qualifyingPositions = results.data.map(
      (result) => result.qualifying_position
    );
    const finishingPositions = results.data.map(
      (result) => result.finishing_position
    );
    const overtakes = results.data.map((result) => result.overtakes);

    // Calculate the average qualifying position, average finishing position and average overtakes. If there are no results, set the average to 0.

    const averageQualifyingPosition =
      qualifyingPositions.length > 0
        ? qualifyingPositions.reduce((a, b) => a + b) /
          qualifyingPositions.length
        : 0;
    const averageFinishingPosition =
      finishingPositions.length > 0
        ? finishingPositions.reduce((a, b) => a + b) / finishingPositions.length
        : 0;
    const averageOvertakes =
      overtakes.length > 0
        ? overtakes.reduce((a, b) => a + b) / overtakes.length
        : 0;

    driverAverages.push({
      driver: drivers.data[i].ergast_id,
      qualifying: averageQualifyingPosition,
      finishing: averageFinishingPosition,
      overtakes: averageOvertakes,
    });

    calculateDriverAverages(drivers.data[i].ergast_id, results);
  }

  // Now, update each driver with the average qualifying position, average finishing position and average overtakes.
  for (let i = 0; i < driverAverages.length; i++) {
    const { data, error } = await supabase
      .from("drivers")
      .update({
        average_qualifying_position: driverAverages[i].qualifying,
        average_finishing_position: driverAverages[i].finishing,
        average_overtakes: driverAverages[i].overtakes,
      })
      .eq("ergast_id", driverAverages[i].driver);
  }

  res.status(200).json({ message: "success" });
}

// Function to calculate the average qualifying position, average finishing position and average overtakes for each driver from the most recent 5 races. This is run once a week to update the driver averages.

async function calculateDriverAverages(ergast_id, results) {
  // Get the most recent 5 results for the driver.
  results = results.data.slice(0, 5);

  console.log(results);

  const qualifyingPositions = results.map(
    (result) => result.qualifying_position
  );
  const finishingPositions = results.map((result) => result.finishing_position);
  const overtakes = results.map((result) => result.overtakes);

  const averageQualifyingPosition =
    qualifyingPositions.length > 0
      ? qualifyingPositions.reduce((a, b) => a + b) / qualifyingPositions.length
      : 0;

  const averageFinishingPosition =
    finishingPositions.length > 0
      ? finishingPositions.reduce((a, b) => a + b) / finishingPositions.length
      : 0;

  const averageOvertakes =
    overtakes.length > 0
      ? overtakes.reduce((a, b) => a + b) / overtakes.length
      : 0;

  const { data: driver, error: driverError } = await supabase
    .from("drivers")
    .update({
      recent_average_qualifying_position: averageQualifyingPosition,
      recent_average_finishing_position: averageFinishingPosition,
      recent_average_overtakes: averageOvertakes,
    })
    .eq("ergast_id", ergast_id);

  if (driverError) {
    console.log(driverError);
  }

  return driver;
}
