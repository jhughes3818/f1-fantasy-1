import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const people = [
  {
    id: 1,
    name: "Mercedes",
    avatar: "https://logowiki.net/uploads/logo/m/mercedes-benz.svg",
  },
  {
    id: 2,
    name: "Red Bull",
    avatar:
      "https://i.bleacherreport.net/images/team_logos/328x328/red_bull_racing.png?canvas=492,328",
  },
  {
    id: 3,
    name: "McLaren",
    avatar:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8AAAQAAAD///0BAAb7+/vc3N3t7e3///xhYWHLy8zT09O7u7xISEjq6uv6+vv09PSHh4dwcHCPj5EiIiOioqLi4uNPT1FmZmhXV1fExMU0NDWcnJysrK4cGyBcXF4RERSzsrV+fn53d3g/P0BPT08MDAwuLi+enp8eHh+MjI0WFhk6OjrR0NVgX2QsKzBcALNXAAAFBElEQVR4nO3c63aiMBQFYDggtIACKqio9VrbTjud93+7SYBaL+A1IcLa38/prC52T0jiSVpNAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgGYyDEP1I0jW/IRNcFSlwHKdxSRcdYfPqWF32Zs6bqDm8QTYJmzZybQ3G8+pRH8WuS21z3qzIHYmq/VvFr1I9qVu4qt+2mvFXjjob4OZplkY7+dLvJS9+oxXO+kNTlWtGPvfka8ZT48+x8ZeNiz10pqdyri2tYdeRezFqn9t5XaZOs0t1SEObSdMOwnH96T7KeOmozbQkSygFb1u7g6XlZEGqiMdCZJQQO22CU1aqE7E/Y7NxZAX74ZZpSyhTm212TJZws60La54W0Sx6niZOHrl8coX8tsjTlVnYzpRO13yJORjCXuq49lSBufDJGx5wxs3LPVI6K5MoTNnccKJqnidyVh2+bKEnpp83kjmu7eXUMVqEYdS55b9gF+Vf973F4PK4vGEy4rzxaFZZT62a3OrjOcnM/lz535CGleZb/JWZfkylezZjHRjba2qj8cCvlTVcuPDs/J4emXbbn86VlE/HnDsV9CJst/nauLxD/iOJj2gHW6qnT13E9K33HDspxcrmV62AU3ZjTZrqC4eJ7sJ5c4U1i8NOJSb71lxPp0+ZJ7MWN9p20VpQPorJVq6+liqx6fOpxl5a32seH7JUFfWSthRuT7sBGz7chLaf0ry7bVCTf30OfXdTOoHcg4OJ6XPfHSdwJx/zjf7/yQuIZGUY0N/UfiU+eN/jtvPYeQljtU56JvYluNNl6OvjbCUxD7XCy4gHxDJ+mD/mUebj5Y9z4rts9+kY02X6aHovYsMkSdhiFp7n/+ybC+D3uKvf12ny17M7i0lyVgngvD3odJw7e7UuXXXGyxe74pI70KzpaJN1rrO5otu5J4fkmWyjof7fXNGop72JDAb/2bOP/446Qu0Dr3bw+1xX2+KaEo4h+kM8xml/ccRlI5hL29005QjPuAkTfex9MTv462Pq8vIh6iwSTR9YRLeAJ29S1leDS34uu5kykwP0sQlZDM7G6DDhcRGgd2/aqASm0VFnsK0JjTzJLdbO9dMqXwdFLnOO6uprYmdl48Y2vTyhKJ3MlZFN+Lal0YkSqp5ItGSCxPSptJDNJFeLopIn7HkN0ae3gUJTVrX58LzkUuGKc3qejWfC84mJAoFrvPVa83PRCSKtMe+zH3O1+mEtV0lfg1OJqSXuN4F1M6s+TSw6/9ba29lCU2TaKX66QTwSzffppSWU/XKVwt+uFT7Eco4xQn5HXxxTROlorJfwVvWv3qZUWFC9go2YHymfP04IZtEP6zar4I/il5DolkgtCGj1PI4Iam7mi5BcNwzpbnTmBHKeIcBie/TmuRg222S0J7vA4gPOsKks23MU10bMkW6ewmJnmvcjikU7x0/kYyjT8WWOyczRG8P92vZdzJ2Ty34R0FJV4DUMdhbuDNCvebsYrbcbQnZIthpWgG5fC00s21ag7YxP/LtDHsD/wm/4fQQWvkYTbtNDSygpoWU39BJtBr8BZarGUY6zbAROmzaLiZntMaUrxFNFaa3rEaNXCPSacWlvN/byCmGlc3nF5HaD/IHO6TgV+Xem1pAzssL2NiEcRM/CO5qva2b/AYy3SZ1Q4u4TfskDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADX0H8eCPpMMCX2tAAAAAElFTkSuQmCC",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TailwindSelect(props) {
  const [selected, setSelected] = useState(people[0]);

  return (
    <Listbox Value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-64 cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <img
                  src={selected.avatar}
                  alt=""
                  className="h-6 w-6 flex-shrink-0 rounded-full"
                />
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-64 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            src={person.avatar}
                            alt=""
                            className="h-6 w-6 flex-shrink-0 rounded-full"
                          />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
