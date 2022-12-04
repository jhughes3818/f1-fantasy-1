import supabase from "../../../../database/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    let drivers = null;

    await supabase
      .from("teams")
      .select("driver_1, driver_2, driver_3, driver_4, driver_5")
      .eq("user_id", req.query.user)
      .then((response) => {
        // Get the list of driver IDs from the response data
        const driverIds = response.data.map((team) => [
          team.driver_1,
          team.driver_2,
          team.driver_3,
          team.driver_4,
          team.driver_5,
        ]);

        let cash = null;
        supabase
          .from("teams")
          .select("cash")
          .eq("user_id", req.query.user)
          .then((response) => {
            cash = response.data[0].cash;
          });

        // Query the "drivers" table to get the first_name, last_name, and price of the drivers
        supabase
          .from("drivers")
          .select("first_name, last_name, price, id")
          .in("id", driverIds)
          .then((response) =>
            res.status(200).json({ drivers: response.data, cash: cash })
          );
      });
  }

  if (req.method === "PUT") {
    const { driver_1, driver_2, driver_3, driver_4, driver_5, cash } = req.body;

    console.log(driver_1, driver_2, driver_3, driver_4, driver_5, cash);

    //Get the team id based on the user id
    let teamId = null;
    await supabase
      .from("teams")
      .select("id")
      .eq("user_id", req.query.user)
      .then((response) => {
        teamId = response.data[0].id;
      });

    const updates = {
      id: teamId,
      driver_1: driver_1.id,
      driver_2: driver_2.id,
      driver_3: driver_3.id,
      driver_4: driver_4.id,
      driver_5: driver_5.id,
      cash: cash,
      user_id: req.query.user,
      updated_at: new Date().toISOString(),
    };

    let { error } = await supabase.from("teams").upsert(updates);
    if (error) throw error;
    res.status(200).json({ message: "Team updated!" });
  }
}
