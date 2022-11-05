import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function CreateLeague() {
  const [leagueCreated, setLeagueCreated] = useState(false);
  const [leagueCode, setLeagueCode] = useState();
  const { data: session } = useSession();
  const [name, setName] = useState();

  function createLeague(namePassedIn, user) {
    axios
      .post("/api/leagues/create", {
        name: namePassedIn,
        user: user,
      })
      .then((response) => {});
  }

  if (leagueCreated) {
    return (
      <div className="">
        <h1 className="text-3xl font-bold text-center mb-3">Your League</h1>
        <h2 className="text-2xl mb-3">League Name: Test League</h2>
        <h2 className="text-2xl mb-3">League Code: 12345</h2>
        <h3 className="text-xl mb-3">Share league code with friends.</h3>
        <div className="grid place-items-center">
          <Link href="/">
            <span className="button-styling cursor-pointer">
              Return to Dashboard
            </span>
          </Link>
        </div>
      </div>
    );
  } else
    return (
      <div>
        <h1>{name}</h1>
        <label className="block text-2xl font-bold text-center mb-3">
          League Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Create league name"
          className="block mb-3 box-styling px-2 w-56 text-center"
        ></input>
        <button
          onClick={() => createLeague(name, session.user)}
          className="button-styling"
        >
          <span>Create League</span>
        </button>
      </div>
    );
}
