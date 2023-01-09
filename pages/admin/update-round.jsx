import { useState } from "react";
import axios from "axios";

export default function UpdateRound() {
  const [round, setRound] = useState();
  const [done, setDone] = useState();
  const [roundDone, setRoundDone] = useState();
  const [currentStatus, setCurrentStatus] = useState("Not Started");

  async function handleClick(nextRound) {
    setCurrentStatus("Started");
    await axios.put("/api/admin/race-results").then(() => {
      setCurrentStatus("Downloaded Race Results");

      axios.put("/api/admin/pricing/averages").then(() => {
        setCurrentStatus("Updated Averages");

        axios.put("/api/admin/pricing/points").then(() => {
          setCurrentStatus("Updated Points");

          axios.put("/api/admin/pricing/price").then(() => {
            setCurrentStatus("Updated Prices");

            axios.put("/api/admin/pricing/updateLatestPrice").then(() => {
              setCurrentStatus("Updated Latest Price");

              axios.put("/api/admin/update-round").then(() => {
                setCurrentStatus("Updated Round");
              });
            });
          });
        });
      });
    });

    setDone(true);
  }

  return (
    <>
      {done ? <h1>Done!</h1> : <h1>Not Done Yet!</h1>}
      <div className="grid place-items-center">
        <h1>{round}</h1>
        <h1>{roundDone}</h1>
        <h1>{currentStatus}</h1>
        <input
          className="input-styling"
          placeholder="Latest Round"
          onChange={(e) => setRound(e.target.value)}
        ></input>
        <button onClick={() => handleClick(round)} className="button-styling">
          Update Round
        </button>
        <button onClick={() => handleClick(round)} className="button-styling">
          Update League Points
        </button>
      </div>
    </>
  );
}
