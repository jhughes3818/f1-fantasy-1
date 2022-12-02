import Layout from "../components/Layout";
import NewTeamBuildMobile from "../components/team-build/NewTeamBuildMobile";
import SupaBaseTest from "../components/test-components/supabaseTest";
import Team from "../components/supabase-auth/Team";
import { useSession } from "@supabase/auth-helpers-react";

export default function Test() {
  const session = useSession();
  return (
    <div className="grid place-items-center h-screen">
      {session ? <NewTeamBuildMobile /> : null}
    </div>
  );
}
