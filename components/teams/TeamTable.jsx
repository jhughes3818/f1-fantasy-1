import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import LayoutShell from "../../components/LayoutShell";
import { useSession } from "@supabase/auth-helpers-react";

export default function TeamTable(props) {
  //Team id comes from router
  const teamID = props.teamID;
  const session = props.session;
  const data = props.team;

  if (session) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Team</h1>
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
                  Value
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                ></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.drivers.map((person) => (
                <tr key={person.id}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                    {person.first_name} {person.last_name}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Title</dt>
                      <dd className="mt-1 truncate text-gray-700">
                        {person.price}
                      </dd>
                      <dt className="sr-only sm:hidden">Email</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        {/* {person.seasonPoints} points */}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {person.points}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    ${person.cash}m
                  </td>
                  <td className="hidden px-3 py-4 text-right text-sm text-gray-500 sm:table-cell">
                    <a className="text-indigo-600 hover:text-indigo-700 cursor-pointer font-bold">
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
}
