import axios from "axios";
import supabase from "../../../database/supabaseClient";

export default async function handler(req, res) {
  const year = 2022;

  const uri = `http://ergast.com/api/f1/${year}/drivers.json`;

  const { data } = await axios.get(uri);

  const drivers = data.MRData.DriverTable.Drivers;

  console.log(drivers);

  for (let i = 0; i < drivers.length; i++) {
    const { data, error } = await supabase.from("drivers").insert([
      {
        ergast_id: drivers[i].driverId,
        first_name: drivers[i].givenName,
        last_name: drivers[i].familyName,
      },
    ]);

    if (error) {
      console.log(error);
    }
  }
}
