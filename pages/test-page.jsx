import Layout from "../components/Layout";
import NewTeamBuildMobile from "../components/team-build/NewTeamBuildMobile";
import SupaBaseTest from "../components/test-components/supabaseTest";

export default function Test() {
  return (
    <div className="grid place-items-center h-screen">
      <SupaBaseTest />
    </div>
  );
}
