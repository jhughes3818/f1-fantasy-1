export default function FeedDriverPill(props) {
  return (
    <div className="bg-gray-100 border-b border-t px-5 border-gray-300 w-full">
      <h1 className="font-bold">{props.user.name}</h1>
      <p>{props.message}</p>
      <div className="flex gap-5">
        <div className="grid place-items-center">
          <div className="rounded-lg border border-red-600 bg-red-200 bg-opacity-50 md:h-10 sm:h-20 grid place-items-center my-2">
            <div className="px-2">
              <span className="text-center text-red-600 font-bold">
                {props.driverSold}
              </span>
            </div>
          </div>
        </div>
        <div className="grid place-items-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
          </span>
        </div>
        <div className="grid place-items-center">
          <div className="rounded-lg border border-green-600 bg-green-200 bg-opacity-50 md:h-10 sm:h-20 grid place-items-center">
            <div className="px-2">
              <span className="text-center text-green-600 font-bold">
                {props.driverBought}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
