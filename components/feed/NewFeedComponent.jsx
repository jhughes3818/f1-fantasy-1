/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          rose: colors.rose,
        },
      },
    },
  }
  ```
*/
import { Fragment } from "react";
import {
  ChatBubbleLeftEllipsisIcon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";

const activity = [
  {
    id: 1,
    type: "comment",
    person: { name: "Toto Wolff", href: "#" },
    imageUrl:
      "https://www.sbs.ox.ac.uk/sites/default/files/M256909%20square_0.jpg",
    comment: "I think we should hire Mick Schumacher. Guenther is crazy. ",
    date: "6d ago",
  },
  {
    id: 2,
    type: "assignment",
    person: { name: "Toto Wolff", href: "#" },
    assigned: { name: "Mick Schumacher", href: "#" },
    date: "2d ago",
  },

  {
    id: 4,
    type: "comment",
    person: { name: "Guenther Steiner", href: "#" },
    imageUrl:
      "https://pyxis.nymag.com/v1/imgs/547/141/7bfbfe240a27aa292953523e61cc7d9fc5-drive-to-survive-2.2x.rsquare.w570.jpg",
    comment:
      "We need the experienced drivers. You know, for the team longevity.",
    date: "2h ago",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NewFeedComponent() {
  return (
    <>
      <div className="border-b border-gray-200 pb-5 mb-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Recent Activity
        </h3>
      </div>
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {activity.map((activityItem, activityItemIdx) => (
            <li key={activityItem.id}>
              <div className="relative pb-8">
                {activityItemIdx !== activity.length - 1 ? (
                  <span
                    className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start space-x-3">
                  {activityItem.type === "comment" ? (
                    <>
                      <div className="relative">
                        <img
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                          src={activityItem.imageUrl}
                          alt=""
                        />

                        <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                          <ChatBubbleLeftEllipsisIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <a
                              href={activityItem.person.href}
                              className="font-medium text-gray-900"
                            >
                              {activityItem.person.name}
                            </a>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            Commented {activityItem.date}
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>{activityItem.comment}</p>
                        </div>
                      </div>
                    </>
                  ) : activityItem.type === "assignment" ? (
                    <>
                      <div>
                        <div className="relative px-1">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                            <UserCircleIcon
                              className="h-5 w-5 text-gray-500"
                              aria-hidden="true"
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
                          bought{" "}
                          <a
                            href={activityItem.assigned.href}
                            className="font-medium text-gray-900"
                          >
                            {activityItem.assigned.name}
                          </a>{" "}
                          <span className="whitespace-nowrap">
                            {activityItem.date}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : activityItem.type === "tags" ? (
                    <>
                      <div>
                        <div className="relative px-1">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                            <TagIcon
                              className="h-5 w-5 text-gray-500"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 py-0">
                        <div className="text-sm leading-8 text-gray-500">
                          <span className="mr-0.5">
                            <a
                              href={activityItem.person.href}
                              className="font-medium text-gray-900"
                            >
                              {activityItem.person.name}
                            </a>{" "}
                            added tags
                          </span>{" "}
                          <span className="mr-0.5">
                            {activityItem.tags.map((tag) => (
                              <Fragment key={tag.name}>
                                <a
                                  href={tag.href}
                                  className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                                >
                                  <span className="absolute flex flex-shrink-0 items-center justify-center">
                                    <span
                                      className={classNames(
                                        tag.color,
                                        "h-1.5 w-1.5 rounded-full"
                                      )}
                                      aria-hidden="true"
                                    />
                                  </span>
                                  <span className="ml-3.5 font-medium text-gray-900">
                                    {tag.name}
                                  </span>
                                </a>{" "}
                              </Fragment>
                            ))}
                          </span>
                          <span className="whitespace-nowrap">
                            {activityItem.date}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
