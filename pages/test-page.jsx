import ProgressBars from "../components/misc/ProgressBars";
import DriverTrade from "../components/team-build/DriverTrade";
import MultiSelect from "../components/team-build/MultiSelect.jsx";
import { useSession } from "next-auth/react";
import TradesView from "../components/leagues/TradesView";
import FeedDriverPill from "../components/feed/FeedDriverPill";
import FeedComponent from "../components/feed/FeedComponent";

export default function Test() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="grid place-items-center">
        <FeedComponent />
      </div>
    );
  } else return <h1>Loading...</h1>;
}
