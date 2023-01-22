import supabase from "../../../../database/supabaseClient";
import { getLatestRound } from "../../rounds/current-round";

// This endpoint is called by the admin page to update the results for each team for the current round.

export default async function handler(req, res) {
  const teams = await supabase.from("teams").select("*");

  const teamsObject = teams.data;

  const latestRound = await getLatestRound();
  const roundNumber = latestRound[0].round_number;
  const roundId = latestRound[0].id;
  const roundYear = latestRound[0].year;

  const results = await supabase
    .from("team_results")
    .select("*")
    .eq("round", roundNumber)
    .eq("year", roundYear);

  const resultsObject = results.data;

  const teamsUpdate = [];

  // For each team, get the corresponding rows from results object. Then, add up the points and update the team with the total points.

  teamsObject.forEach((team) => {
    const teamResults = resultsObject.filter(
      (result) => result.team === team.id
    );

    const teamPoints = teamResults.map((result) => result.points);

    const totalPoints = teamPoints.reduce((a, b) => a + b, 0);

    const teamUpdate = {
      id: team.id,
      points: totalPoints,
    };

    teamsUpdate.push(teamUpdate);
  });

  // Update the teams table with the new points
  for (let i = 0; i < teamsUpdate.length; i++) {
    const { data, error } = await supabase
      .from("teams")
      .update({
        points: teamsUpdate[i].points,
      })
      .eq("id", teamsUpdate[i].id);
  }

  res.status(200).json({ message: "success" });
}
