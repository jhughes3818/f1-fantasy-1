import TeamBuildMobile from "../components/TeamBuildMobile.jsx";
import Example from "../components/Dashboard.jsx";
import { useSession, signIn, signOut } from "next-auth/react";
import LeagueView from "../components/leagues/LeagueView.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import JoinLeague from "../components/leagues/JoinLeague.jsx";

export default function EditTeam() {
  const { data: session } = useSession();
  const [league, setLeague] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", current: false },
    { name: "Edit Team", href: "/edit-team", current: false },
    { name: "League", href: "/league", current: true },
    { name: "Stats", href: "#", current: false },
  ];

  useEffect(() => {
    if (session) {
      axios.get(`/api/users/${session.user.email}`).then((response) => {
        setLeague(response.data.user.league);
        setIsLoading(false);
      });
    }
  }, [session]);

  async function leaveLeague() {
    await axios.put(`/api/leagues/leave/${league}`, { user: session.user });
    setLeague(null);
  }

  if (session) {
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
          <div>
            {league ? (
              <div>
                <LeagueView leagueCode={league} />
                <button onClick={leaveLeague} className="button-styling">
                  Leave League
                </button>
              </div>
            ) : (
              <JoinLeague showSkip={false} showCreate={true} />
            )}
          </div>
        )}
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
