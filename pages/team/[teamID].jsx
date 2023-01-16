import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import LayoutShell from "../../components/LayoutShell";
import { useSession } from "@supabase/auth-helpers-react";
import TeamTable from "../../components/teams/TeamTable";
import {
  CalendarIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { navigationTeam } from "../../components/navigation/Navigation";

export default function TeamPage() {
  //Team id comes from router
  const router = useRouter();
  const { teamID } = router.query;
  const session = useSession();

  // Use react query to get team data from team api endpoint
  const { data, status } = useQuery(["team", teamID], () =>
    axios.get(`/api/teams/supabase/${teamID}`).then((res) => res.data)
  );

  console.log(data);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error fetching data</div>;
  }

  //   const navigation = [
  //     { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: false },
  //     { name: "League", href: "/league", icon: CalendarIcon, current: false },
  //     { name: "Stats", href: "#", icon: UserGroupIcon, current: false },
  //     { name: "Team", href: "#", icon: UserGroupIcon, current: true },
  //   ];

  const navigation = navigationTeam;

  if (session) {
    return (
      <LayoutShell nav={navigation} session={session}>
        <TeamTable team={data} session={session} />
        <h1>Hello</h1>
      </LayoutShell>
    );
  }
}
