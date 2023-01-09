import supabase from "../../../database/supabaseClient";

export default async function handler(req, res) {
  const current_round = await getLatestRound();
  console.log(current_round);

  res.status(200).json({ current_round: current_round });
}

async function getLatestRound() {
  const data = await supabase
    .from("round_status")
    .select("*")
    .eq("current_round", true)
    .then((response) => {
      console.log(response.data);
      return response.data;
    });

  return data;
}

export { getLatestRound };
