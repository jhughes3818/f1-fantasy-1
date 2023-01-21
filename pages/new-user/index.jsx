import Link from "next/link";
import Steps from "../../components/misc/Steps";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { Oval } from "react-loader-spinner";
import supabase from "../../database/supabaseClient";

const steps = [
  { id: "Step 1", name: "Welcome", href: "#", status: "current" },
  { id: "Step 2", name: "Build Team", href: "#", status: "upcoming" },
  { id: "Step 3", name: "Join League", href: "#", status: "upcoming" },
];

export default function Welcome() {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(false);

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);

      const updates = {
        id: session.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      // alert("Profile updated!");
      Router.push("/new-user/create-team");
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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
          <br />

          <p className="text-gray-600 font-bold">First, choose a username.</p>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 mt-2"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <Link href="/new-user/create-team">
            <div className="box-styling bg-blue-500 text-white font-bold text-center mt-4 cursor-pointer">
              <span>Next</span>
            </div>
          </Link> */}
          <button
            className="box-styling bg-blue-500 text-white font-bold text-center mt-4 cursor-pointer w-full"
            onClick={() => updateProfile({ username: username })}
          >
            {loading ? <span>Saving...</span> : <span>Next</span>}
          </button>
        </div>
      )}
    </div>
  );
}
