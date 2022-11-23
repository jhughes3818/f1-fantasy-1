import Link from "next/link";
import ProgressBars from "../../components/misc/ProgressBars";
import Steps from "../../components/misc/Steps";

const steps = [
  { id: "Step 1", name: "Welcome", href: "#", status: "current" },
  { id: "Step 2", name: "Build Team", href: "#", status: "upcoming" },
  { id: "Step 3", name: "Join League", href: "#", status: "upcoming" },
];

export default function Welcome() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="w-80">
        <div className="mb-4">
          <Steps steps={steps} />
        </div>
        <h1 className="text-2xl">Hello 👋</h1>
        <h2 className="pb-4">Let&apos;s go racing.</h2>
        <p className="text-gray-600">
          We&apos;ll start by building a team.
          <br />
          <br />
          You have $30m to spend on drivers.
          <br />
          <br />
          Each race, your drivers will earn points. The price of each driver
          will also go up or down based on their performance.
          <br />
          <br />
          You can build your budget by selling drivers for a profit.
        </p>
        <Link href="/new-user/create-team">
          <div className="box-styling bg-blue-500 text-white font-bold text-center mt-4 cursor-pointer">
            <span>Next</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
