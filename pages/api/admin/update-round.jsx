import GetLatestRoundData from "../../../functions/GetLatestRoundData";
import UpdateTeamPoints from "../../../functions/UpdateTeamPoints";

export default async function handler(req, res) {
  //await GetLatestRoundData();
  console.log("Got round data");

  await UpdateTeamPoints();
  console.log("Updated Points");
  res.status(200).json({ message: "done" });
}
