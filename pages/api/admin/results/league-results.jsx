import supabase from "../../../../database/supabaseClient";

export default async function handler(req, res) {
  // Get all the leagues
  const { data: leagues, error: leaguesError } = await supabase
    .from("leagues")
    .select("*");

  // Get the current round
  const { data: currentRound, error: currentRoundError } = await supabase
    .from("round_status")
    .select("*")
    .eq("current_round", true);

  // Get all the team results for the current round
  const { data: teamResults, error: teamResultsError } = await supabase
    .from("team_results")
    .select("*")
    .eq("round", currentRound[0].id);

  // Get all the teams
  const { data: teams, error: teamsError } = await supabase
    .from("teams")
    .select("*");

  // Get the username from profiles and add it as a property to the team object
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("*");

  // console.log(profiles);

  teams.forEach((team) => {
    const profile = profiles.find((profile) => profile.id === team.user_id);
    team.username = profile.username;
  });

  // console.log(teams);

  //   console.log(teams);
  // For each league, construct an object with the team results in order by points
  for (let i = 0; i < leagues.length; i++) {
    const league = leagues[i];

    // Get the teams in the league
    const leagueTeams = teams.filter((team) => {
      return team.league_code === league.league_code;
    });

    // Get the team results for the league
    const leagueTeamResults = teamResults.filter((result) => {
      return leagueTeams.some((team) => team.id === result.team);
    });

    // Sort the team results by points
    const sortedTeamResults = leagueTeamResults.sort((a, b) => {
      return b.points - a.points;
    });

    let resultObject = [];

    sortedTeamResults.forEach((result) => {
      const newEntry = {
        team_id: result.team,
        team_name: leagueTeams.find((team) => team.id === result.team).username,
        points: result.points,
      };

      resultObject.push(newEntry);
    });

    // Construct the league results object
    const leagueResults = {
      league_code: league.league_code,
      round_name: currentRound[0].round_name,
      league_result: resultObject,
      type: "round",
    };

    // Post this object to the trades table
    const { data: leagueResultsdata, error: leagueResultsError } =
      await supabase.from("trades").insert(leagueResults);
  }

  res.status(200).json({ message: success });
}
