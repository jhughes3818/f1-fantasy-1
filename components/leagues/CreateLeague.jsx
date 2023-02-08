import Link from "next/link";
import { useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import axios from "axios";
import Modal from "../team-build/Modal";
import supabase from "../../database/supabaseClient";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CheckIcon, ClipboardIcon } from "@heroicons/react/20/solid";

export default function CreateLeague() {
  const [leagueCreated, setLeagueCreated] = useState(false);
  const [leagueCode, setLeagueCode] = useState();
  const session = useSession();
  const [name, setName] = useState();
  const [modalBody, setModalBody] = useState();
  const [modalHeading, setModalHeading] = useState();
  const [modalButton, setModalButton] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function copyToClipboard() {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  async function createLeague(namePassedIn, user) {
    let returnedCode = null;

    // Generate 5 character random string
    function makeid(length) {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    // Generate league code
    let code = makeid(5);

    // Check if code already exists
    let { data: leagueCodeExists, error: leagueCodeExistsError } =
      await supabase
        .from("leagues")
        .select("league_code")
        .eq("league_code", code);

    if (leagueCodeExistsError) {
      console.log(leagueCodeExistsError);
    }

    // If code exists, generate new code
    while (leagueCodeExists.length > 0) {
      code = makeid(5);
      let { data: leagueCodeExists, error: leagueCodeExistsError } =
        await supabase
          .from("leagues")
          .select("league_code")
          .eq("league_code", code);
    }

    // Create league
    let { data: league, error: leagueError } = await supabase
      .from("leagues")
      .insert([{ name: namePassedIn, league_code: code }]);
    returnedCode = code;

    // Add user to league
    // Update user's league code in profiles table

    let { data: userAdded, error: userAddedError } = await supabase
      .from("profiles")
      .update({ league_code: code })
      .eq("id", user.id)
      .select("*");

    if (userAddedError) {
      console.log("userAddedError");
      console.log(userAddedError);
    }

    // Open success modal

    if (userAdded) {
      setModalHeading("League Created");
      setModalBody("League created successfully.");
      setModalButton("Done");
      setIsOpen(true);
      setLeagueCreated(true);
      setLeagueCode(returnedCode);
    }
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
            <div className="flex">
              <h2 className="text-lg mb-3">League Code: {leagueCode}</h2>

              <div>
                <CopyToClipboard text={leagueCode}>
                  {/* // Button with clipboard icon */}
                  <button
                    className="text-gray-300 hover:text-gray-500 flex"
                    onClick={() => copyToClipboard()}
                  >
                    {copied ? (
                      <CheckIcon className="h-5 w-5 ml-2 mt-1" />
                    ) : (
                      <ClipboardIcon className="h-5 w-5 ml-2 mt-1" />
                    )}
                  </button>
                </CopyToClipboard>
              </div>
            </div>
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
