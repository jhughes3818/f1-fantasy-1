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
    const driver_results_for_driver = driver_results.data.filter(
      (result) => result.driver_id === driver_id
    );

    console.log(driver_results_for_driver);

    let totalPoints = 0;
    for (let j = 0; j < driver_results_for_driver.length; j++) {
      const result = driver_results_for_driver[j];
      totalPoints += result.points;
    }

    console.log(driver.name, totalPoints);

    updates.push({
      id: driver_id,
      points: totalPoints,
    });
  }

  const { data, error } = await supabase.from("drivers").upsert(updates);
  res.status(200).json({ message: "success" });
}

function teamBasePrice(team) {
  switch (team) {
    case "Mercedes":
      return 100;
    case "Ferrari":
      return 90;
    case "Red Bull":
      return 80;
    case "Alpine F1 Team":
      return 70;
    case "McLaren":
      return 60;
    case "Aston Martin":
      return 50;
    case "Alfa Romeo":
      return 40;
    case "Haas F1 Team":
      return 30;
    case "Williams":
      return 20;
    case "Alpha Tauri":
      return 10;
    default:
      return 0;
  }
}
