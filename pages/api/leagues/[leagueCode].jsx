import supabase from "../../../database/supabaseClient";

export default async function handler(req, res) {
  const leagueCode = req.query.leagueCode;

  if (req.method === "GET") {
    const users = await supabase
      .from("profiles")
      .select("id, username")
      .eq("league", leagueCode)
      .then((response) => {
        console.log(response.data);
        return response.data;
      });

    // get list of user ids
    const userIds = users.map((user) => user.id);
    console.log(userIds);

    // get list of user teams
    const teams = await supabase
      .from("teams")
      .select("user_id, cash, points")
      .in("user_id", userIds)
      .then((response) => {
        console.log(response.data);
        return response.data;
      });

    // Insert username into teams
    teams.forEach((team) => {
      const user = users.find((user) => user.id === team.user_id);
      team.username = user.username;
    });

    console.log(teams);
    res.status(200).json(teams);
  }
}
