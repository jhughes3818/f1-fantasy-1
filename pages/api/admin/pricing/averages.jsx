import supabase from "../../../../database/supabaseClient";

export default async function handler(req, res) {
  const drivers = await supabase.from("drivers").select("*");
  console.log(drivers.data);

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
    const averageQualifyingPosition =
      qualifyingPositions.reduce((a, b) => a + b) / qualifyingPositions.length;
    const averageFinishingPosition =
      finishingPositions.reduce((a, b) => a + b) / finishingPositions.length;
    const averageOvertakes =
      overtakes.reduce((a, b) => a + b) / overtakes.length;
    driverAverages.push({
      driver: drivers.data[i].ergast_id,
      qualifying: averageQualifyingPosition,
      finishing: averageFinishingPosition,
      overtakes: averageOvertakes,
    });
  }
  console.log(driverAverages);

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

  req.status(200).json({ message: "success" });
}
