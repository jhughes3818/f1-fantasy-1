import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { useQuery } from "react-query";
import axios from "axios";

export default function NextRound() {
  const { isLoading, error, data } = useQuery("roundStatus", () =>
    axios.get("/api/rounds/current-round")
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="rounded-md bg-blue-50 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1 ">
          <p className="text-sm text-blue-700 font-bold">Next Round</p>
          <p className="text-sm text-blue-700">
            {data.data.current_round[0].round_name}
          </p>
          <p className="text-sm text-blue-700">
            {data.data.current_round[0].date}
          </p>
        </div>
      </div>
    </div>
  );
}
