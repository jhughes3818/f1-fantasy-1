import ProgressBars from "../components/misc/ProgressBars";
import DriverTrade from "../components/team-build/DriverTrade";
import MultiSelect from "../components/team-build/MultiSelect.jsx";
import { useSession } from "next-auth/react";

export default function Test() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="grid place-items-center">
        <DriverTrade session={session} />
      </div>
    );
  } else return <h1>Loading...</h1>;
}
