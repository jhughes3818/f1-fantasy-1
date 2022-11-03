import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import NewTeamGrid from "../components/team-build/NewTeamGrid.jsx";
import Example from "../components/Dashboard.jsx";
import Link from "next/link";
import Loading from "../components/Loading.jsx";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import JoinLeague from "../components/leagues/JoinLeague.jsx";

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      axios.get("/api/users").then(function (response) {
        const teamJSON = JSON.stringify(response.data.team);
        setTeam(response.data.team);

        setIsLoading(false);
      });
    }
  }, [session]);

  if (session) {
    return (
      <Example>
        <div className="md:flex pl-4 md:px-0 gap-2">
          <div>
            {isLoading ? (
              <div>
                <Loading />
                <h1>Loading...</h1>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold mb-3">Your Team</h1>

                <Link href="/edit-team">
                  <span className="flex cursor-pointer w-56">
                    <PencilSquareIcon className="block h-4 w-4" />
                    Edit Team
                  </span>
                </Link>

                <NewTeamGrid
                  drivers={team}
                  showProgressBars={false}
                  showButton={false}
                />
              </div>
            )}
          </div>
          <div className="px-12">
            <JoinLeague showCreate={true} />
          </div>
        </div>
      </Example>
    );
  } else {
    return (
      <div className="grid place-items-center h-screen">
        <div className="box-styling h-36 text-center px-4">
          <h1 className="text-2xl font-bold text-center">
            Hi! Please sign in to continue.
          </h1>
          <button className="box-styling mt-6 p-3" onClick={() => signIn()}>
            Sign in
          </button>
        </div>
      </div>
    );
  }
}
