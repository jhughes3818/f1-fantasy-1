import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import Modal from "./Modal";
import { useQuery } from "react-query";

export default function DriverTrade(props) {
  const [selected1, setSelected1] = useState();
  const [selected2, setSelected2] = useState();
  const [profit, setProfit] = useState();
  const [message, setMessage] = useState();

  const drivers = useQuery("drivers", () =>
    axios.get("/api/drivers").then((res) => {
      return res.data;
    })
  );

  const teams = useQuery("team", () =>
    axios.get(`/api/users/${props.session.user.email}`).then((response) => {
      return response.data;
    })
  );

  useEffect(() => {
    if (drivers.data != null) {
      setSelected2(drivers.data.teams[0]);
    }

    if (teams.data != null) {
      setSelected1(teams.data.user.team[0]);
      console.log(teams.data.user.team);
    }
  }, [drivers.data, teams.data]);

  //Modal states
  let [isOpen, setIsOpen] = useState(false);
  let [modalBody, setModalBody] = useState("");
  let [modalHeading, setModalHeading] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  async function confirmTrade() {
    const oldTeam = teams.data.user.team;
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
      const newCash = teams.data.user.cash + profit;
      // Make new team list
      newDrivers.push(driverBought);
      console.log(newDrivers);

      // Create transaction record
      const trade = {
        user: props.session.user,
        driverSold: driverSold,
        driverSoldPrice: driverSold.price,
        driverBought: driverBought,
        driverBoughtPrice: driverBought.price,
        profit: profit,
        message: message,
      };

      //
      await axios.put(`/api/teams/${props.session.user.email}`, {
        drivers: newDrivers,
        cash: newCash,
        user: props.session.user,
      });
      await axios.put(`/api/trades/${teams.data.user.league}`, {
        trade: trade,
      });

      setModalHeading("Trade Completed");
      setModalBody(`You traded ${driverSold.name} for ${driverBought.name}.`);
      setIsOpen(true);
    }
  }

  useEffect(() => {
    if (selected1 != null && selected2 != null) {
      const change =
        Math.round((selected2.price - selected1.price) * 1000) / 1000;
      setProfit(change);
    }
  }, [selected1, selected2]);

  if (selected1 != null && selected2 != null) {
    return (
      <>
        <div className="border-b border-gray-200 pb-5 mb-5">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Make A Trade
          </h3>
        </div>
        <div className="grid place-items-center">
          <Modal
            function={closeModal}
            isOpen={isOpen}
            heading={modalHeading}
            body={modalBody}
            buttonText="Got it"
          />

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
                      <span className="text-gray-500">
                        ({selected1.price}m)
                      </span>
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
                      {teams.data.user.team.map((person, personIdx) => (
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
                      <span className="text-gray-500">
                        ({selected2.price}m)
                      </span>
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
                      {drivers.data.teams.map((person, personIdx) => (
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
                  Profit: $
                  {Math.round((selected2.price - selected1.price) * 1000) /
                    1000}
                  m
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
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
