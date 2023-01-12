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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      axios
        .get(`/api/users/${session.user.id}`)
        .then((response) => {
          console.log(response.data.user.league);
          if (response.data.user.league != null) {
            Router.push("/dashboard");
          } else {
            setIsLoading(false);
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
    <div className="grid place-items-center h-screen">
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
          <JoinLeague showSkip={true} showCreate={true} />
        </div>
      )}
    </div>
  );
}
