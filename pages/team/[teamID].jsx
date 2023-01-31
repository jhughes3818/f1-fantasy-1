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
import TeamResults from "../../components/teams/TeamResults";
import supabase from "../../database/supabaseClient";

export default function TeamPage() {
  //Team id comes from router
  const router = useRouter();
  // const { userID } = router.query;
  const session = useSession();

  // Get userID from router
  const userID = router.query.teamID;

  // Use react query to get team data from team api endpoint
  const { data, status } = useQuery(["team", userID], () =>
    axios.get(`/api/teams/supabase/${userID}`).then((res) => res.data)
  );

  const { data: teamCode, status: teamCodeStatus } = useQuery(
    ["teamCode", userID],
    () => getTeamCode(userID)
  );

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
        <div>
          <TeamTable team={data} session={session} />
          {teamCodeStatus === "loading" && <div>Loading...</div>}
          {teamCodeStatus === "error" && <div>Error fetching data</div>}
          {teamCode && (
            <div className="p-9">
              <TeamResults teamID={teamCode} />
            </div>
          )}
        </div>
        {/* <h1>Hello</h1> */}
      </LayoutShell>
    );
  }
}

const getTeamCode = async (userID) => {
  const { data, error } = await supabase
    .from("teams")
    .select("id")
    .eq("user_id", userID);

  if (error) {
    return { error: error.message };
  }

  if (data) {
    console.log(data[0].id);
    return data[0].id;
  }
};
