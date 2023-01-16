import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/supabase-auth/Account";
import Dashboard from "./dashboard";
import NewFeedComponent from "../components/feed/NewFeedComponent";
import DriverTrade from "../components/team-build/DriverTrade";
import axios from "axios";
import LayoutShell from "../components/LayoutShell";
import NewUser from "../components/NewUser.jsx";
import { useState, useEffect } from "react";
import {
  CalendarIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const [isNewUser, setIsNewUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (session) {
      axios.get(`/api/users/${session.user.id}`).then((response) => {
        if (response.status === 200) {
          if (response.data.hasTeam) {
            setIsNewUser(false);
          } else setIsNewUser(true);
        }
      });
    }
  }, [session]);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
    { name: "League", href: "/league", icon: CalendarIcon, current: false },
    { name: "Stats", href: "#", icon: UserGroupIcon, current: false },
  ];

  return (
    <div>
      {!session ? (
        <div className="grid place-items-center h-screen">
          <div className="w-96 mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Sign In To Continue</h1>
            </div>
            <Auth
              providers={["google"]}
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="light"
            />
          </div>
        </div>
      ) : (
        <>
          {isNewUser ? (
            <NewUser />
          ) : (
            <LayoutShell nav={navigation}>
              <NewFeedComponent />
              <DriverTrade session={session} />
            </LayoutShell>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
