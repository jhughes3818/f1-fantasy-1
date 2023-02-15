import supabase from "../../../../database/supabaseClient";

export default async function handler(req, res) {
  const { data: currentRound, error } = await supabase
    .from("round_status")
    .select("*")
    .eq("current_round", true)
    .single();

  const round_end_date = currentRound.date;
  const round_end_time = currentRound.time;

  // combine the date and time into a single UTC timestamp
  const roundEndTime = new Date(`${round_end_date}T${round_end_time}Z`);

  // check if the round has ended (i.e. if the current time is past the round end time)
  const hasEnded = Date.now() >= roundEndTime.getTime();

  // if the round has ended, update the round_status table to set 'has_ended' to true
  if (hasEnded) {
    const { data, error } = await supabase
      .from("round_status")
      .update({ has_ended: true })
      .eq("current_round", true)
      .single();
  } else {
    res.status(200).json({
      message: "The round has not yet ended. Please try again later.",
    });
    return;
  }

  res.status(200).json({
    message: "The round has ended.",
  });
}
