import supabase from "../../../../../database/supabaseClient";

export default function handler(req, res) {
  if (req.method === "POST") {
    console.log("Updating Team");
    console.log(req.body);
    console.log(req.query.user);

    // Update the team with the new drivers
    supabase
      .from("teams")
      .update({
        driver_1: req.body.driver_1,
        driver_2: req.body.driver_2,
        driver_3: req.body.driver_3,
        driver_4: req.body.driver_4,
        driver_5: req.body.driver_5,
        cash: req.body.cash,
      })
      .eq("user_id", req.query.user)
      .then((response) => {
        console.log(response);
      });

    res.status(200).json({ message: "Team updated" });
  }
}
