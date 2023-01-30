import NewFeedComponent from "../components/feed/NewFeedComponent";
import LayoutShell from "../components/LayoutShell";
import LeagueTable from "../components/leagues/LeagueTable";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { navigationLeague } from "../components/navigation/Navigation";

export default function Dashboard() {
  const session = useSession();
  const [leagueCode, setLeagueCode] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      axios.get(`/api/users/${session.user.id}`).then((response) => {
        setLeagueCode(response.data.league);

        setIsLoading(false);
      });
    }
  }, [session]);

  // const navigation = [
  //   { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: false },
  //   { name: "League", href: "/league", icon: CalendarIcon, current: true },
  //   { name: "Stats", href: "#", icon: UserGroupIcon, current: false },
  // ];

  const navigation = navigationLeague;

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
          <LeagueTable leagueCode={leagueCode} session={session} />
        </>
      )}

      {/* <NewFeedComponent /> */}
    </LayoutShell>
  );
}
