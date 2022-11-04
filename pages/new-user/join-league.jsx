import Link from "next/link";
import JoinLeague from "../../components/leagues/JoinLeague";

export default function JoinLeaguePage(props) {
  return (
    <div className="grid place-items-center h-screen">
      <JoinLeague showSkip={true} showCreate={true} />
    </div>
  );
}
