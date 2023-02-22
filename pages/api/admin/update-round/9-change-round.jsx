import supabase from "../../../../database/supabaseClient";

export default async function handler(req, res) {
  // Find the current round, set 'current round' to false, then increment the round number by 1 and set that to 'current round' and set 'editing_allowed' to true
  const { data: currentRound, error: currentRoundError } = await supabase
    .from("round_status")
    .select("*")
    .eq("current_round", true)
    .single();

  const { data: nextRound, error: nextRoundError } = await supabase
    .from("round_status")
    .select("*")
    .eq("round_number", currentRound.round_number + 1)
    .single();

  const { data: updatedCurrentRound, error: updatedCurrentRoundError } =
    await supabase
      .from("round_status")
      .update({ current_round: false })
      .eq("current_round", true)
      .single();

  const { data: updatedNextRound, error: updatedNextRoundError } =
    await supabase
      .from("round_status")
      .update({ current_round: true, editing_allowed: true })
      .eq("round_number", currentRound.round_number + 1)
      .single();

  res.status(200).json({
    message: "The round has been updated.",
  });
}
