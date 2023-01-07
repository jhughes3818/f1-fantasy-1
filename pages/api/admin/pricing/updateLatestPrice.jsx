import axios from "axios";
import { getLatestRound } from "../../rounds/current-round";
import supabase from "../../../../database/supabaseClient";

export default async function handler(req, res) {
  //Select current round from database
  const current_round = await getLatestRound();

  console.log(current_round[0].id);

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
