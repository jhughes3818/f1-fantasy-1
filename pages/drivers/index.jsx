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

  const navigation = navigationDrivers.map((item) => ({
    ...item,
    href: item.href === "#" ? `/team/${session?.user.id}` : item.href,
  }));

  return (
    <LayoutShell nav={navigation} session={session}>
      <DriverGrid />
      {/* <DriverTrade session={session} /> */}
    </LayoutShell>
  );
}
