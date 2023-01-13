import { Fragment } from "react";
import { ChatBubbleLeftEllipsisIcon, TagIcon } from "@heroicons/react/20/solid";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import axios from "axios";
import FeedEntries from "./FeedEntries";

export default function NewFeedComponent() {
  const session = useSession();
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      // Get the user league code
      axios.get(`/api/users/${session?.user.id}`).then((response) => {
        // console.log(response);
        // Get the trades from the relevant league
        axios.get(`/api/trades/${1}`).then((response) => {
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
      });
    }
  }, [session]);

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
          class="p-4 space-y-4 max-w-md rounded border border-gray-200 divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
        >
          <div class="flex justify-between items-center">
            <div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div class="flex justify-between items-center pt-4">
            <div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div class="flex justify-between items-center pt-4">
            <div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div class="flex justify-between items-center pt-4">
            <div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div class="flex justify-between items-center pt-4">
            <div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          {session ? <FeedEntries activity={activity} /> : <h1>Loading...</h1>}
        </>
      )}
    </>
  );
}
