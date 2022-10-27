import DriverSelected from "./driver-selected";
import { XCircleIcon } from "@heroicons/react/24/outline";
import ProgressBar from "./progress-bar";

const NewTeamGrid = (props) => {
  return (
    <div className="py-2">
      <ProgressBar
        fraction="[3rem]"
        text={`Drivers Selected: ${props.driverCount}`}
      />
      <ProgressBar fraction="1/2" text={`Cash Remaining: $${props.cash}m`} />
      {props.drivers.length == 0 ? (
        <div className="w-80 h-56 grid  place-items-center">
          <h1 className="text-2xl text-center justify-center text-gray-400">
            No Drivers Selected
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-80 justify-center">
          {props.drivers.map((driver) => (
            <div className="relative" key={driver.id}>
              <DriverSelected function={props.function} name={driver.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewTeamGrid;
