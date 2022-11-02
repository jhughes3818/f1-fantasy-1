import TeamBuildMobile from "../components/TeamBuildMobile.jsx";
import Example from "../components/Dashboard.jsx";
import { useSession, signIn, signOut } from "next-auth/react";

export default function EditTeam() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Example>
        <TeamBuildMobile />
      </Example>
    );
  } else {
    return (
      <div className="grid place-items-center h-screen">
        <div className="box-styling h-36 text-center px-4">
          <h1 className="text-2xl font-bold text-center">
            Hi! Please sign in to continue.
          </h1>
          <button className="box-styling mt-6 p-3" onClick={() => signIn()}>
            Sign in
          </button>
        </div>
      </div>
    );
  }
}
