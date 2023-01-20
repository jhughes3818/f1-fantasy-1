import supabase from "../../../database/supabaseClient";

export default async function handler(req, res) {
  const driverID = req.query.driverID;

  if (req.method === "GET") {
    const driver = await getDriver(driverID);
    res.status(200).json(driver);
  }
}

async function getDriver(driverID) {
  const data = await supabase
    .from("drivers")
    .select("*")
    .eq("id", driverID)
    .then((response) => {
      return response.data;
    });

  return data;
}
