import DriverDetails from "../../components/drivers/driverDetails.jsx";
import LayoutShell from "../../components/LayoutShell.jsx";
import {
  CalendarIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function Driver({ driver }) {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: false },
    { name: "League", href: "/league", icon: CalendarIcon, current: true },
    { name: "Stats", href: "#", icon: UserGroupIcon, current: false },
  ];
  return (
    <LayoutShell nav={navigation}>
      <div>
        <div className="p-5">
          <h1 className="text-3xl font-bold mb-5">Driver Page</h1>
          <DriverDetails driver={driver} />
        </div>
      </div>
      <div></div>
    </LayoutShell>
  );
}
