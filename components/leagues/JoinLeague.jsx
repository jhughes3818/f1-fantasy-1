import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import Modal from "../team-build/Modal";

export default function JoinLeague(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [codeEntered, setCodeEntered] = useState();
  const [modalHeading, setModalHeading] = useState();
  const [modalBody, setModalBody] = useState();
  const [modalButton, setModalButton] = useState();

  function closeModal() {
    setIsOpen(false);
  }

  async function joinLeague(user, leagueCode) {
    //Validate that league code is valid
    await axios
      .get(`/api/leagues/${leagueCode}`, leagueCode)
      .then((response) => {
        if (response.status === 200) {
          addLeagueCodeToUser(user, leagueCode);
          addUserToLeague(user, leagueCode);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("error");
          setModalHeading("League doesn't exist");
          setModalBody("Please double check your league code and try again.");
          setModalButton("Try Again");
          setIsOpen(true);
        }
      });
  }

  async function addLeagueCodeToUser(user, leagueCode) {
    console.log("Control flow seems to be broken sir");
    //Add league code to user document
    await axios.put(`/api/users/${user.email}`, { league: leagueCode });
  }

  async function addUserToLeague(user, leagueCode) {
    //Add user to league document
    await axios
      .put(`/api/leagues/${leagueCode}`, { user: user.email })
      .then((response) => {
        if (response.status === 200) {
          console.log("Added user to league");
        }
      });
    setModalHeading("Successfully joined league!");
    setModalButton("Got it");
    setIsOpen(true);
  }

  const { data: session } = useSession();
  return (
    <div>
      <Modal
        heading={modalHeading}
        buttonText={modalButton}
        function={closeModal}
        isOpen={isOpen}
        bodyText={modalBody}
      />
      <div className="grid place-items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3">Join A League</h1>

          <input
            placeholder="Enter League Code"
            className="block mb-3 box-styling px-2 w-56 text-center"
            autoFocus
            onChange={(e) => setCodeEntered(e.target.value)}
          />
          <button
            onClick={() => joinLeague(session.user, codeEntered)}
            className="block box-styling bg-blue-500 text-white text-center font-bold w-56 mb-3"
          >
            Join
          </button>
          {props.showSkip ? (
            <div>
              <Link href="/">
                <span className="text-gray-500 cursor-pointer">
                  Skip for now
                </span>
              </Link>
            </div>
          ) : null}
          {props.showCreate ? (
            <div>
              <p className="text-gray-400">or</p>
              <Link href="/">
                <span className="text-gray-500 cursor-pointer">
                  Make your own league
                </span>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
