import axios from "axios";

export default function handler(req, res) {
  axios
    .get("http://ergast.com/api/f1/current/last/results.json")
    .then((response) => {
      console.log(response.data.MRData.RaceTable.Races[0].Results[0]);
      res.status(200).json({ message: response.data.MRData.Results });
    });
}
