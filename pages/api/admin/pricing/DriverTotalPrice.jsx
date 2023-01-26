import supabase from "../../../../database/supabaseClient";

// This endpoint updates the price of each driver.
// It gets the price of each driver from the drivers table and then updates the price column in the drivers table.

export default async function handler(req, res) {
  const drivers = await supabase.from("drivers").select("*");

  const dollarsPerPoint = 10000;
  const baseDollars = 1000000;

  // For each driver, calculate the price based on the points
  const driverPrices = [];
  drivers.data.forEach((driver) => {
    const points = driver.points;
    const price =
      teamBasePrice(driver.team) +
      pointsCalculator(
        driver.recent_average_qualifying_position,
        driver.recent_average_finishing_points,
        driver.recent_average_overtakes
      ) *
        dollarsPerPoint;
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
      return 1100000;
    case "Ferrari":
      return 1200000;
    case "Red Bull":
      return 1300000;
    case "Alpine F1 Team":
      return 800000;
    case "McLaren":
      return 1000000;
    case "Aston Martin":
      return 1000000;
    case "Alfa Romeo":
      return 800000;
    case "Haas F1 Team":
      return 750000;
    case "Williams":
      return 750000;
    case "AlphaTauri":
      return 800000;
    default:
      return 0;
  }
}

function pointsCalculator(qualifying, finishing, overtakes) {
  let qualifyingPoints = 0;
  switch (qualifying) {
    case 1:
      qualifyingPoints = 25;
    case 2:
      qualifyingPoints = 18;
    case 3:
      qualifyingPoints = 15;
    case 4:
      qualifyingPoints = 12;
    case 5:
      qualifyingPoints = 10;
    case 6:
      qualifyingPoints = 8;
    case 7:
      qualifyingPoints = 6;
    case 8:
      qualifyingPoints = 4;
    case 9:
      qualifyingPoints = 2;
    case 10:
      qualifyingPoints = 1;
    default:
      qualifyingPoints = 0;
  }

  let finishingPoints = 0;
  switch (finishing) {
    case 1:
      finishingPoints = 25;
    case 2:
      finishingPoints = 18;
    case 3:
      finishingPoints = 15;
    case 4:
      finishingPoints = 12;
    case 5:
      finishingPoints = 10;
    case 6:
      finishingPoints = 8;
    case 7:
      finishingPoints = 6;
    case 8:
      finishingPoints = 4;
    case 9:
      finishingPoints = 2;
    case 10:
      finishingPoints = 1;
    default:
      finishingPoints = 0;
  }

  let overtakesPoints = overtakes;

  let totalPoints = qualifyingPoints + finishingPoints + overtakesPoints;
  if (totalPoints > 0) {
    return totalPoints;
  } else {
    return 0;
  }
}
