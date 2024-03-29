import axios from "axios";
import { getLatestRound } from "../../rounds/current-round";
import supabase from "../../../../database/supabaseClient";

// This endpoint updates the latest price for each driver in the driver_results table.
// It gets the price of each driver from the drivers table and then updates the price column in the driver_results table.

export default async function handler(req, res) {
  //Select current round from database
  const current_round = await getLatestRound();

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
      .eq("round", current_round[0].id);
  }

  res.status(200).json({ message: "done" });
}
