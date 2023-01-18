// import { getLatestRound } from "../../pages/api/rounds/current-round";
import { useEffect, useState } from "react";
import supabase from "../../database/supabaseClient";
import axios from "axios";
import { useQuery } from "react-query";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";

export default function RoundStatus() {
  const [latestRound, setLatestRound] = useState();

  // Use react query to call the round status API
  const { isLoading, error, data } = useQuery("roundStatus", () =>
    axios.get("/api/rounds/current-round")
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (data) {
    console.log(data.data.current_round[0].editing_allowed);
    return (
      <>
        {/* <h1>Test</h1> */}
        <div className="flex flex-col border border-gray-100">
          {data.data.current_round[0].editing_allowed ? (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Team Editing Open
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>You can edit your team until the start of qualifying.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Team Editing Open
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>Team editing closes at the start of qualifying.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
