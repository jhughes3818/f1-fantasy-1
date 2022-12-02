import { TeamBuildData } from "./TeamBuildData";
import { useEffect, useState } from "react";
import DriverCards from "./DriverCards";
import ProgressBar from "./ProgressBar";
import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import axios from "axios";
import Router from "next/router.js";
import Modal from "./Modal";
import DriverList from "./DriverList";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function NewTeamBuildMobile(props) {
  const supabase = useSupabaseClient();

  const session = useSession();
  //Save Currency
  const [saveCurrent, setSaveCurrent] = useState(false);

  //States used for handling driver information
  const [options, setOptions] = useState([]);

  //States used for progress of building team
  const [driversCount, setDriversCount] = useState(0);
  const [cash, setCash] = useState(30);

  //States used for team select
  const [selected, setSelected] = useState({});

  const [drivers, setDrivers] = useState([]);
  const [driversNames, setDriversNames] = useState([]);
  const [teamBuildData, setTeamBuildData] = useState();
  const [driverSort, setDriverSort] = useState("high");
  const [driversList, setDriversList] = useState([]);

  //Modal states
  let [isOpen, setIsOpen] = useState(false);
  let [modalBody, setModalBody] = useState("");
  let [modalHeading, setModalHeading] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/drivers").then((response) => {
      //console.log(response.data.teams);
      setOptions(response.data.teams);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const supabase = createClient(supabaseUrl, supabaseKey);

    supabase
      .from("drivers")
      .select("*")
      .then((response) => setDriversList(response.data));
  }, []);

  const addDriver = (option) => {
    const newCash = Math.round((cash - option.price) * 100) / 100;
    setSaveCurrent(false);
    console.log(option);
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
      setDriversNames([...driversNames, option.name]);
      const newDriversCount = driversCount + 1;
      setDriversCount(newDriversCount);
      // const newCash = cash - option.price;
      setCash(newCash);
    }
  };

  const removeDriver = (name) => {
    const newDrivers = drivers.filter((driver) => driver.name !== name.name);

    const driverToDelete = drivers.filter((driver) => driver.name == name.name);
    console.log(driversNames);
    console.log(name.name);
    const newDriversNames = driversNames.filter(
      (driver) => driver !== name.name
    );
    console.log(newDriversNames);
    setDriversNames(newDriversNames);
    setDrivers(newDrivers);
    const newDriversCount = driversCount - 1;
    setDriversCount(newDriversCount);
    const newCash = cash + name.price;
    setCash(newCash);
  };

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
        Router.push("/new-user/join-league");
        // setModalBody("Your team has been created.");
        // setModalHeading("Success!");
        // setIsOpen(true);
        // setSaveCurrent(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function closeModal() {
    setIsOpen(false);
  }

  function sort(direction) {
    if (direction === "low") {
      const newOptions = [...options];
      newOptions.sort(function (a, b) {
        return a.price - b.price;
      });

      setOptions(newOptions);

      console.log("Changed Sort Low");
    } else {
      const newOptions = [...options];
      newOptions.sort(function (a, b) {
        return b.price - a.price;
      });

      setOptions(newOptions);
      console.log("Changed Sort High");
    }
  }

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="md:flex pl-4 md:px-0 gap-2">
          <Modal
            function={closeModal}
            isOpen={isOpen}
            heading={modalHeading}
            body={modalBody}
            buttonText="Got it"
          />
          <div className="gap-2">
            <div className="w-80">
              <select
                onChange={(e) => {
                  sort(e.target.value);
                }}
                className="mt-3"
              >
                <option value="high">High-to-Low</option>
                <option value="low">Low-to-High</option>
              </select>
              <div>
                <div className="mt-6 flow-root overflow-y-auto h-96 border border-gray rounded-md p-3 mb-6">
                  <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {driversList.map((person) => (
                      <li key={person.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="min-w-0 flex-1 pl-2">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {person.first_name} {person.last_name}
                            </p>
                            <p className="truncate text-sm text-gray-500">
                              {/* {"$" + person.price + "m"} */}
                              {person.team}
                            </p>
                          </div>
                          <div>
                            {driversNames.includes(person.name) ? (
                              <button
                                href="#"
                                className="inline-flex items-center rounded-full border border-gray-300 bg-red-200 px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-red-400"
                                onClick={() => removeDriver(person)}
                              >
                                Remove
                              </button>
                            ) : (
                              <button
                                href="#"
                                className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                                onClick={() => addDriver(person)}
                              >
                                Select
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {driversCount === 5 && saveCurrent === false ? (
                  <button
                    disabled={false}
                    className="box-styling bg-blue-500 text-white font-bold w-80 text-center"
                    onClick={saveTeam}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    disabled={true}
                    className="box-styling bg-blue-500 text-white font-bold w-80 text-center disabled:opacity-50"
                    onClick={saveTeam}
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 md:ml-10 md:p-0 py-3">
            <div className="mb-6">
              <div>
                <ProgressBar
                  fraction="[3rem]"
                  text={`Drivers Selected: ${driversNames.length} / 5`}
                />
                <ProgressBar
                  fraction="1/2"
                  text={`Cash Remaining: $${cash}m`}
                />{" "}
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Your Team
              </h1>

              <DriverCards drivers={drivers} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
