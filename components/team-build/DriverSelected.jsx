import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function DriverSelected(props) {
  return (
    <div className="relative">
      <div
        className={`flex box-styling w-36 h-28 p-4 items-center justify-center`}
      >
        <span className="">
          <p className="text-center justify-center text-xl">{props.name}</p>
        </span>
        {props.showButton ? (
          <button
            onClick={() => props.function(props.name)}
            className="absolute top-2 right-2"
          >
            <span>
              <XMarkIcon className="block h-4 w-4 text-gray-400" />
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
