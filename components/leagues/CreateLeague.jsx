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

  async function verifyNoLeague(namePassedIn, user) {
    axios.get(`/api/users/${user.email}`).then((response) => {
      //console.log(response.data.user.league);
      if (response.data.user.league) {
        setName("Already in a league, sis");
        setModalButton("Ok");
        setModalHeading("Already joined a league");
        setModalBody(
          "You have already joined a league. Leave your current league and try again."
        );
        setIsOpen(true);
      } else {
        createLeague(namePassedIn, user);
      }
    });
  }

  async function createLeague(namePassedIn, user) {
    axios
      .post("/api/leagues/create", {
        name: namePassedIn,
        user: user,
      })
      .then((response) => {
        setLeagueCode(response.data.leagueCode);
        addLeagueCodeToUser(user, response.data.leagueCode);
      });
  }

  async function addLeagueCodeToUser(user, leagueCode) {
    console.log("Control flow seems to be broken sir");
    //Add league code to user document
    console.log(user.email);

    await axios.put(`/api/users/${user.email}`, { league: leagueCode });
    setLeagueCreated(true);
  }

  if (leagueCreated) {
    return (
      <div>
        <Modal
          heading={modalHeading}
          buttonText={modalButton}
          function={closeModal}
          isOpen={isOpen}
          bodyText={modalBody}
        />

        <div className="">
          <h1 className="text-3xl font-bold text-center mb-3">Your League</h1>
          <h2 className="text-2xl mb-3">League Name: {name}</h2>
          <h2 className="text-2xl mb-3">League Code: {leagueCode}</h2>
          <h3 className="text-xl mb-3">Share league code with friends.</h3>
          <div className="grid place-items-center">
            <Link href="/">
              <span className="button-styling cursor-pointer">
                Return to Dashboard
              </span>
            </Link>
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
          //   onClick={() => createLeague(name, session.user)}
          onClick={() => verifyNoLeague(name, session.user)}
          className="button-styling"
        >
          <span>Create League</span>
        </button>
      </div>
    );
}
