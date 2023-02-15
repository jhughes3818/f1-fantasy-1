import supabase from "../../../../database/supabaseClient";

// This endpoint is called by the admin page to update the results for each team for the current round.

export default async function handler(req, res) {
  const { data: currentRound, error } = await supabase
    .from("round_status")
    .select("*")
    .eq("current_round", true)
    .single();

  console.log(currentRound);

  const hasEnded = currentRound.has_ended;

  if (!hasEnded) {
    res.status(200).json({
      message: "The round has not yet ended. Please try again later.",
    });
    return;
  }

  const teams = await supabase.from("teams").select("*");

  const teamsObject = teams.data;

  const roundNumber = currentRound.round_number;
  const roundId = currentRound.id;
  const roundYear = currentRound.year;

  const results = await supabase
    .from("team_results")
    .select("*")
    .eq("round", roundNumber)
    .eq("year", roundYear);

  // For each team, get the corresponding rows from results object. Then, add up the points and update the team with the total points.
  for (let i = 0; i < teamsObject.length; i++) {
    const team = teamsObject[i];
    const teamId = team.id;

    const results = await supabase
      .from("team_results")
      .select("*")
      .eq("team", teamId);

    const resultsObject = results.data;

    const teamPoints = resultsObject.map((result) => result.points);

    const totalPoints = teamPoints.reduce((a, b) => a + b, 0);

    // Update the teams table with the new points
    const { data, error } = await supabase
      .from("teams")
      .update({
        points: totalPoints,
      })
      .eq("id", teamId);
  }

  // Update the teams table with the new points

  res.status(200).json({ message: "success" });
}
