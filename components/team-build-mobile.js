import DriverSelectBox from "./driver-select-box";
import { Fragment, useEffect, useState } from "react";
import { TeamBuildData } from "./team-build-data";
import { people } from "./team-data";
import { Listbox, Transition, Dialog } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import NewTeamGrid from "./new-team-grid";
import MyModal from "./modal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TeamBuildMobile() {
  //States used for handling driver information
  const [options, setOptions] = useState(TeamBuildData.mer);

  //States used for progress of building team
  const [driversCount, setDriversCount] = useState(0);
  const [cash, setCash] = useState(30);

  //States used for team select
  const [selected, setSelected] = useState(people[0]);

  const [drivers, setDrivers] = useState([]);
  let [isOpen, setIsOpen] = useState(false);

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
    if (driversCount >= 5) {
    } else if (newCash < 0) {
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
              price={option.price}
              overtakes={option.overtakes}
              bestRaceResult={option.bestRaceResult}
              bestQualifyingResult={option.bestQualifyingResult}
            />
            {drivers.includes(option) ? (
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

  return (
    <div className="md:flex pl-4 md:px-0 gap-2">
      <MyModal
        function={closeModal}
        isOpen={isOpen}
        heading="Budget Exceeded"
        body="You have a maximum of budget of $30m."
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
        />
      </div>
    </div>
  );
}
