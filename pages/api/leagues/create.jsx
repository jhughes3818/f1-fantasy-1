import supabase from "../../../database/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, user } = req.body;
    const { data, error } = await supabase
      .from("leagues")
      .insert([{ name: name }])
      .select();
    if (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    } else if (data) {
      console.log(data);
      res.status(200).json({ leagueCode: data[0].id });
    }
  }
}
