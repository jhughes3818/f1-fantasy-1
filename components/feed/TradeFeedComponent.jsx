import {
  ChatBubbleLeftEllipsisIcon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";

export default function TradeFeedComponent(props) {
  const activityItem = props.activityItem;

  return (
    <>
      <div>
        <div className="relative px-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
            <img
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
              src={activityItem.imageUrl}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1 py-1.5">
        <div className="text-sm text-gray-500">
          <a
            href={activityItem.person.href}
            className="font-medium text-gray-900"
          >
            {activityItem.person.name}
          </a>{" "}
          traded{" "}
          <a
            href={activityItem.assigned.href}
            className="font-medium text-gray-900"
          >
            {activityItem.assigned.name}
          </a>{" "}
          for{" "}
          <a
            href={activityItem.assigned.href}
            className="font-medium text-gray-900"
          >
            {activityItem.sold.name}
          </a>{" "}
          <span className="whitespace-nowrap">{activityItem.date}</span>
          <div className="mt-2 text-sm text-gray-700">
            <p>{activityItem.comment}</p>
          </div>
        </div>
      </div>
    </>
  );
}
