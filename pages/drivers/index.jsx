import LayoutShell from "../../components/LayoutShell";
import DriverGrid from "../../components/drivers/DriverGrid";
import {
  navigationTeam,
  navigationDrivers,
} from "../../components/navigation/Navigation";
import { useSession } from "@supabase/auth-helpers-react";
import DriverTrade from "../../components/team-build/DriverTrade";

export default function Drivers() {
  const session = useSession();

  return (
    <LayoutShell nav={navigationDrivers} session={session}>
      <DriverGrid />
      <DriverTrade session={session} />
    </LayoutShell>
  );
}
