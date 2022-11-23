import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import NewUser from "../components/NewUser.jsx";
import axios from "axios";
import Router from "next/router";

export default function Dashboard() {
  const { data: session } = useSession();
  const [isNewUser, setIsNewUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
        return <Layout />;
      }
    }
  } else {
    return <h1>Loading...</h1>;
  }
}
