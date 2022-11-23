import { TeamBuildData } from "./TeamBuildData";
import { useState } from "react";
import DriverCards from "./DriverCards";
import ProgressBar from "./ProgressBar";
import Link from "next/link";

export default function NewTeamBuildMobile(props) {
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

  //Modal states
  let [isOpen, setIsOpen] = useState(false);
  let [modalBody, setModalBody] = useState("");
  let [modalHeading, setModalHeading] = useState("");

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
  return (
    <div className="md:flex pl-4 md:px-0 gap-2">
      <div className="gap-2">
        <div className="w-80">
          <div>
            <div className="mt-6 flow-root overflow-y-auto h-96 border border-gray rounded-md p-3">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {TeamBuildData.map((person) => (
                  <li key={person.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="min-w-0 flex-1 pl-2">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {person.name}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {"$" + person.price + "m"}
                        </p>
                      </div>
                      <div>
                        {driversNames.includes(person.name) ? (
                          <button
                            href="#"
                            className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
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
          </div>
        </div>
      </div>
      <div className="mt-6 md:ml-10 md:p-0 py-3">
        <div>
          {/* <ProgressBar
            fraction="[3rem]"
            text={`Drivers Selected: ${props.driverCount}`}
          /> */}
          <ProgressBar fraction="1/2" text={`Cash Remaining: $${cash}m`} />{" "}
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Your Team
        </h1>

        <DriverCards drivers={drivers} />
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
