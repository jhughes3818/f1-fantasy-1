import { Fragment } from "react";
import { ChatBubbleLeftEllipsisIcon, TagIcon } from "@heroicons/react/20/solid";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import axios from "axios";
import FeedEntries from "./FeedEntries";
import JoinLeague from "../leagues/JoinLeague";

export default function NewFeedComponent() {
  const session = useSession();
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noLeague, setNoLeague] = useState(false);

  useEffect(() => {
    if (session) {
      // Get the user league code
      axios.get(`/api/users/${session?.user.id}`).then((response) => {
        console.log(response.data);

        const leagueCode = response.data.league;
        // const leagueCode = null;
        // Get the trades from the relevant league

        if (leagueCode === null) {
          setIsLoading(false);
          setNoLeague(true);
          return;
        } else {
          axios.get(`/api/trades/${leagueCode}`).then((response) => {
            // console.log(response.data);
            const tradesList = response.data;

            console.log(tradesList);
            const activityList = [];
            tradesList.slice(-5).forEach((trade) => {
              // console.log(trade);
              const newEntry = {
                id: tradesList.id,
                type: "assignment",
                person: { name: trade.user, href: "#" },
                assigned: {
                  name:
                    trade.driver_bought.first_name +
                    " " +
                    trade.driver_bought.last_name,
                  href: "#",
                },
                sold: {
                  name:
                    trade.driver_sold.first_name +
                    " " +
                    trade.driver_sold.last_name,
                  href: "#",
                },
                date: "2d ago",
                // imageUrl: trade.user.image,
                // comment: trade.message,
              };
              activityList.push(newEntry);
            });
            setActivity(activityList.reverse());
            setIsLoading(false);
          });
        }
      });
    }
  }, [session]);

  // Button aligned to bottom right of div

  return (
    <>
      <div className="border-b border-gray-200 pb-5 mb-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Recent Activity
        </h3>
      </div>
      {isLoading ? (
        <div
          role="status"
          className="p-4 space-y-4 max-w-md rounded border border-gray-200 divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          {session ? (
            <>
              {noLeague ? (
                <div>
                  <h1 className="mx-auto text-xl text-gray-500">
                    You don't have a league yet! Join one to get started.
                  </h1>
                  <div className="mt-5">
                    <JoinLeague />
                  </div>
                </div>
              ) : (
                <>
                  {activity.length > 0 ? (
                    <FeedEntries activity={activity} />
                  ) : (
                    <div className="">
                      <h1 className="mx-auto text-xl text-gray-500">
                        Doesn't look like anything has happened yet! Make a
                        trade to get started.
                      </h1>
                    </div>
                  )}
                </>
              )}

              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
              >
                Trade
              </button>
            </>
          ) : (
            <h1>Loading...</h1>
          )}
        </>
      )}
    </>
  );
}
