import supabase from "../../../database/supabaseClient";

export default async function handler(req, res) {
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
          res.status(200).json({ message: "User updated" });
        }
        res.status(200).json({ message: "User updated" });
      });
  }

  if (req.method === "GET") {
    console.log(req.query.userID);

    const user = await supabase
      .from("profiles")
      .select("*")
      .eq("id", req.query.userID);

    if (user.error) {
      console.log(user.error);
      res.status(500).json({ error: user.error });
    }

    res.status(200).json(user.data[0]);
  }
}
