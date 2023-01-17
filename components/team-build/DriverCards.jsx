import numeral from "numeral";
export default function Example(props) {
  const people = props.drivers;
  return (
    <>
      {people.length === 0 ? (
        <div className="w-80 h-56 grid  place-items-center border-2 border-dashed border-gray-400 rounded-md">
          <h1 className="text-2xl text-center justify-center text-gray-400 ">
            No Drivers Selected
          </h1>
        </div>
      ) : (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
        >
          {people.map((person) => (
            <li
              key={person.id}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate text-center">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      {person.first_name} {person.last_name}
                    </h3>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-500 text-left">
                    {numeral(person.price).format("($ 0.00 a)")}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
