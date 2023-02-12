import JoinLeague from "../../components/leagues/JoinLeague";
import Steps from "../../components/misc/Steps";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import axios from "axios";
import Router from "next/router";
import { Oval } from "react-loader-spinner";
import { useState, useEffect } from "react";

const steps = [
  { id: "Step 1", name: "Welcome", href: "#", status: "complete" },
  { id: "Step 2", name: "Build Team", href: "#", status: "complete" },
  { id: "Step 3", name: "Join League", href: "#", status: "current" },
];

export default function JoinLeaguePage(props) {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      console.log(session);
      axios
        .get(`/api/users/${session.user.id}`)
        .then((response) => {
          console.log(response.data.league);
          if (response.data.league_code === null) {
            setIsLoading(false);
          } else {
            Router.push("/");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    // if (session) {
    //   console.log(session);
    // }
  }, [session]);
  return (
    <div className="grid place-items-center h-screen overflow-auto">
      {isLoading ? (
        <Oval
          height={80}
          width={80}
          color="#000000"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#2a2b2a"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      ) : (
        <div>
          <div className="mb-8">
            <Steps steps={steps} />
          </div>
          <div className="gris place-items-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-3">Join A League</h1>
            </div>
            <JoinLeague showSkip={true} showCreate={true} />
          </div>
        </div>
      )}
    </div>
  );
}
