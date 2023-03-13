const people = [
  {
    name: "jason",
    title: "Mercedes",
    points: "267",
    value: "$9m",
  },
  // More people...
];

import { useEffect, useState } from "react";
import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import numeral from "numeral";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CheckIcon, ClipboardIcon } from "@heroicons/react/20/solid";

export default function LeagueTable(props) {
  const [leagueMembers, setLeagueMembers] = useState([]);
  const [leagueName, setLeagueName] = useState();
  const [leagueCode, setLeagueCode] = useState();
  const session = useSession();
  const [copied, setCopied] = useState(false);

  // useEffect(() => {
  //   axios.get(`/api/leagues/${props.leagueCode}`).then((response) => {
  //     setLeagueName(response.data.league.name);

  //     const users = response.data.users;
  //     setLeagueMembers(users);
  //   });
  // }, []);

  const QueryClient = useQueryClient();
  // Use react query to get user data

  useEffect(() => {
    if (session) {
      axios.get(`/api/users/${session.user.id}`).then((response) => {
        const leagueCode = response.data.league_code;
        setLeagueCode(leagueCode);
        axios.get(`/api/leagues/${leagueCode}`).then((response) => {
          // setLeagueName(response.data.team);

          const users = response.data;

          //Order users by points

          const sortedUsers = users.sort((a, b) => {
            return b.points - a.points;
          });

          setLeagueMembers(sortedUsers);
        });
      });
    }
  }, [session]);

  function copyToClipboard() {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  //const query = useQuery('league', () => axios.get(`/api/leagues/${props.leagueCode}`))

  return (
    <div className="">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Your League</h1>
          <div className="flex">
            <h2 className="text-lg text-gray-600">League Code: {leagueCode}</h2>
            <CopyToClipboard text={leagueCode}>
              {/* // Button with clipboard icon */}
              <button
                className="text-gray-300 hover:text-gray-500 flex"
                onClick={() => copyToClipboard()}
              >
                {copied ? (
                  <CheckIcon className="h-5 w-5 ml-2 mt-1" />
                ) : (
                  <ClipboardIcon className="h-5 w-5 ml-2 mt-1" />
                )}
              </button>
            </CopyToClipboard>
          </div>

          <a
            className="text-purple-600 font-bold cursor-pointer"
            href="/league/switch"
          >
            Switch League
          </a>
        </div>
        {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Edit Team
          </button>
        </div> */}
      </div>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Points
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Cash
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {leagueMembers.map((person) => (
              <tr key={person.user_id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {person.username}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Title</dt>
                    <dd className="mt-1 truncate text-gray-700">
                      {person.points}
                    </dd>
                    <dt className="sr-only sm:hidden">Email</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                      {person.seasonPoints} points
                    </dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {person.points}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {/* ${person.cash}m */}
                  {numeral(person.cash).format("($ 0.00 a)")}
                </td>
                <td className="hidden px-3 py-4 text-right text-sm text-gray-500 sm:table-cell">
                  <a
                    className="text-indigo-600 hover:text-indigo-700 cursor-pointer font-bold"
                    href={`/team/${person.user_id}`}
                  >
                    View Team
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
