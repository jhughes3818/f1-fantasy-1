import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
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

export default function Dashboard() {
  const { data: session } = useSession();
  const [isNewUser, setIsNewUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
    { name: "League", href: "/league", icon: CalendarIcon, current: false },
    { name: "Stats", href: "#", icon: UserGroupIcon, current: false },
  ];

  useEffect(() => {
    if (session) {
      axios
        .get(`/api/users/${session.user.email}`)
        .then((response) => {
          if (response.status === 204) {
            setIsNewUser(true);
            Router.push("/new-user");
          } else {
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [session]);

  if (session) {
    if (isNewUser) {
      return <NewUser />;
    } else {
      if (isLoading) {
        return <h1>Loading...</h1>;
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
    return <h1>Loading...</h1>;
  }
}
