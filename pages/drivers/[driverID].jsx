import DriverDetails from "../../components/drivers/driverDetails.jsx";
import LayoutShell from "../../components/LayoutShell.jsx";
import {
  CalendarIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { Query, useQuery } from "react-query";
import { useRouter } from "next/router";
import { navigationTeam } from "../../components/navigation/Navigation.jsx";

export default function Driver({ driver }) {
  // const navigation = [
  //   { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: false },
  //   { name: "League", href: "/league", icon: CalendarIcon, current: false },
  //   { name: "Stats", href: "#", icon: UserGroupIcon, current: true },
  // ];

  const navigation = navigationTeam;

  const router = useRouter();
  const { driverID } = router.query;

  console.log(driverID);

  // Use react query to get driver data from driver api endpoint
  const { data, status } = useQuery(["driver", driverID], () =>
    axios.get(`/api/drivers/${driverID}`).then((res) => res.data)
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error fetching data</div>;
  }

  console.log(data);
  return (
    <LayoutShell nav={navigation}>
      <div>
        <div className="p-5">
          <DriverDetails driver={data} />
        </div>
      </div>
      <div></div>
    </LayoutShell>
  );
}
