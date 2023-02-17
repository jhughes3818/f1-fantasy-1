import {
  BookOpenIcon,
  CalendarIcon,
  HomeIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const navigationHome = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  { name: "League", href: "/league", icon: CalendarIcon, current: false },
  { name: "Team", href: "#", icon: UserGroupIcon, current: false },
  { name: "Drivers", href: "/drivers", icon: UserIcon, current: false },
  { name: "Rules", href: "/rules", icon: BookOpenIcon, current: false },
];

const navigationTeam = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: false },
  { name: "League", href: "/league", icon: CalendarIcon, current: false },
  { name: "Team", href: "#", icon: UserGroupIcon, current: true },
  { name: "Drivers", href: "/drivers", icon: UserIcon, current: false },
  { name: "Rules", href: "/rules", icon: BookOpenIcon, current: false },
];

const navigationLeague = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: false },
  { name: "League", href: "/league", icon: CalendarIcon, current: true },
  { name: "Team", href: "#", icon: UserGroupIcon, current: false },
  { name: "Drivers", href: "/drivers", icon: UserIcon, current: false },
  { name: "Rules", href: "/rules", icon: BookOpenIcon, current: false },
];

const navigationDrivers = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: false },
  { name: "League", href: "/league", icon: CalendarIcon, current: false },
  { name: "Team", href: "#", icon: UserGroupIcon, current: false },
  { name: "Drivers", href: "/drivers", icon: UserIcon, current: true },
  { name: "Rules", href: "/rules", icon: BookOpenIcon, current: false },
];

const navigationRules = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: false },
  { name: "League", href: "/league", icon: CalendarIcon, current: false },
  { name: "Team", href: "#", icon: UserGroupIcon, current: false },
  { name: "Drivers", href: "/drivers", icon: UserIcon, current: false },
  { name: "Rules", href: "/rules", icon: BookOpenIcon, current: true },
];

export {
  navigationHome,
  navigationTeam,
  navigationLeague,
  navigationDrivers,
  navigationRules,
};
