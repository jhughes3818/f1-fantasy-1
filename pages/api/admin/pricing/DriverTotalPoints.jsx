import supabase from "../../../../database/supabaseClient";

// This endpoint is called by the admin page to update the total points of each driver.
// It adds up all the points for the current season and then updates the points column in the drivers table with the result.

export default async function handler(req, res) {
  const drivers = await supabase.from("drivers").select("*");
  const driver_results = await supabase.from("driver_results").select("*");

  console.log("Updating driver points...");
  console.log(drivers.data.length);

  const updates = [];

  // For each driver in the drivers table, get their results from the driver_results table and add up the points
  for (let i = 0; i < drivers.data.length; i++) {
    const driver = drivers.data[i];
    const driver_id = driver.id;

    // Get the results for the current driver
    const driver_results_for_driver = driver_results.data.filter(
      (result) => result.driver_id === driver_id
    );

    // Add up the points from each round and store in the totalPoints variable

    let totalPoints = 0;
    for (let j = 0; j < driver_results_for_driver.length; j++) {
      const result = driver_results_for_driver[j];
      totalPoints += result.points;
    }

    // Add the driver id and the total points to the updates array

    updates.push({
      id: driver_id,
      points: totalPoints,
    });
  }

  const { data, error } = await supabase.from("drivers").upsert(updates);
  res.status(200).json({ message: "success" });
}
