import TeamBuildMobile from "../../components/TeamBuildMobile";
import { useState, useEffect } from "react";
import ProgressBars from "../../components/misc/ProgressBars";
import Steps from "../../components/misc/Steps";
import NewTeamBuildMobile from "../../components/team-build/NewTeamBuildMobile";

const steps = [
  { id: "Step 1", name: "Welcome", href: "#", status: "complete" },
  { id: "Step 2", name: "Build Team", href: "#", status: "current" },
  { id: "Step 3", name: "Join League", href: "#", status: "upcoming" },
];

export default function CreateTeam() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="">
        <div className="mb-6">
          <Steps steps={steps} />
        </div>
        <h1 className="text-3xl mb-6 text-center font-bold">
          Create Your Team
        </h1>
        {/* <TeamBuildMobile isNewUser={true} /> */}
        <NewTeamBuildMobile isNewUser={true} />
      </div>
    </div>
  );
}
