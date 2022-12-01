import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SupaBaseTest() {
  const [fetchError, setFetchError] = useState(null);
  const [driversList, setDriversList] = useState([]);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    const supabase = createClient(supabaseUrl, supabaseKey);

    supabase
      .from("drivers")
      .select("*")
      .then((response) => setDriversList(response.data));
  }, []);

  return (
    <>
      <table className="table-auto">
        <tr className="font-bold text-left">
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Team</th>
        </tr>
        {driversList.map((driver, index) => (
          <tr
            key={driver.id}
            className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
          >
            <td className="border px-4 py-2">
              <Link href="/">
                <a className="hover:underline">
                  {driver.first_name} {driver.last_name}
                </a>
              </Link>
            </td>
            <td className="border px-4 py-2">{driver.team}</td>
          </tr>
        ))}
      </table>
    </>
  );
}
