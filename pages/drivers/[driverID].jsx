import DriverDetails from "../../components/drivers/driverDetails.jsx";
import LayoutShell from "../../components/LayoutShell.jsx";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { navigationDrivers } from "../../components/navigation/Navigation.jsx";
import DriverResults from "../../components/drivers/results/DriverResults.jsx";
import { useSession } from "@supabase/auth-helpers-react";

export default function Driver({ driver }) {
  const session = useSession();

  const navigation = navigationDrivers.map((item) => ({
    ...item,
    href: item.href === "#" ? `/team/${session?.user.id}` : item.href,
  }));

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
        <div className="p-5">
          {/* <h1 className="text-lg font-medium leading-6 text-gray-900">
            Results
          </h1> */}
          <DriverResults driverID={driverID} />
        </div>
      </div>
      {/* <div></div> */}
    </LayoutShell>
  );
}
