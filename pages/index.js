import axios from "axios";
import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import NewTeamGrid from "../components/team-build/new-team-grid";
import Example from "../components/dashboard";
import Link from "next/link";
import Loading from "../components/loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState();

  useEffect(() => {
    axios.get("/api/users").then(function (response) {
      console.log(response);

      const teamJSON = JSON.stringify(response.data.team);
      setTeam(response.data.team);

      setIsLoading(false);
      console.log();
    });
  }, []);

  return (
    <Example>
      <div>
        {isLoading ? (
          <div>
            <Loading />
            <h1>Loading...</h1>
          </div>
        ) : (
          <div>
            <h1>Your Team</h1>

            <Link href="/edit-team">
              <span className="flex">
                <PencilSquareIcon className="block h-4 w-4" />
                Edit Team
              </span>
            </Link>

            <NewTeamGrid
              drivers={team}
              showProgressBars={false}
              showButton={false}
            />
          </div>
        )}
      </div>
    </Example>
  );
}
