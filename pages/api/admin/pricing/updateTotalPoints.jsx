import supabase from "../../../../database/supabaseClient";

// This endpoint is called by the admin page to update the total points of each driver.
// It adds up all the points for the current season and then updates the points column in the drivers table with the result.

export default async function handler(req, res) {
  const drivers = await supabase.from("drivers").select("*");

  for (let i = 0; i < drivers.data.length; i++) {
    console.log(drivers.data[i]);

    const driverResults = await supabase
      .from("driver_results")
      .select("*")
      .eq("ergast_id", drivers.data[i].ergast_id);

    console.log(driverResults.data);

    let totalPoints = 0;
    for (let j = 0; j < driverResults.data.length; j++) {
      totalPoints += driverResults.data[j].points;
    }

    const { data, error } = await supabase
      .from("drivers")
      .update({
        points: totalPoints,
      })
      .eq("ergast_id", drivers.data[i].ergast_id);
  }

  res.status(200).json({ message: "success" });
}
