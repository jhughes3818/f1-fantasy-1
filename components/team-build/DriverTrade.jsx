import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";

export default function DriverTrade() {
  const [buyOptions, setBuyOptions] = useState([]);
  const [sellOptions, setSellOptions] = useState([]);
  const [selected1, setSelected1] = useState(buyOptions[0]);
  const [selected2, setSelected2] = useState(sellOptions[0]);
  const [profit, setProfit] = useState();
  const [cash, setCash] = useState();
  const [message, setMessage] = useState();

  async function confirmTrade() {
    console.log("hello");
    const oldTeam = sellOptions;
    const driverSold = selected1;
    const driverBought = selected2;

    const oldDriverNames = [];

    oldTeam.forEach((driver) => {
      oldDriverNames.push(driver.name);
    });

    const newDrivers = oldTeam.filter(
      (driver) => driver.name !== driverSold.name
    );

    if (oldDriverNames.includes(driverBought.name)) {
      console.log("Hell nah dawg");
    } else {
      // Calculate new cash balance
      const newCash = cash + profit;
      setCash(newCash);
      // Make new team list
      newDrivers.push(driverBought);
      console.log(newDrivers);

      // Create transaction record
      const trade = {
        driverSold: driverSold,
        driverSoldPrice: driverSold.price,
        driverBought: driverBought,
        driverBoughtPrice: driverBought.price,
        profit: profit,
        message: message,
      };

      //
      await axios.put(`/api/teams/jhughes3818@gmail.com`, {
        drivers: newDrivers,
        cash: cash,
        user: { email: "jhughes3818@gmail.com" },
      });
      await axios.put(`/api/trades/jhughes3818@gmail.com`, { trade: trade });
    }
  }

  useEffect(() => {
    let driverList = [];
    axios.get("/api/drivers").then((response) => {
      setCash(response.data.cash);
      response.data.teams.forEach((team) => {
        team.drivers.forEach((driver) => {
          driverList.push(driver);
        });
      });
      setBuyOptions(driverList);
      setSelected2(driverList[0]);
    });

    let teamList = [];

    axios.get(`/api/users/jhughes3818@gmail.com`).then((response) => {
      console.log(response.data.user.team);
      teamList = response.data.user.team;
      console.log(teamList);
      setSellOptions(teamList);
      setSelected1(teamList[0]);
    });
  }, []);

  useEffect(() => {
    if (selected1 != null && selected2 != null) {
      const change = selected1.price - selected2.price;
      setProfit(change);
    }
  }, [selected1, selected2]);

  if (selected1 != null && selected2 != null) {
    return (
      <div className="grid place-items-center h-screen">
        <div className="gap-4">
          <div className="w-80 my-4">
            <h1 className="font-bold text-lg w-full text-center">
              Select Driver To Sell
            </h1>
            <Listbox value={selected1} onChange={setSelected1}>
              <div className="relative mt-1 z-40">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm h-10">
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
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
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
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
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
          <div className="w-80">
            <h1 className="font-bold text-lg w-full text-center">
              Select Driver to Buy
            </h1>
            <Listbox value={selected2} onChange={setSelected2}>
              <div className="relative mt-1 z-30">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm h-10">
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
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
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
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
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

          <div className="grid place-items-center my-4 w-80">
            {profit > 0 ? (
              <h1 className="text-xl font-bold text-green-600 mb-4">
                Profit: ${profit}m
              </h1>
            ) : (
              <h1 className="text-xl font-bold text-red-600 mb-4">
                Profit: ${profit}m
              </h1>
            )}

            <form className="grid place-items-center gap-3">
              <input
                placeholder="Reason for trade"
                type="text"
                className="block mb-3 box-styling px-2 w-80 text-center h-10"
                onChange={(e) => setMessage(e.target.value)}
              ></input>
            </form>
            <button
              onClick={() => confirmTrade()}
              className="button-styling h-10 w-80"
            >
              Confirm Trade
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
