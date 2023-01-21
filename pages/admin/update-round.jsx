import { useState } from "react";
import axios from "axios";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import supabase from "../../database/supabaseClient";
import Router from "next/router";

export default function UpdateRound() {
  const [round, setRound] = useState();
  const [done, setDone] = useState();
  const [roundDone, setRoundDone] = useState();
  const [currentStatus, setCurrentStatus] = useState("Not Started");
  const session = useSession();
  const [admin, setAdmin] = useState(false);

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

              axios.put("/api/admin/pricing/updateLatestPoints").then(() => {
                setCurrentStatus("Updated Latest Points");
              });
            });
          });
        });
      });
    });

    setDone(true);
  }

  async function updateTeamPoints() {
    await axios.put("/api/admin/teams/update-team-points").then(() => {
      axios.put("/api/admin/update-round").then(() => {
        setCurrentStatus("Updated Round");
      });
    });
  }

  useEffect(() => {
    if (session) {
      supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .then((response) => {
          if (response.data[0].admin) {
            setAdmin(true);
          } else {
            Router.push("/");
          }
        });
    }
  }, [session]);

  if (session) {
    return (
      <>
        {admin ? (
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
              <button onClick={() => handleClick()} className="button-styling">
                Update Round
              </button>
              <button
                onClick={() => updateTeamPoints()}
                className="button-styling"
              >
                Update Team Points
              </button>
            </div>
          </>
        ) : (
          <h1>No Access</h1>
        )}
      </>
    );
  }
}
