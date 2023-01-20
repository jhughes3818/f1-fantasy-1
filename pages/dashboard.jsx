import Layout from "../components/Layout";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import NewUser from "../components/NewUser.jsx";
import axios from "axios";
import Router from "next/router";
import {
  CalendarIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import LayoutShell from "../components/LayoutShell";
import NewFeedComponent from "../components/feed/NewFeedComponent";
import DriverTrade from "../components/team-build/DriverTrade";
import { Oval } from "react-loader-spinner";

export default function Dashboard() {
  const session = useSession();
  const [isNewUser, setIsNewUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
    { name: "League", href: "/league", icon: CalendarIcon, current: false },
    { name: "Stats", href: "#", icon: UserGroupIcon, current: false },
  ];

  useEffect(() => {
    // if (session) {
    //   axios
    //     .get(`/api/users/${session.user.email}`)
    //     .then((response) => {
    //       if (response.status === 204) {
    //         setIsNewUser(true);
    //         Router.push("/new-user");
    //       } else {
    //         setIsLoading(false);
    //       }
    //     })
    //     .catch((error) => {
    //
    //     });
    // }
  }, [session]);

  if (session) {
    if (isNewUser) {
      return <NewUser />;
    } else {
      if (isLoading) {
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
      } else {
        return (
          <LayoutShell nav={navigation}>
            <NewFeedComponent />
            <DriverTrade session={session} />
          </LayoutShell>
        );
      }
    }
  } else {
    return (
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
    );
  }
}
