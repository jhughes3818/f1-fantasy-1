import LeagueTable from "../leagues/LeagueTable";
import NewFeedComponent from "../feed/NewFeedComponent";
import TeamTable from "../teams/TeamTable";
import DriverTrade from "../team-build/DriverTrade";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSession } from "@supabase/auth-helpers-react";

export default function Sidebar(props) {
  const [activeTab, setActiveTab] = useState("feed");
  const session = useSession();

  return (
    <>
      <div className="flex justify-center space-x-2">
        <a
          onClick={() => setActiveTab("feed")}
          className={`px-2 py-2 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer ${
            activeTab === "feed" ? "text-gray-900 underline" : ""
          }`}
        >
          Feed
        </a>
        <a
          onClick={() => setActiveTab("leagues")}
          className={`px-2 py-2 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer ${
            activeTab === "leagues" ? "text-gray-900 underline" : ""
          }`}
        >
          League
        </a>
        {/* <a
          onClick={() => setActiveTab("teams")}
          className={`px-2 py-2 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer ${
            activeTab === "teams" ? "text-gray-900 underline" : ""
          }`}
        >
          Team
        </a> */}
        <a
          onClick={() => setActiveTab("trade")}
          className={`px-2 py-2 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer ${
            activeTab === "trade" ? "text-gray-900 underline" : ""
          }`}
        >
          Trade
        </a>
      </div>

      {activeTab === "feed" && <NewFeedComponent />}
      {activeTab === "leagues" && <LeagueTable />}

      {/* {data && activeTab === "teams" && (
        <TeamTable session={session} team={data} />
      )} */}
      {/* {activeTab === "teams" && <TeamTable session={session} team={data} />} */}
      {activeTab === "trade" && <DriverTrade session={session} />}
    </>
  );
}
