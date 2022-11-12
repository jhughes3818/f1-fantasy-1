import TeamBuildMobile from "../components/TeamBuildMobile.jsx";
import Example from "../components/Dashboard.jsx";
import { useSession, signIn, signOut } from "next-auth/react";
import { Oval } from "react-loader-spinner";
import DriverTrade from "../components/team-build/DriverTrade.jsx";

export default function EditTeam() {
  const { data: session } = useSession();
  const navigation = [
    { name: "Dashboard", href: "/dashboard", current: false },
    { name: "Edit Team", href: "/edit-team", current: true },
    { name: "League", href: "/league", current: false },
    { name: "Stats", href: "#", current: false },
  ];

  if (session) {
    return (
      <Example nav={navigation}>
        <DriverTrade session={session} />
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
