import NewFeedComponent from "../components/feed/NewFeedComponent";
import LayoutShell from "../components/LayoutShell";
import JoinLeague from "../components/leagues/JoinLeague";
import LeagueTable from "../components/leagues/LeagueTable";
import {
  CalendarIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";

export default function Dashboard() {
  const session = useSession();
  const [leagueCode, setLeagueCode] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      axios.get(`/api/users/${session.user.email}`).then((response) => {
        setLeagueCode(response.data.user.league);
        console.log(response.data.user.league);
        setIsLoading(false);
      });
    }
  }, [session]);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: false },
    { name: "League", href: "/league", icon: CalendarIcon, current: true },
    { name: "Stats", href: "#", icon: UserGroupIcon, current: false },
  ];

  return (
    <LayoutShell nav={navigation} session={session}>
      {isLoading ? (
        <div className="grid place-items-center h-full">
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
        <>
          {" "}
          {leagueCode ? (
            <LeagueTable leagueCode={leagueCode} />
          ) : (
            <JoinLeague />
          )}
        </>
      )}

      <NewFeedComponent />
    </LayoutShell>
  );
}
