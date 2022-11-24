import NewFeedComponent from "../components/feed/NewFeedComponent";
import LayoutShell from "../components/LayoutShell";
import JoinLeague from "../components/leagues/JoinLeague";
import LeagueTable from "../components/leagues/LeagueTable";
import {
  CalendarIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: false },
    { name: "League", href: "/league", icon: CalendarIcon, current: true },
    { name: "Stats", href: "#", icon: UserGroupIcon, current: false },
  ];

  return (
    <LayoutShell nav={navigation}>
      <LeagueTable />
      <NewFeedComponent />
    </LayoutShell>
  );
}
