import supabase from "../../../../database/supabaseClient";

export default async function handler(req, res) {
  const { data: currentRound, error } = await supabase
    .from("round_status")
    .select("*")
    .eq("current_round", true)
    .single();

  const round_end_date = currentRound.qualifying_start_date;
  const round_end_time = currentRound.qualifying_start_time;

  // combine the date and time into a single UTC timestamp
  const roundEndTime = new Date(`${round_end_date}T${round_end_time}Z`);

  console.log(roundEndTime);

  // check if the round has ended (i.e. if the current time is past the round end time)
  const hasEnded = Date.now() >= roundEndTime.getTime();

  console.log(Date.now());
  console.log(hasEnded);

  // If hasEnded, set editing_allowed to false

  if (hasEnded) {
    const { data, error } = await supabase
      .from("round_status")
      .update({ editing_allowed: false })
      .eq("current_round", true)
      .single();
  }

  res.status(200).json({
    message: "The round has ended.",
  });
}
