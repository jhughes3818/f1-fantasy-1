import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";

const currentTeam = [
  {
    id: 1,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 2,
    name: "George Russell",
    price: 9,
  },
  {
    id: 3,
    name: "Max Verstappen",
    price: 8,
  },
  {
    id: 4,
    name: "Sergio Perez",
    price: 7,
  },
  {
    id: 5,
    name: "Charles Leclerc",
    price: 6,
  },
];

const drivers = [
  {
    id: 1,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 2,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 3,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 4,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 5,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 6,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 7,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 8,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 9,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 10,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 11,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 12,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 13,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 14,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 15,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 16,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 17,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 18,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 19,
    name: "Lewis Hamilton",
    price: 10,
  },
  {
    id: 20,
    name: "Lewis Hamilton",
    price: 10,
  },
];
export default function DriverTrade() {
  const [team, setTeam] = useState(currentTeam);
  const [buyOptions, setBuyOptions] = useState(drivers);
  const [sellOptions, setSellOptions] = useState([]);
  const [sellDriver, setSellDriver] = useState();
  const [buyDriver, setBuyDriver] = useState();
  const [selected1, setSelected1] = useState(currentTeam[0]);
  const [selected2, setSelected2] = useState(drivers[0]);
  const [profit, setProfit] = useState();

  useEffect(() => {
    const change = selected1.price - selected2.price;
    setProfit(change);
  }, [selected1, selected2]);

  useEffect(() => {
    let driverList = [];
    axios.get("/api/drivers").then((response) => {
      response.data.teams.forEach((team) => {
        team.drivers.forEach((driver) => {
          driverList.push(driver);
        });
      });
      setBuyOptions(driverList);
    });

    let teamList = [];

    axios.get(`/api/users/jhughes3818@gmail.com`).then((response) => {
      console.log(response.data.user.team);
      teamList = response.data.user.team;
      console.log(teamList);
      setSellOptions(teamList);
    });
  }, []);

  return (
    <div className="flex">
      <h1>{profit}</h1>
      <div className="flex">
        <h1>Select Driver To Sell</h1>
        <Listbox value={selected1} onChange={setSelected1}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">
                {selected1.name}{" "}
                <span className="text-gray-500">({selected1.price}m)</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {sellOptions.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}{" "}
                          <span className="text-gray-500">
                            ({person.price}m)
                          </span>
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <div className="flex w-1/2">
        <h1>Select Driver to Buy</h1>
        <Listbox value={selected2} onChange={setSelected2}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">
                {selected2.name}{" "}
                <span className="text-gray-500">({selected2.price}m)</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {buyOptions.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}{" "}
                          <span className="text-gray-500">
                            ({person.price}m)
                          </span>
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
}
