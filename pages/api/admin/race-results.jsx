import axios from "axios";
import { getLatestRound } from "../rounds/current-round";

export default function handler(req, res) {
  getLatestRound().then((data) => {
    console.log(data);
    const current_round = data[0].round_number;
    const year = data[0].year;
    const url = `https://ergast.com/api/f1/${year}/${current_round}/results.json`;
    console.log(url);
    axios.get(url).then((response) => {
      const results = response.data.MRData.RaceTable.Races[0].Results;
      console.log(results);
      //
    });
  });

  res.status(200).json({ message: "success" });
}
