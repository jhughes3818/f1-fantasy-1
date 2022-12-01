import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/supabase-auth/Account";
import Dashboard from "./dashboard";
import LayoutShell from "../components/LayoutShell";
import {
  CalendarIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
    { name: "League", href: "/league", icon: CalendarIcon, current: false },
    { name: "Stats", href: "#", icon: UserGroupIcon, current: false },
  ];

  return (
    <div>
      {!session ? (
        <div className="grid place-items-center h-screen">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
          />
        </div>
      ) : (
        <LayoutShell nav={navigation}>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
        </LayoutShell>
      )}
    </div>
  );
};

export default Home;
