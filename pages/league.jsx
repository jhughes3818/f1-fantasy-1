import NewFeedComponent from "../components/feed/NewFeedComponent";
import LayoutShell from "../components/LayoutShell";
import JoinLeague from "../components/leagues/JoinLeague";
import LeagueTable from "../components/leagues/LeagueTable";
import {
  CalendarIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const { data: session } = useSession();
  const [leagueCode, setLeagueCode] = useState();

  useEffect(() => {
    if (session) {
      axios.get(`/api/users/${session.user.email}`).then((response) => {
        setLeagueCode(response.data.user.league);
        console.log(response.data.user.league);
      });
    }
  }, [session]);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: false },
    { name: "League", href: "/league", icon: CalendarIcon, current: true },
    { name: "Stats", href: "#", icon: UserGroupIcon, current: false },
  ];

  return (
    <LayoutShell nav={navigation}>
      {leagueCode ? <LeagueTable leagueCode={leagueCode} /> : <JoinLeague />}

      <NewFeedComponent />
    </LayoutShell>
  );
}
