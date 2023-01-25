import supabase from "../../../../database/supabaseClient";

export default async function handler(req, res) {
  const driverID = req.query.driverID;
  console.log(driverID);

  const { data, error } = await supabase
    .from("driver_results")
    .select("*")
    .eq("driver_id", driverID);

  if (error) {
    return { error: error.message };
  }

  if (data) {
    res.status(200).json({ data: data });
  }
}
