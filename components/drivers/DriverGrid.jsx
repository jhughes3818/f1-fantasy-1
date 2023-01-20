import {
  EnvelopeIcon,
  PhoneIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/20/solid";
import { useQuery } from "react-query";
import axios from "axios";
import numeral from "numeral";

// const people = [
//   {
//     name: "Jane Cooper",
//     title: "Regional Paradigm Technician",
//     role: "Admin",
//     email: "janecooper@example.com",
//     telephone: "+1-202-555-0170",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
//   },
//   // More people...
// ];

export default function DriverGrid() {
  const people = useQuery("people", () =>
    axios.get("/api/drivers").then((res) => res.data)
  );

  if (people.isLoading) return <div>Loading...</div>;
  if (people.isError) return <div>Error: {people.error.message}</div>;

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {people.data.drivers.map((person) => (
        <li
          key={person.email}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">
                  {person.first_name} {person.last_name}
                </h3>

                {/* <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  {person.team}
                </span> */}
              </div>
              <h3 className="truncate text-sm text-gray-900">{person.team}</h3>
              <p className="mt-1 truncate text-sm text-gray-500">
                {numeral(person.price).format("($ 0.00 a)")}
              </p>
            </div>
            {/* <img
              className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
              src={person.imageUrl}
              alt=""
            /> */}
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              {/* <div className="flex w-0 flex-1">
                <a
                  href={`mailto:${person.email}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <EnvelopeIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-3">Email</span>
                </a>
              </div> */}
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href={`/drivers/${person.id}`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <PresentationChartLineIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-3">More info</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
