import DriverSelectBox from "./team-build/DriverSelectBox.jsx";
import { Fragment, useEffect, useState } from "react";
import { TeamBuildData } from "./team-build/TeamBuildData.jsx";
import { people } from "./team-build/TeamData.jsx";
import { Listbox, Transition, Dialog } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import NewTeamGrid from "./team-build/NewTeamGrid.jsx";
import Modal from "./team-build/Modal.jsx";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TeamBuildMobile(props) {
  //Save Currency
  const [saveCurrent, setSaveCurrent] = useState(false);

  //Session
  const { data: session } = useSession();

  //States used for handling driver information
  const [options, setOptions] = useState(TeamBuildData.mer);

  //States used for progress of building team
  const [driversCount, setDriversCount] = useState(0);
  const [cash, setCash] = useState(30);

  //States used for team select
  const [selected, setSelected] = useState(people[0]);

  const [drivers, setDrivers] = useState([]);
  const [driversNames, setDriversNames] = useState([]);

  //Modal states
  let [isOpen, setIsOpen] = useState(false);
  let [modalBody, setModalBody] = useState("");
  let [modalHeading, setModalHeading] = useState("");

  useEffect(() => {
    if (session) {
      axios.get(`/api/users/${session.user.email}`).then(function (response) {
        setDrivers(response.data.user.team);
        setCash(response.data.user.cash);
        setSaveCurrent(true);
      });
    }
  }, []);

  useEffect(() => {
    const newCount = drivers.length;
    setDriversCount(newCount);
    const list = [];
    drivers.forEach((driver) => {
      list.push(driver.name);
    });
    setDriversNames(list);
  }, [drivers]);

  useEffect(() => {
    const value = selected.abbreviation;

    switch (value) {
      case "rbr":
        setOptions(TeamBuildData.rbr);
        break;
      case "mer":
        setOptions(TeamBuildData.mer);
        break;
      case "fer":
        setOptions(TeamBuildData.fer);
        break;
      case "mcl":
        setOptions(TeamBuildData.mcl);
        break;
      case "amr":
        setOptions(TeamBuildData.amr);
        break;
      case "alp":
        setOptions(TeamBuildData.alp);
        break;
      case "atr":
        setOptions(TeamBuildData.atr);
        break;
      case "ars":
        setOptions(TeamBuildData.ars);
        break;
      case "wil":
        setOptions(TeamBuildData.wil);
        break;
      case "haa":
        setOptions(TeamBuildData.haa);
        break;
    }
  }, [selected]);

  const addDriver = (option) => {
    const newCash = cash - option.price;
    setSaveCurrent(false);
    if (driversCount >= 5) {
      setModalBody("You can choose a maximum of 5 drivers for your team.");
      setModalHeading("Maximum number of drivers.");
      setIsOpen(true);
    } else if (newCash < 0) {
      setModalBody("You have a maximum budget of $30m to build your team.");
      setModalHeading("Exceeded Budget");
      setIsOpen(true);
    } else {
      setDrivers([...drivers, option]);
      const newDriversCount = driversCount + 1;
      setDriversCount(newDriversCount);
      // const newCash = cash - option.price;
      setCash(newCash);
    }
  };

  const removeDriver = (name) => {
    const newDrivers = drivers.filter((driver) => driver.name !== name);
    const driverToDelete = drivers.filter((driver) => driver.name == name);
    setDrivers(newDrivers);
    const newDriversCount = driversCount - 1;
    setDriversCount(newDriversCount);
    const newCash = cash + driverToDelete[0].price;
    setCash(newCash);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function DriverSelect() {
    return (
      <div className="h-full md:flex-col flex gap-2 overflow-x-auto">
        {options.map((option) => (
          <div className="relative" key={option.id}>
            <DriverSelectBox
              name={option.name}
              seasonPoints={option.seasonPoints}
              price={option.price}
              overtakes={option.overtakes}
              bestRaceResult={option.bestRaceResult}
              bestQualifyingResult={option.bestQualifyingResult}
            />

            {driversNames.includes(option.name) ? (
              <button
                onClick={() => removeDriver(option.name)}
                className="bg-[#65B5FF] w-8 h-8 rounded-full text-center absolute right-2 bottom-2 drop-shadow-lg text-white my-0"
              >
                <span className="py-0 my-0 font-bold text-2xl">-</span>
              </button>
            ) : (
              <button
                onClick={() => addDriver(option)}
                className="bg-[#65B5FF] w-8 h-8 rounded-full text-center absolute right-2 bottom-2 drop-shadow-lg text-white my-0"
              >
                <span className="py-0 my-0 font-bold text-2xl">+</span>
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }

  function TeamSelect() {
    return (
      <Listbox Value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-64 cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                <span className="flex items-center">
                  <img
                    src={selected.avatar}
                    alt=""
                    className="h-6 w-6 flex-shrink-0 rounded-full"
                  />
                  <span className="ml-3 block truncate">{selected.name}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-64 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {people.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-indigo-600" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <img
                              src={person.avatar}
                              alt=""
                              className="h-6 w-6 flex-shrink-0 rounded-full"
                            />
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {person.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
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
          </>
        )}
      </Listbox>
    );
  }

  function saveTeam() {
    console.log(session);
    axios
      .post(`/api/teams/${session.user.email}`, {
        drivers: drivers,
        cash: cash,
        user: session.user,
      })
      .then(function (response) {
        console.log(response);
        setModalBody("Your team has been created.");
        setModalHeading("Success!");
        setIsOpen(true);
        setSaveCurrent(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function nextButton() {}

  return (
    <div className="md:flex pl-4 md:px-0 gap-2">
      <Modal
        function={closeModal}
        isOpen={isOpen}
        heading={modalHeading}
        body={modalBody}
        buttonText="Got it"
      />
      <div className="gap-2">
        <div className="pb-2">
          <TeamSelect />
        </div>
        <DriverSelect />
      </div>
      <div className="md:ml-10 md:p-0 py-3">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Your Team
        </h1>

        <NewTeamGrid
          cash={cash}
          driverCount={driversCount}
          drivers={drivers}
          function={removeDriver}
          showProgressBars={true}
          showButton={true}
        />
        {driversCount === 5 && saveCurrent === false ? (
          <button
            disabled={false}
            className="box-styling bg-blue-500 text-white font-bold w-80 text-center"
            onClick={saveTeam}
          >
            Save
          </button>
        ) : (
          <button
            disabled={true}
            className="box-styling bg-blue-500 text-white font-bold w-80 text-center disabled:opacity-50"
            onClick={saveTeam}
          >
            Save
          </button>
        )}
        {props.isNewUser && saveCurrent === true ? (
          <Link href="/new-user/join-league">
            <span className="block box-styling text-blue-500 font-bold text-center w-80 border-blue-500 border-spacing-4 mt-3  cursor-pointer">
              Next
            </span>
          </Link>
        ) : null}
        {props.isNewUser && saveCurrent === false ? (
          <Link href="">
            <span className="block box-styling text-blue-500 font-bold text-center w-80 border-blue-500 border-spacing-4 mt-3 opacity-50 cursor-not-allowed">
              Next
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
