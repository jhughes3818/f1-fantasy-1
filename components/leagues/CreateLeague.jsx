import Link from "next/link";
import { useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import axios from "axios";
import Modal from "../team-build/Modal";

export default function CreateLeague() {
  const [leagueCreated, setLeagueCreated] = useState(false);
  const [leagueCode, setLeagueCode] = useState();
  const session = useSession();
  const [name, setName] = useState();
  const [modalBody, setModalBody] = useState();
  const [modalHeading, setModalHeading] = useState();
  const [modalButton, setModalButton] = useState();
  const [isOpen, setIsOpen] = useState(false);

  async function verifyNoLeague(namePassedIn, user) {}

  async function createLeague(namePassedIn, user) {
    let returnedCode = null;

    //Create league
    await axios
      .post("/api/leagues/create", {
        name: namePassedIn,
      })
      .then((response) => {
        setLeagueCode(response.data.leagueCode);
        returnedCode = response.data.leagueCode;
      });

    //Add user to league
    await axios
      .put(`/api/leagues/join/${returnedCode}`, {
        user: session.user,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setLeagueCreated(true);
          setModalBody("League created successfully!");
          setModalHeading("Success");
          setModalButton("Close");
          setIsOpen(true);
        }
      });
  }

  function closeModal() {
    setIsOpen(false);
  }

  if (leagueCreated) {
    return (
      <div>
        <Modal
          heading={modalHeading}
          buttonText={modalButton}
          function={closeModal}
          isOpen={isOpen}
          body={modalBody}
        />

        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6">
            {/* Content goes here */}
            {/* We use less vertical padding on card headers on desktop than on body sections */}
            <h1 className="text-2xl font-bold">League Created</h1>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {/* Content goes here */}
            <h2 className="text-lg mb-3">League Name: {name}</h2>
            <h2 className="text-lg mb-3">League Code: {leagueCode}</h2>
            {/* <h3 className="text-xl mb-3">Share league code with friends.</h3> */}
            <div className="grid place-items-center">
              <Link href="/">
                <span className="button-styling cursor-pointer">Done</span>
              </Link>
            </div>
          </div>
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
          // onClick={() => verifyNoLeague(name, session.user)}
          className="button-styling"
        >
          <span>Create League</span>
        </button>
      </div>
    );
}
