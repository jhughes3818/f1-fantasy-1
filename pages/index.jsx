import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import NewTeamGrid from "../components/team-build/NewTeamGrid.jsx";
import Example from "../components/Dashboard.jsx";
import Link from "next/link";
import Loading from "../components/Loading.jsx";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import JoinLeague from "../components/leagues/JoinLeague.jsx";
import NewUser from "../components/NewUser.jsx";
import LeagueView from "../components/leagues/LeagueView.jsx";
import { TailSpin, Oval } from "react-loader-spinner";

export default function Home(props) {
  return (
    <div className="grid place-items-center h-screen">
      <div className="box-styling h-36 text-center px-4">
        <h1 className="text-2xl font-bold text-center">
          Hi! Please sign in to continue.
        </h1>
        <button
          className="box-styling mt-6 p-3"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
