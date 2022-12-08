import supabase from "../../../database/supabaseClient";

export default function handler(req, res) {
  if (req.method === "PUT") {
    supabase
      .from("profiles")
      .update({ league: req.body?.league, hasTeam: true })
      .eq("id", req.query)
      .then((response) => {
        res.status(200).json({ message: "Successfully joined league" });
      });
  }

  if (req.method === "GET") {
    console.log(req.query.userID);
    supabase
      .from("profiles")
      .select("*")
      .eq("id", req.query.userID)
      .then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          res.status(200).json({ user: response.data[0] });
        } else {
          res.status(204).json({});
        }
      });
  }
}
