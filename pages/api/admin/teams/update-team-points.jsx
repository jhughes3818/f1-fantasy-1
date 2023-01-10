import supabase from "../../../../database/supabaseClient";
import { getLatestRound } from "../../rounds/current-round";

export default async function handler(req, res) {
  const teams = await supabase.from("teams").select("*");

  const teamsObject = teams.data;

  const latestRound = await getLatestRound();
  const roundNumber = latestRound[0].round_number;
  const roundId = latestRound[0].id;
  const roundYear = latestRound[0].year;

  const results = await supabase
    .from("driver_results")
    .select("*")
    .eq("round", roundNumber)
    .eq("year", roundYear);

  const resultsObject = results.data;

  const teamsUpdate = [];

  // For each team, get the rows from results object that match the drivers in the team. Then, add up the points and update the team with the total points.
  teamsObject.forEach((team) => {
    const driver1 = team.driver_1;
    const driver2 = team.driver_2;
    const driver3 = team.driver_3;
    const driver4 = team.driver_4;
    const driver5 = team.driver_5;

    const driver1Results = resultsObject.filter(
      (result) => result.driver_id === driver1
    );
    console.log(driver1Results);
    const driver2Results = resultsObject.filter(
      (result) => result.driver_id === driver2
    );
    const driver3Results = resultsObject.filter(
      (result) => result.driver_id === driver3
    );
    const driver4Results = resultsObject.filter(
      (result) => result.driver_id === driver4
    );
    const driver5Results = resultsObject.filter(
      (result) => result.driver_id === driver5
    );

    const driver1Points = driver1Results.map((result) => result.points);
    console.log(driver1Points);
    const driver2Points = driver2Results.map((result) => result.points);
    const driver3Points = driver3Results.map((result) => result.points);
    const driver4Points = driver4Results.map((result) => result.points);
    const driver5Points = driver5Results.map((result) => result.points);

    const totalPoints =
      driver1Points +
      driver2Points +
      driver3Points +
      driver4Points +
      driver5Points;

    console.log("Total points: " + totalPoints);

    // Add row to teams_result table
    console.log(team.id);
    const { data, error } = supabase.from("team_results").insert([
      {
        team: team.id,
        round: roundId,
        points: totalPoints,
      },
    ]);

    console.log("Inserted row into team_results table");

    // Push updates to teamsUpdate array
    teamsUpdate.push({
      id: team.id,
      points: totalPoints,
    });
  });

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
