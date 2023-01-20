import { PaperClipIcon } from "@heroicons/react/20/solid";
import supabase from "../../database/supabaseClient";
import { useEffect, useState } from "react";
import numeral from "numeral";

export default function DriverDetails(props) {
  const driver = props.driver[0];

  return (
    <>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {driver.first_name} {driver.last_name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{driver.team}</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Season Points
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {/* {driver.points} */}
                {numeral(driver.points).format("0,0")}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Average Overtakes
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {numeral(driver.average_overtakes).format("0.00")}
                {/* {driver.average_overtakes} */}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Average Qualifying Position
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {/* {driver.average_qualifying_position} */}
                {numeral(driver.average_qualifying_position).format("0.00")}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Average Finishing Position
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {/* {driver.average_finishing_position} */}
                {numeral(driver.average_finishing_position).format("0.00")}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
