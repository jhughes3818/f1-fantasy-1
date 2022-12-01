import Link from "next/link";
import Steps from "../../components/misc/Steps";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { Oval } from "react-loader-spinner";

const steps = [
  { id: "Step 1", name: "Welcome", href: "#", status: "current" },
  { id: "Step 2", name: "Build Team", href: "#", status: "upcoming" },
  { id: "Step 3", name: "Join League", href: "#", status: "upcoming" },
];

export default function Welcome() {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      axios
        .get(`/api/users/${session.user.email}`)
        .then((response) => {
          if (response.status === 204) {
            setIsLoading(false);
          } else {
            Router.push("/dashboard");
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [session]);

  return (
    <div className="grid place-items-center h-screen">
      {isLoading ? (
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
      ) : (
        <div className="w-80">
          <div className="mb-4">
            <Steps steps={steps} />
          </div>
          <h1 className="text-2xl">Hello 👋</h1>
          <h2 className="pb-4">Let&apos;s go racing.</h2>
          <p className="text-gray-600">
            We&apos;ll start by building a team.
            <br />
            <br />
            You have $30m to spend on drivers.
            <br />
            <br />
            Each race, your drivers will earn points. The price of each driver
            will also go up or down based on their performance.
            <br />
            <br />
            You can build your budget by selling drivers for a profit.
          </p>
          <Link href="/new-user/create-team">
            <div className="box-styling bg-blue-500 text-white font-bold text-center mt-4 cursor-pointer">
              <span>Next</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
