import { useState } from "react";
import axios from "axios";

export default function UpdateRound() {
  const [round, setRound] = useState();
  const [done, setDone] = useState();
  const [roundDone, setRoundDone] = useState();

  async function handleClick(nextRound) {
    axios.put("/api/admin/update-round", { round: round }).then((response) => {
      if (response.status === 200) {
        setDone(true);
        setRoundDone(response.data.round);
        console.log(response.data.round);
      }
    });
  }

  return (
    <>
      {done ? <h1>Done!</h1> : <h1>Not Done Yet!</h1>}
      <div className="grid place-items-center">
        <h1>{round}</h1>
        <h1>{roundDone}</h1>
        <input
          className="input-styling"
          placeholder="Latest Round"
          onChange={(e) => setRound(e.target.value)}
        ></input>
        <button onClick={() => handleClick(round)} className="button-styling">
          Get Latest Data
        </button>
        <button onClick={() => handleClick(round)} className="button-styling">
          Update League Points
        </button>
      </div>
    </>
  );
}
