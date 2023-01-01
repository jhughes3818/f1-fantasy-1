import { PaperClipIcon } from "@heroicons/react/20/solid";
import supabase from "../../database/supabaseClient";
import { useEffect, useState } from "react";

export default function DriverDetails(props) {
  const driver = props.driver[0];
  const [results, setResults] = useState([""]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  async function searchFunction(input) {
    //Search supabase drivers table for driver first name
    //If found, return driver details
    //If not found, return error message
    console.log(input);
    const results = await supabase
      .from("drivers")
      .select("*")
      .eq("first_name", input)
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    return results;
  }

  return (
    <>
      <div className="mb-5">
        <label
          htmlFor="search"
          className="hidden text-sm font-medium text-gray-700"
        >
          Quick search
        </label>
        <div className="relative mt-1 flex items-center">
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg pl-2 py-2"
            placeholder="Search"
            onChange={(e) => searchFunction(e.target.value)}
          />

          {/* <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
              ⌘K
            </kbd>
          </div> */}
        </div>
      </div>
      {results.length > 0 ? <h1>Results</h1> : null}
      <div></div>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {driver.first_name} {driver.last_name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{driver.team}</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Season Points
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{driver.points}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Average Overtakes
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {driver.average_overtakes}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Current Price
              </dt>
              <dd className="mt-1 text-sm text-gray-900">${driver.price}m</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Total Price Change
              </dt>
              <dd className="mt-1 text-sm text-gray-900">$3.4m</dd>
            </div>
            {/* <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">About</dt>
            <dd className="mt-1 text-sm text-gray-900">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
              incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
              consequat sint. Sit id mollit nulla mollit nostrud in ea officia
              proident. Irure nostrud pariatur mollit ad adipisicing
              reprehenderit deserunt qui eu.
            </dd>
          </div> */}
            {/* <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Attachments</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <ul
                role="list"
                className="divide-y divide-gray-200 rounded-md border border-gray-200"
              >
                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-2 w-0 flex-1 truncate">
                      resume_back_end_developer.pdf
                    </span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-2 w-0 flex-1 truncate">
                      coverletter_back_end_developer.pdf
                    </span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}
          </dl>
        </div>
      </div>
    </>
  );
}
