import TeamBuildMobile from "../../components/TeamBuildMobile";
import { useState, useEffect } from "react";

export default function CreateTeam() {
  return (
    <div className="grid place-items-center h-screen">
      <div>
        <h1 className="text-3xl mb-6 text-center font-bold">
          Create Your Team
        </h1>
        <TeamBuildMobile isNewUser={true} />
      </div>
    </div>
  );
}
