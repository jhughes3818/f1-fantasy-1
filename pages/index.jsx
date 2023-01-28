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
import SignIn from "../components/auth/SignIn";
import { navigationHome } from "../components/navigation/Navigation";
import Router from "next/router";

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
          } else {
            Router.push("/new-user");
          }
        }
      });
    }
  }, [session]);

  // const navigation = [
  //   { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  //   { name: "League", href: "/league", icon: CalendarIcon, current: false },
  //   { name: "Stats", href: "#", icon: UserGroupIcon, current: false },
  // ];

  const navigation = navigationHome;

  return (
    <div>
      {!session ? (
        <SignIn />
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
