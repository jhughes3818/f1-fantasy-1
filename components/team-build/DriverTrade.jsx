import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import Modal from "./Modal";
import { useQuery } from "react-query";
import { NumericFormat } from "react-number-format";
import numeral from "numeral";
import RoundStatus from "../round-management/RoundStatus";

export default function DriverTrade(props) {
  const [selected1, setSelected1] = useState();
  const [selected2, setSelected2] = useState();
  const [profit, setProfit] = useState();
  const [message, setMessage] = useState();
  const [driversToSell, setDriversToSell] = useState([]);
  const [tradeOpen, setTradeOpen] = useState(false);
  const [newCash, setNewCash] = useState();
  const [cash, setCash] = useState();
  const [totalValue, setTotalValue] = useState();
  const [driverValue, setDriverValue] = useState();

  const drivers = useQuery("drivers", () =>
    axios.get("/api/drivers").then((res) => {
      return res.data;
    })
  );

  // Use query to get the latest round status
  const {
    isLoading: roundStatusLoading,
    error,
    data,
  } = useQuery("roundStatus", () => axios.get("/api/rounds/current-round"));

  useEffect(() => {
    if (data) {
      if (data.data.current_round[0].editing_allowed) {
        setTradeOpen(true);
      }
    }
  }, [data]);

  const teams = useQuery("team", () =>
    axios
      .get(`/api/teams/supabase/${props.session.user.id}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
  );

  useEffect(() => {
    if (teams.data != null && drivers.data != null) {
      setSelected1(teams.data.drivers[0]);
      setCash(numeral(teams.data.cash).format("($ 0.00 a)"));
      const valueOfDrivers = teams.data.drivers.reduce((acc, driver) => {
        return acc + driver.price;
      }, 0);
      setTotalValue(
        numeral(valueOfDrivers + teams.data.cash).format("($ 0.00 a)")
      );
      setDriverValue(numeral(valueOfDrivers).format("($ 0.00 a)"));

      const teamIDs = teams.data.drivers.map((driver) => {
        return driver.id;
      });

      // Check if any drivers are not in the team
      const list = drivers.data?.drivers.filter((driver) => {
        return !teamIDs.includes(driver.id);
      });

      setDriversToSell(list);
      setSelected2(list[0]);
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
    const driverSold = selected1;
    const driverBought = selected2;

    const oldTeam = teams.data.drivers;

    const cash = teams.data.cash;

    // Check if new cash is below 0, if it is, don't allow trade
    if (newCash < 0) {
      setModalHeading("Trade Failed");
      setModalBody(
        "You do not have enough cash to make this trade. Please select a different driver to sell."
      );
      setIsOpen(true);
      return;
    }

    const newTeam = oldTeam.filter((driver) => {
      return driver.id != driverSold.id;
    });

    //Add driver bought into newTeam
    newTeam.push(driverBought);

    // Create transaction record
    const trade = {
      user: props.session.user,
      driverSold: driverSold,
      // driverSoldPrice: driverSold.price,
      driverBought: driverBought,
      // driverBoughtPrice: driverBought.price,
      profit: profit,
      message: message,
    };

    await axios.post(`/api/trades/${props.session.user.id}`, {
      trade: trade,
    });

    await axios.post(`/api/teams/supabase/trade/${props.session.user.id}`, {
      driver_1: newTeam[0].id,
      driver_2: newTeam[1].id,
      driver_3: newTeam[2].id,
      driver_4: newTeam[3].id,
      driver_5: newTeam[4].id,
      cash: newCash,
    });

    setModalHeading("Trade Successful");
    setModalBody(
      "Traded " +
        driverSold.first_name +
        " " +
        driverSold.last_name +
        " for " +
        driverBought.first_name +
        " " +
        driverBought.last_name
    );
    setIsOpen(true);
  }

  useEffect(() => {
    if (selected1 != null && selected2 != null) {
      const change = selected1.price - selected2.price;
      setProfit(change);
      setNewCash(teams.data.cash + change);
    }
  }, [selected1, selected2]);

  if (tradeOpen) {
    if (selected1 != null && selected2 != null) {
      return (
        <>
          <div className="border-b border-gray-200 pb-5 mb-5">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Make A Trade
            </h3>
            <p>Remaining Cash: {numeral(newCash).format("($ 0.00 a)")}</p>
            <p>
              Current Team Value: {numeral(totalValue).format("($ 0.00 a)")}
            </p>
            <p>
              Current Value Of Drivers:{" "}
              {numeral(driverValue).format("($ 0.00 a)")}
            </p>
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
                    <Listbox.Button className="relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm h-10 hover:bg-gray-50 cursor-pointer">
                      <span className="block truncate">
                        {selected1.first_name} {selected1.last_name}{" "}
                        <span className="text-gray-500">
                          {/* ({selected1.price}m) */}
                          {numeral(selected1.price).format("($ 0.00 a)")}
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
                        {teams.data.drivers.map((person, personIdx) => (
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
                                  {person.first_name} {person.last_name}{" "}
                                  <span className="text-gray-500">
                                    {/* ({person.price}m) */}
                                    {/* <NumericFormat
                                      value={person.price}
                                      prefix={"$"}
                                      thousandsGroupStyle={"thousand"}
                                    /> */}
                                    {numeral(person.price).format("($ 0.00 a)")}
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
                    <Listbox.Button className="relative w-full  rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm h-10 hover:bg-gray-50 cursor-pointer">
                      <span className="block truncate">
                        {selected2.first_name} {selected2.last_name}{" "}
                        <span className="text-gray-500">
                          {/* ({selected2.price}m) */}
                          {numeral(selected2.price).format("($ 0.00 a)")}
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
                      <Listbox.Options className="absolute mt-1 max-h-48 xl:max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {driversToSell.map((person, personIdx) => (
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
                                  {person.first_name} {person.last_name}{" "}
                                  <span className="text-gray-500">
                                    {/* ({person.price}m) */}
                                    {/* <NumericFormat
                                      value={person.price}
                                      prefix={"$"}
                                      thousandsGroupStyle={"thousand"}
                                    /> */}
                                    {numeral(person.price).format("$ 0.00 a")}
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
                    Profit:
                    {/* {Math.round((selected2.price - selected1.price) * 1000) /
                      1000} */}
                    {numeral(profit).format("$ 0.00 a")}
                  </h1>
                ) : (
                  <h1 className="text-xl font-bold text-red-600 mb-4">
                    Profit: {numeral(profit).format("$ 0.00 a")}
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
      return (
        <>
          <div className="border-b border-gray-200 pb-5 mb-5">
            <h3 className="text-lg font-medium leading-6 text-gray-900 ">
              Make A Trade
            </h3>
          </div>
          <div className="grid place-items-center">
            <div className="gap-4">
              <div className="w-80 my-4">
                <div className="font-bold text-lg w-full text-center skeleton-loader rounded-md h-10 bg-gray-200 mb-4"></div>
                <div className="font-bold text-lg w-full text-center skeleton-loader rounded-md h-10 bg-gray-200 mb-4"></div>
                <div className="font-bold text-lg w-full text-center skeleton-loader rounded-md h-10 bg-gray-200 mb-4"></div>
                <div className="font-bold text-lg w-full text-center skeleton-loader rounded-md h-10 bg-gray-200 mb-4"></div>
                <div className="font-bold text-lg w-full text-center skeleton-loader rounded-md h-10 bg-gray-200 mb-4"></div>
                <div className="font-bold text-lg w-full text-center skeleton-loader rounded-md h-10 bg-gray-200 mb-4"></div>
                <div className="font-bold text-lg w-full text-center skeleton-loader rounded-md h-10 bg-gray-200 mb-4"></div>
              </div>
            </div>
          </div>
        </>
      );
    }
  } else {
    return (
      <>
        <div className="border-b border-gray-200 pb-5 mb-5">
          <h3 className="text-lg font-medium leading-6 text-gray-900 ">
            Make A Trade
          </h3>
        </div>
        <RoundStatus />
      </>
    );
  }
}
