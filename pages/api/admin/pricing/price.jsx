import supabase from "../../../../database/supabaseClient";

export default async function handler(req, res) {
  const drivers = await supabase.from("drivers").select("*");

  const dollarsPerPoint = 10000;
  const baseDollars = 1000000;

  // For each driver, calculate the price based on the points
  const driverPrices = [];
  drivers.data.forEach((driver) => {
    const points = driver.points;
    const price = baseDollars + points * dollarsPerPoint;
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
