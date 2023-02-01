import LeagueTable from "../leagues/LeagueTable";
import NewFeedComponent from "../feed/NewFeedComponent";
import TeamTable from "../teams/TeamTable";
import DriverTrade from "../team-build/DriverTrade";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSession } from "@supabase/auth-helpers-react";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const tabs = [
  {
    name: "Trade",
    href: "#",
    current: true,
  },
  {
    name: "Feed",
    href: "#",
    current: false,
  },
  {
    name: "League",
    href: "#",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar(props) {
  const [activeTab, setActiveTab] = useState("trade");
  const session = useSession();

  function setCurrentTab(tabName) {
    console.log(tabName);
    tabs.forEach((tab) => {
      tab.current = tab.name === tabName;
    });
  }

  return (
    <>
      <div className="mb-2">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            defaultValue={tabs.find((tab) => tab.current).name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav
            className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
            aria-label="Tabs"
          >
            {tabs.map((tab, tabIdx) => (
              <a
                key={tab.name}
                onClick={() => {
                  setCurrentTab(tab.name);
                  setActiveTab(tab.name.toLowerCase());
                }}
                className={classNames(
                  tab.current
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700",
                  tabIdx === 0 ? "rounded-l-lg" : "",
                  tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                  "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 cursor-pointer"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <span>{tab.name}</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    tab.current ? "bg-indigo-500" : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-0.5"
                  )}
                />
              </a>
            ))}
          </nav>
        </div>
      </div>

      {activeTab === "feed" && <NewFeedComponent />}
      {activeTab === "league" && <LeagueTable />}

      {/* {data && activeTab === "teams" && (
        <TeamTable session={session} team={data} />
      )} */}
      {/* {activeTab === "teams" && <TeamTable session={session} team={data} />} */}
      {activeTab === "trade" && <DriverTrade session={session} />}
    </>
  );
}
