import supabase from "../../../database/supabaseClient";

export default function handler(req, res) {
  if (req.method === "PUT") {
    console.log(req.query.userID);
    const updates = {
      hasTeam: true,
      id: req.query.userID,
    };

    supabase;
    let { error } = supabase
      .from("profiles")
      .upsert(updates)
      .then((response) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: error });
        } else {
          console.log(response);
          res.status(200).json({ message: "User updated" });
        }
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
