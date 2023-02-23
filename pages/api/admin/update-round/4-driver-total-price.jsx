import supabase from "../../../../database/supabaseClient";

// This endpoint updates the price of each driver.
// It gets the price of each driver from the drivers table and then updates the price column in the drivers table.

export default async function handler(req, res) {
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

  const drivers = await supabase.from("drivers").select("*");
  const driverResults = await supabase
    .from("driver_results")
    .select("*")
    .order("round", { ascending: true });

  const dollarsPerPoint = 20000;
  const baseDollars = 1000000;

  // For each driver, calculate the price based on the points
  const driverPrices = [];
  drivers.data.forEach((driver) => {
    // Calculate the average points scored in the last 5 races
    const recentResults = driverResults.data.filter(
      (result) => result.ergast_id === driver.ergast_id
    );
    const recentPoints = recentResults.map((result) => result.points);
    const recentAveragePoints =
      recentPoints.reduce((a, b) => a + b, 0) / recentPoints.length;

    const pointsPrice = recentAveragePoints * dollarsPerPoint;
    const teamPrice = teamBasePrice(driver.team);

    const price = pointsPrice + teamPrice;

    // console.log(driver.ergast_id + " price: " + price);
    driverPrices.push({
      driver: driver.ergast_id,
      price: price,
    });
  });

  // Update price column in driver table with the price for each driver.
  for (let i = 0; i < driverPrices.length; i++) {
    const { data, error } = await supabase
      .from("drivers")
      .update({
        price: driverPrices[i].price,
      })
      .eq("ergast_id", driverPrices[i].driver);
  }

  res.status(200).json({ message: "success" });
}

function teamBasePrice(team) {
  switch (team) {
    case "Mercedes":
      return 4000000;
    case "Ferrari":
      return 4500000;
    case "Red Bull":
      return 5000000;
    case "Alpine F1 Team":
      return 3500000;
    case "McLaren":
      return 3250000;
    case "Aston Martin":
      return 2750000;
    case "Alfa Romeo":
      return 3000000;
    case "Haas F1 Team":
      return 2500000;
    case "Williams":
      return 2000000;
    case "AlphaTauri":
      return 2250000;
    default:
      return 0;
  }
}