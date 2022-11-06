import Link from "next/link";
import JoinLeague from "../../components/leagues/JoinLeague";
import ProgressBars from "../../components/misc/ProgressBars";

export default function JoinLeaguePage(props) {
  return (
    <div className="grid place-items-center h-screen">
      <div>
        <div className="mb-4">
          <ProgressBars bars={2} />
        </div>
        <JoinLeague showSkip={true} showCreate={true} />
      </div>
    </div>
  );
}
