import supabase from "../../../../database/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
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

        // Query the "drivers" table to get the first_name, last_name, and price of the drivers
        supabase
          .from("drivers")
          .select("first_name, last_name, price, id")
          .in("id", driverIds)
          .then((response) => res.status(200).json({ drivers: response.data }));
      });
  }

  if (req.method === "PUT") {
    //console.log(req.body);
    await supabase.from("teams").upsert(req.body);
    res.status(200).json({ message: "Team updated" });
    console.log("Team Updated Successfully");
  }

  //   res.status(200).json({ drivers: drivers });
}
