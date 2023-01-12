import { supabase } from "../../../../database/supabaseClient";

export default async function handler(req, res) {
  // Update user's league
  if (req.method === "PUT") {
    const updates = {
      league: req.query.leagueCode,
    };

    // UserID is passed in in the body of the request
    const userID = req.body.user.id;

    const { error } = await supabase
      .from("profiles")
      .upsert(updates)
      .eq("id", userID);

    if (error) {
      console.log(error);
      res.status(500).json({ error: error });
    } else {
      res.status(200).json({ message: "User updated" });
    }
  }
}
