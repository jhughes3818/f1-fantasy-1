import { Fragment } from "react";
import { ChatBubbleLeftEllipsisIcon, TagIcon } from "@heroicons/react/20/solid";
import TradeFeedComponent from "./TradeFeedComponent";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
          {session ? (
            <div className="flow-root">
              <ul role="list" className="-mb-8">
                {activity.map((activityItem, activityItemIdx) => (
                  <li key={activityItem.id}>
                    <div className="relative pb-8">
                      {activityItemIdx !== activity.length - 1 ? (
                        <span
                          className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex items-start space-x-3">
                        {activityItem.type === "comment" ? (
                          <>
                            <div className="relative">
                              <img
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                                src={activityItem.imageUrl}
                                alt=""
                              />

                              <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                                <ChatBubbleLeftEllipsisIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div>
                                <div className="text-sm">
                                  <a
                                    href={activityItem.person.href}
                                    className="font-medium text-gray-900"
                                  >
                                    {activityItem.person.name}
                                  </a>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                  Commented {activityItem.date}
                                </p>
                              </div>
                              <div className="mt-2 text-sm text-gray-700">
                                <p>{activityItem.comment}</p>
                              </div>
                            </div>
                          </>
                        ) : activityItem.type === "assignment" ? (
                          <TradeFeedComponent activityItem={activityItem} />
                        ) : activityItem.type === "tags" ? (
                          <>
                            <div>
                              <div className="relative px-1">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                                  <TagIcon
                                    className="h-5 w-5 text-gray-500"
                                    aria-hidden="true"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="min-w-0 flex-1 py-0">
                              <div className="text-sm leading-8 text-gray-500">
                                <span className="mr-0.5">
                                  <a
                                    href={activityItem.person.href}
                                    className="font-medium text-gray-900"
                                  >
                                    {activityItem.person.name}
                                  </a>{" "}
                                  added tags
                                </span>{" "}
                                <span className="mr-0.5">
                                  {activityItem.tags.map((tag) => (
                                    <Fragment key={tag.name}>
                                      <a
                                        href={tag.href}
                                        className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                                      >
                                        <span className="absolute flex flex-shrink-0 items-center justify-center">
                                          <span
                                            className={classNames(
                                              tag.color,
                                              "h-1.5 w-1.5 rounded-full"
                                            )}
                                            aria-hidden="true"
                                          />
                                        </span>
                                        <span className="ml-3.5 font-medium text-gray-900">
                                          {tag.name}
                                        </span>
                                      </a>{" "}
                                    </Fragment>
                                  ))}
                                </span>
                                <span className="whitespace-nowrap">
                                  {activityItem.date}
                                </span>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </>
      )}
    </>
  );
}
