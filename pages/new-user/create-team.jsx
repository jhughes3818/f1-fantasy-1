import { useState, useEffect } from "react";

import Steps from "../../components/misc/Steps";
import NewTeamBuildMobile from "../../components/team-build/NewTeamBuildMobile";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import axios from "axios";
import Router from "next/router";
import { Oval } from "react-loader-spinner";

const steps = [
  { id: "Step 1", name: "Welcome", href: "#", status: "complete" },
  { id: "Step 2", name: "Build Team", href: "#", status: "current" },
  { id: "Step 3", name: "Join League", href: "#", status: "upcoming" },
];

export default function CreateTeam() {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (session) {
  //     axios
  //       .get(`/api/users/${session.user.email}`)
  //       .then((response) => {
  //         if (response.status === 204) {
  //           setIsLoading(false);
  //         } else {
  //           Router.push("/dashboard");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   }
  // }, [session]);
  return (
    <>
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
          <div className="">
            <div className="mb-6">
              <Steps steps={steps} />
            </div>
            <h1 className="text-3xl mb-6 text-center font-bold">
              Create Your Team
            </h1>
            {/* <TeamBuildMobile isNewUser={true} /> */}
            <NewTeamBuildMobile isNewUser={true} />
          </div>
        )}
      </div>
    </>
  );
}
