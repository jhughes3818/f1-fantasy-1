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

  async function updateDrivers(nextRound) {
    setCurrentStatus("Started getting race results");
    await axios.put("/api/admin/race-results").then((response) => {
      setCurrentStatus("Updating Driver Round Points");
      axios.put("/api/admin/pricing/DriverRoundPoints").then((response) => {
        setCurrentStatus("Updating Driver Total Points");
        axios.put("/api/admin/pricing/DriverTotalPoints").then((response) => {
          setCurrentStatus("Updating Driver Total Price");
          axios.put("/api/admin/pricing/DriverTotalPrice").then((response) => {
            setCurrentStatus("Updating Driver Round Price");
            axios
              .put("/api/admin/pricing/DriverRoundPrice")
              .then((response) => {
                setCurrentStatus("Updating Driver Averages");
                axios
                  .put("/api/admin/pricing/DriverAverages")
                  .then((response) => {
                    setCurrentStatus("Finished Updating Drivers");
                  });
              });
          });
        });
      });
    });
  }

  async function updateTeamPoints() {
    setCurrentStatus("Updating Team Round Points");
    await axios.put("/api/admin/teams/TeamRoundPoints").then(() => {
      setCurrentStatus("Updating Team Total Points");
      axios.put("/api/admin/TeamTotalPoints").then(() => {
        setCurrentStatus("Finished Updating Teams");
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
              <button
                onClick={() => updateDrivers()}
                className="button-styling"
              >
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
