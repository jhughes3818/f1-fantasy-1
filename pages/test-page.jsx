import DriverResults from "../components/drivers/results/DriverResults";
import RoundStatus from "../components/round-management/RoundStatus";

export default function Test() {
  return (
    <div className="grid place-items-center h-screen">
      <DriverResults driverID={143} />
    </div>
  );
}
