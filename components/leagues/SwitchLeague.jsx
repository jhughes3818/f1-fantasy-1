import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";
import supabase from "../../database/supabaseClient";
import Modal from "../team-build/Modal";
import { Oval } from "react-loader-spinner";
import Router from "next/router";

export default function SwitchLeague(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [codeEntered, setCodeEntered] = useState();
  const [modalHeading, setModalHeading] = useState();
  const [modalBody, setModalBody] = useState();
  const [modalButton, setModalButton] = useState();
  const [showHome, setShowHome] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLeague, setShowLeague] = useState(null);
  const session = useSession();

  function closeModal() {
    setIsOpen(false);
  }

  async function joinLeague(user, leagueCode) {
    setLoading(true);
    //Check if the league exists
    const { data: leagueData, error: leagueError } = await supabase
      .from("leagues")
      .select("*")
      .eq("league_code", leagueCode);

    if (leagueData?.length === 0) {
      setModalHeading("League not found");
      setModalBody("The league you entered does not exist. Please try again.");
      setModalButton("Ok");
      setIsOpen(true);
      setLoading(false);

      return;
    }

    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .update({ league_code: leagueCode })
      .eq("id", user.id);

    const { data: teamData, error: teamError } = await supabase
      .from("teams")
      .update({ league_code: leagueCode })
      .eq("user_id", user.id);

    if (profilesError || teamError) {
      console.log(profilesError, teamError);
      setModalHeading("Error");
      setModalBody("Something went wrong. Please try again.");
      setModalButton("Ok");
      setIsOpen(true);
      setLoading(false);
    } else {
      setModalHeading("Successfully joined league!");
      setModalButton("Got it");
      setLoading(false);
      setIsOpen(true);
      Router.push("/");
    }
  }

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
        // <div className="grid place-items-center">
        <div className="">
          {/* <h1 className="text-3xl font-bold mb-3">Join A League</h1> */}

          <input
            placeholder="Enter League Code"
            className="block mb-3 box-styling px-2 w-56 text-center"
            autoFocus
            onChange={(e) => setCodeEntered(e.target.value)}
          />
          <button
            //onClick={() => joinLeague(session.user, codeEntered)}
            onClick={() => joinLeague(session.user, codeEntered)}
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
        // </div>
      )}
    </div>
  );
}