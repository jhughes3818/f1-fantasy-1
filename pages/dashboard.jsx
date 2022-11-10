import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import NewTeamGrid from "../components/team-build/NewTeamGrid.jsx";
import Example from "../components/Dashboard.jsx";
import Link from "next/link";
import Loading from "../components/Loading.jsx";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import JoinLeague from "../components/leagues/JoinLeague.jsx";
import NewUser from "../components/NewUser.jsx";
import LeagueView from "../components/leagues/LeagueView.jsx";
import { TailSpin, Oval } from "react-loader-spinner";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState();
  const { data: session } = useSession();
  const [isNewUser, setIsNewUser] = useState(false);
  const [league, setLeague] = useState();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", current: true },
    { name: "Edit Team", href: "/edit-team", current: false },
    { name: "League", href: "/league", current: false },
    { name: "Stats", href: "#", current: false },
  ];

  useEffect(() => {
    if (session) {
      axios
        .get(`/api/users/${session.user.email}`)
        .then(function (response) {
          const teamJSON = JSON.stringify(response.data.user.team);
          setTeam(response.data.user.team);
          setLeague(response.data.user.league);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
          setIsNewUser(true);
        });
    }
  }, [session]);

  if (session) {
    if (isNewUser) {
      return <NewUser />;
    } else
      return (
        <Example nav={navigation}>
          {isLoading ? (
            <div className="grid place-items-center h-screen">
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
            </div>
          ) : (
            <div className="md:flex pl-4 md:px-0 gap-2">
              <div>
                {isLoading ? (
                  <div>
                    <Loading />
                  </div>
                ) : (
                  <div className="grid md:place-items-left place-items-center mb-8">
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
              {league ? (
                <div className="px-12 grid place-items-center">
                  <LeagueView leagueCode={league} />
                </div>
              ) : (
                <div className="px-12 grid place-items-center">
                  <JoinLeague showCreate={true} showHome={false} />
                </div>
              )}
            </div>
          )}
        </Example>
      );
  } else {
    return (
      <div className="grid place-items-center h-screen">
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
      </div>
    );
  }
}
