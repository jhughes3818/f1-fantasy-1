import supabase from "../../../../database/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await supabase
      .from("teams")
      .select("driver_1, driver_2, driver_3, driver_4, driver_5")
      .eq("user_id", req.query.user)
      .then((response) => {
        const drivers = response.data[0];
        console.log(response.data[0]);

        const driverIds = [
          drivers.driver_1,
          drivers.driver_2,
          drivers.driver_3,
          drivers.driver_4,
          drivers.driver_5,
        ];

        console.log(driverIds);

        // Query the "drivers" table to get the first_name, last_name, and price of the drivers
        supabase
          .from("drivers")
          .select("first_name, last_name, price, id, points")
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
