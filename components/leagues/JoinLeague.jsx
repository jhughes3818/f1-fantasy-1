import Link from "next/link";
import { useSession } from "next-auth/react";

function joinLeague(user, league) {}

export default function JoinLeague(props) {
  const { data: session } = useSession();
  return (
    <div className="grid place-items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-3">Join A League</h1>
        <input
          placeholder="Enter League Code"
          className="block mb-3 box-styling px-2 w-56 text-center"
          autoFocus
        />
        <button className="block box-styling bg-blue-500 text-white text-center font-bold w-56 mb-3">
          Join
        </button>
        {props.showSkip ? (
          <div>
            <Link href="/">
              <span className="text-gray-500 cursor-pointer">Skip for now</span>
            </Link>
          </div>
        ) : null}
        {props.showCreate ? (
          <div>
            <p>or</p>
            <Link href="/">
              <span className="text-gray-500 cursor-pointer">
                Make your own league
              </span>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
