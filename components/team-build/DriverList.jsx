export default function DriverList(props) {
  return (
    <div className="mt-6 flow-root overflow-y-auto h-96 border border-gray rounded-md p-3 mb-6">
      <ul role="list" className="-my-5 divide-y divide-gray-200">
        {props.options.map((person) => (
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
              {/* <div>
              {props.driversNames.includes(person.name) ? (
                <button
                  href="#"
                  className="inline-flex items-center rounded-full border border-gray-300 bg-red-200 px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-red-400"
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
            </div> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
