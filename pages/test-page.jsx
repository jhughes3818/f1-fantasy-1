import NewTeamBuildMobile from "../components/team-build/NewTeamBuildMobile";
import { useSession } from "@supabase/auth-helpers-react";

export default function Test() {
  const session = useSession();

  //Check is session is not null and user is logged in then return NewTeamBuildMobile otherwise return loading spinner
  return session ? (
    <NewTeamBuildMobile />
  ) : (
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
  );
}
