import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import axios from "axios";
import FeedEntries from "./FeedEntries";
import JoinLeague from "../leagues/JoinLeague";
import DriverTrade from "../team-build/DriverTrade";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useQuery } from "react-query";
import RoundStatus from "../round-management/RoundStatus";
import NextRound from "../round-management/NextRound";
import TradesListLoader from "../loaders/TradesListLoader";
import { NULL_CHARACTER } from "remirror";

dayjs.extend(relativeTime);

export default function NewFeedComponent() {
  const session = useSession();
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noLeague, setNoLeague] = useState(false);
  const [open, setOpen] = useState(false);
  const [tradeOpen, setTradeOpen] = useState(false);

  // Use query to get the latest round status
  const {
    isLoading: roundStatusLoading,
    error,
    data,
  } = useQuery("roundStatus", () => axios.get("/api/rounds/current-round"));

  // if (data.data.current_round[0].editing_allowed) {
  //   setTradeOpen(true);
  // }

  useEffect(() => {
    if (data) {
      if (data.data.current_round[0].editing_allowed) {
        setTradeOpen(true);
      }
    }
  }, [data]);

  const [leagueCode, setLeagueCode] = useState(null);

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
    isSuccess: userSuccess,
  } = useQuery(session && `/api/users/${session.user.id}`, () =>
    axios.get(`/api/users/${session?.user.id}`)
  );

  useEffect(() => {
    if (!userLoading && !userError && userSuccess) {
      console.log(userData.data);
      setLeagueCode(userData.data.league_code);
    }
  }, [userLoading, userError, userSuccess, userData]);

  const {
    data: tradesData,
    isLoading: tradesLoading,
    error: tradesError,
  } = useQuery(
    leagueCode && `/api/trades/${leagueCode}`,
    () => axios.get(`/api/trades/${leagueCode}`),
    {
      refetchInterval: 60000, // refetch every 60 seconds
      refetchOnWindowFocus: true, // refetch when the window comes into focus
    }
  );

  useEffect(() => {
    if (!userLoading && !tradesLoading && !userError && !tradesError) {
      if (userData?.data?.league === null) {
        setNoLeague(true);
      } else {
        const tradesList = tradesData.data;
        console.log(tradesList);
        const activityList = [];
        tradesList.slice(-5).forEach((trade) => {
          let newEntry = null;
          if (trade.type === "trade") {
            newEntry = {
              id: tradesList.id,
              type: "assignment",
              person: { name: trade.user, href: `/team/${trade.user}` },
              assigned: {
                name:
                  trade.driver_bought.first_name +
                  " " +
                  trade.driver_bought.last_name,
                href: `/drivers/${trade.driver_sold_id}`,
              },
              sold: {
                name:
                  trade.driver_sold.first_name +
                  " " +
                  trade.driver_sold.last_name,
                href: `/drivers/${trade.driver_bought_id}`,
              },
              date: `${dayjs(trade.date).fromNow(true)}` + " ago",
              // imageUrl: trade.user.image,
              comment: trade.message,
            };
          } else if (trade.type === "round") {
            newEntry = {
              id: tradesList.id,
              type: "round",
              race: trade.round_name,
            };
          }
          activityList.push(newEntry);
        });
        console.log(activityList);
        setActivity(activityList.reverse());
        setIsLoading(false);
      }
    }
  }, [
    userLoading,
    tradesLoading,
    userError,
    tradesError,
    userData,
    tradesData,
  ]);

  if (userLoading || tradesLoading) {
    return (
      <>
        <div className="border-b border-gray-200 pb-5 mb-5">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Recent Activity
          </h3>
        </div>
        <TradesListLoader />
      </>
    );
  }

  if (userError || tradesError) {
    return <div>Error: {userError?.message || tradesError?.message}</div>;
  }

  // Button aligned to bottom right of div

  return (
    <>
      <div className="border-b border-gray-200 pb-5 mb-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Recent Activity
        </h3>
      </div>
      <NextRound />
      {isLoading ? (
        <TradesListLoader />
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

              {tradeOpen ? (
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6 xl:hidden"
                  onClick={() => setOpen(true)}
                >
                  Trade
                </button>
              ) : (
                <div className="xl:hidden">
                  <RoundStatus />
                </div>
              )}

              <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                          <div className="absolute right-3 top-3">
                            <button
                              type="button"
                              className="inline-flex justify-center  h-5 w-5"
                              onClick={() => setOpen(false)}
                            >
                              <XMarkIcon />
                            </button>
                          </div>
                          <div>
                            {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                              <CheckIcon
                                className="h-6 w-6 text-green-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                              >
                                Payment successful
                              </Dialog.Title>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Consequatur amet labore.
                                </p>
                              </div>
                            </div> */}
                            <DriverTrade session={session} />
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            </>
          ) : (
            <h1>Loading...</h1>
          )}
        </>
      )}
    </>
  );
}
