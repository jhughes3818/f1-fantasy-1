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
    await axios.put("/api/admin/race-results");

    setCurrentStatus("Updating Driver Round Points");
    await axios.put("/api/admin/pricing/DriverRoundPoints");

    setCurrentStatus("Updating Driver Total Points");
    await axios.put("/api/admin/pricing/DriverTotalPoints");

    setCurrentStatus("Updating Driver Total Price");
    await axios.put("/api/admin/pricing/DriverTotalPrice");

    setCurrentStatus("Updating Driver Round Price");
    await axios.put("/api/admin/pricing/DriverRoundPrice");

    setCurrentStatus("Updating Driver Averages");
    await axios.put("/api/admin/pricing/DriverAverages");

    setCurrentStatus("Finished Updating Drivers");
  }

  async function updateTeamPoints() {
    // setCurrentStatus("Updating Team Round Points");
    // await axios.put("/api/admin/teams/TeamRoundPoints").then(() => {
    //   setCurrentStatus("Updating Team Total Points");
    //   axios.put("/api/admin/teams/TeamTotalPoints").then(() => {
    //     setCurrentStatus("Finished Updating Teams");
    //   });
    // });

    setCurrentStatus("Updating Team Round Points");
    await axios.put("/api/admin/teams/TeamRoundPoints");

    setCurrentStatus("Updating Team Total Points");

    await axios.put("/api/admin/teams/TeamTotalPoints");

    setCurrentStatus("Finished Updating Teams");
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
