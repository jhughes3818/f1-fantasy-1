import axios from "axios";
import { getLatestRound } from "../rounds/current-round";
import supabase from "../../../database/supabaseClient";

export default async function handler(req, res) {
  //Select current round from database
  const current_round = await getLatestRound();

  //Set the current round to false
  await supabase
    .from("round_status")
    .update({ current_round: false })
    .eq("round_number", current_round[0].round_number);

  res.status(200).json({ message: "done" });
}
