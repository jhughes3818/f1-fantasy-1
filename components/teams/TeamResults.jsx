import axios from "axios";
import { useQuery } from "react-query";
import supabase from "../../database/supabaseClient";

export default function TeamResults(props) {
  const { data, error, isLoading } = useQuery("driverResults", () =>
    getDriverResults(props.teamID)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data) {
    console.log(data);
    return (
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                    >
                      Round
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Points
                    </th>
                    {/* <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Finishing Position
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Points
                    </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((person) => (
                    <tr key={person.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.round}
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.points}
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.finishing_position}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.points}
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //   return <h1>Hello</h1>;
}

async function getDriverResults(teamID) {
  const { data, error } = await supabase
    .from("team_results")
    .select("*")
    .eq("team", teamID);

  if (error) {
    return { error: error.message };
  }

  if (data) {
    data.sort((a, b) => {
      return a.round - b.round;
    });

    console.log(data);

    return data;
  }
}
