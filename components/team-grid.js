import DriverSelected from "./driver-selected";
import ProgressBar from "./progress-bar";

export default function TeamGrid(props) {
  //   const driver1 = useState(["Lewis Hamilton"]);

  return (
    <div className="py-2">
      <ProgressBar
        fraction="[3rem]"
        text={`Drivers Selected: ${props.driverCount}`}
      />
      <ProgressBar fraction="1/2" text={`Cash Remaining: $${props.cash}m`} />
      {/* <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-80 justify-center">
        <DriverSelected name={props.drivers[4]} />
        <DriverSelected name={props.drivers[3]} />
        <DriverSelected name={props.drivers[2]} />
        <DriverSelected name={props.drivers[1]} />
        <DriverSelected name={props.drivers[0]} />
      </div> */}
      {/* {props.drivers.map((driver) => (
        <DriverSelected name={driver.name} />
      ))} */}
    </div>
  );
}
