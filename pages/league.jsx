import TeamBuildMobile from "../components/TeamBuildMobile.jsx";
import Example from "../components/Dashboard.jsx";
import { useSession, signIn, signOut } from "next-auth/react";
import LeagueView from "../components/leagues/LeagueView.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";

export default function EditTeam() {
  const { data: session } = useSession();
  const [league, setLeague] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      axios.get(`/api/users/${session.user.email}`).then((response) => {
        setLeague(response.data.user.league);
        setIsLoading(false);
      });
    }
  }, [session]);

  async function leaveLeague() {
    axios.put(`/api/leagues/leave/${league}`, { user: session.user });
  }

  if (session) {
    return (
      <Example>
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
            <LeagueView leagueCode={league} />
            <button onClick={leaveLeague} className="button-styling">
              Leave League
            </button>
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
