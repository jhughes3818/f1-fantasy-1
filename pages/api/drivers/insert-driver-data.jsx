import { TeamBuildData } from "../../../components/team-build/TeamBuildData";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Iterate over each driver object in the TeamBuildData array
  for (const driver of TeamBuildData) {
    // Insert the driver data into the "drivers" table in the database
    const { data, error } = await supabase.from("drivers").insert([
      {
        first_name: driver.first_name,
        last_name: driver.last_name,
        team: driver.team,
        points: driver.points,
        price: driver.price,
      },
    ]);

    if (error) {
      // Handle the error
      console.error(error);
    } else {
      console.log("Inserted driver");
    }
  }

  res.status(200).json({ message: "success" });
}
