import {
  ChatBubbleLeftEllipsisIcon,
  TagIcon,
  UserCircleIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/20/solid";

export default function TradeFeedComponent(props) {
  const activityItem = props.activityItem;

  return (
    <>
      <div>
        <div className="relative px-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 ring-8 ring-white">
            {/* <img
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
              src={activityItem.imageUrl}
              alt=""
            /> */}
            <ArrowsRightLeftIcon className="h-5 w-5 text-green-500" />
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1 py-1.5">
        <div className="text-sm text-gray-500">
          <a
            href={activityItem.person.href}
            className="font-medium text-gray-900"
            id={activityItem.person.name}
          >
            {activityItem.person.name}
          </a>{" "}
          traded{" "}
          <a
            href={activityItem.bought.href}
            className="font-medium text-gray-900"
            id={activityItem.bought.name}
          >
            {activityItem.bought.name}
          </a>{" "}
          for{" "}
          <a
            href={activityItem.bought.href}
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
