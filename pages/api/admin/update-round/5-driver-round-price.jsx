// This endpoint updates the latest price for each driver in the driver_results table.
// It gets the price of each driver from the drivers table and then updates the price column in the driver_results table.

export default async function handler(req, res) {
  //Select current round from database
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

  // Get the price of each driver
  const drivers = await supabase.from("drivers").select("*");

  // For each driver, insert the price into the row in driver_results that matches the ergast_id and round

  for (let i = 0; i < drivers.data.length; i++) {
    const { data, error } = await supabase
      .from("driver_results")
      .update({
        price: drivers.data[i].price,
      })
      .eq("ergast_id", drivers.data[i].ergast_id)
      .eq("round", currentRound.id);
  }

  res.status(200).json({ message: "done" });
}
