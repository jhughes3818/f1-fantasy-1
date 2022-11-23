import Link from "next/link";
import JoinLeague from "../../components/leagues/JoinLeague";
import ProgressBars from "../../components/misc/ProgressBars";
import Steps from "../../components/misc/Steps";

const steps = [
  { id: "Step 1", name: "Welcome", href: "#", status: "complete" },
  { id: "Step 2", name: "Build Team", href: "#", status: "complete" },
  { id: "Step 3", name: "Join League", href: "#", status: "current" },
];

export default function JoinLeaguePage(props) {
  return (
    <div className="grid place-items-center h-screen">
      <div>
        <div className="mb-8">
          <Steps steps={steps} />
        </div>
        <JoinLeague showSkip={true} showCreate={true} />
      </div>
    </div>
  );
}
