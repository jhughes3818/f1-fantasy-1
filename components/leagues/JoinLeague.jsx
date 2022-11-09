import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import Modal from "../team-build/Modal";
import { Oval } from "react-loader-spinner";
import Router from "next/router";

export default function JoinLeague(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [codeEntered, setCodeEntered] = useState();
  const [modalHeading, setModalHeading] = useState();
  const [modalBody, setModalBody] = useState();
  const [modalButton, setModalButton] = useState();
  const [showHome, setShowHome] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLeague, setShowLeague] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function verifyNoLeague(user, leagueCode) {
    axios.get(`/api/users/${user.email}`).then((response) => {
      if (response.data.user.league) {
        setModalHeading("Already in a league");
        setModalBody(
          "You have already joined a league. Please leave your current league and then try again."
        );
        setModalButton("Ok");
        setIsOpen(true);
      } else {
        joinLeague(user, leagueCode);
      }
    });
  }

  async function joinLeague(user, leagueCode) {
    //Validate that league code is valid
    setLoading(true);
    await axios
      .get(`/api/leagues/${leagueCode}`)
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
          setLoading(false);
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
      .put(`/api/leagues/${leagueCode}`, { user: user })
      .then((response) => {
        if (response.status === 200) {
          console.log("Added user to league");
        }
      });
    setModalHeading("Successfully joined league!");
    setModalButton("Got it");
    setLoading(false);
    setIsOpen(true);
    setShowHome(true);
    Router.push("/dashboard");
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
      {showHome ? (
        <div className="grid place-items-center">
          <Link href="/">
            <span className="block box-styling bg-blue-500 text-white text-center font-bold w-56 mb-3 mt-3 cursor-pointer">
              Go to dashboard
            </span>
          </Link>
        </div>
      ) : (
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
              //onClick={() => joinLeague(session.user, codeEntered)}
              onClick={() => verifyNoLeague(session.user, codeEntered)}
              className="block box-styling bg-blue-500 text-white text-center font-bold w-56 mb-3"
            >
              {loading ? (
                <div className="grid place-items-center">
                  <Oval
                    height={20}
                    width={20}
                    color="#ffffff"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#e9e9e9"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                </div>
              ) : (
                <span>Join</span>
              )}
            </button>

            {props.showSkip === true ? (
              <div>
                <Link href="/">
                  <span className="text-gray-500 cursor-pointer">
                    Skip for now
                  </span>
                </Link>
              </div>
            ) : null}
            {props.showCreate === true ? (
              <div>
                <p className="text-gray-400">or</p>
                <Link href="/league/create">
                  <span className="text-gray-500 cursor-pointer">
                    Make your own league
                  </span>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
