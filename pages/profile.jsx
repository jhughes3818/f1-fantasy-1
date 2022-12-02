import Account from "../components/supabase-auth/Account";
import { useSession } from "@supabase/auth-helpers-react";
import LayoutShell from "../components/LayoutShell";
import {
  CalendarIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function Profile() {
  const session = useSession();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: false },
    { name: "League", href: "/league", icon: CalendarIcon, current: false },
    { name: "Stats", href: "#", icon: UserGroupIcon, current: false },
  ];
  return (
    <>
      {!session ? (
        <p>Loading....</p>
      ) : (
        <LayoutShell nav={navigation}>
          <div className="grid place-items-center h-screen">
            <div className="w-96">
              <Account session={session} />
            </div>
          </div>
          <h1>Null</h1>
        </LayoutShell>
      )}
    </>
  );
}
