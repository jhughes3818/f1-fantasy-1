import supabase from "../../../database/supabaseClient";

export default async function handler(req, res) {
  let { data: drivers, error } = await supabase
    .from("drivers")
    .select("*")
    .eq("active", true);

  res.status(200).json({ drivers: drivers });
}
