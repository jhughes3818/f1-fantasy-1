import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";

// const people = [
//   {
//     name: "Jane Cooper",
//     title: "Regional Paradigm Technician",
//     role: "Admin",
//     email: "janecooper@example.com",
//     telephone: "+1-202-555-0170",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
//   },
//   // More people...
// ];

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
              key={person.email}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate text-center">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      {person.name}
                    </h3>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-500">
                    ${person.price}m
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
