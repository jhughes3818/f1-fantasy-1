import supabase from "../../../database/supabaseClient";
import axios from "axios";

export default async function handler(req, res) {
  const year = 2023;

  const uri = `http://ergast.com/api/f1/${year}.json`;

  const { data } = await axios.get(uri);

  const schedule = data.MRData.RaceTable.Races;

  console.log(schedule);

  for (let i = 0; i < schedule.length; i++) {
    const { data, error } = await supabase
      .from("round_status")
      .insert([
        {
          round_number: schedule[i].round,
          year: schedule[i].season,
          round_name: schedule[i].raceName,
          qualifying_start_date: schedule[i].Qualifying.date,
          qualifying_start_time: schedule[i].Qualifying.time,
          current_round: false,
        },
      ])
      .select("*");

    if (error) {
      console.log(error);
    }
  }

  res.status(200).json({ message: "success" });
}
