import {
  CalendarIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const navigationHome = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  { name: "League", href: "/league", icon: CalendarIcon, current: false },
  { name: "Team", href: "#", icon: UserGroupIcon, current: false },
];

const navigationTeam = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: false },
  { name: "League", href: "/league", icon: CalendarIcon, current: false },
  { name: "Team", href: "#", icon: UserGroupIcon, current: true },
];

const navigationLeague = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: false },
  { name: "League", href: "/league", icon: CalendarIcon, current: true },
  { name: "Team", href: "#", icon: UserGroupIcon, current: false },
];

export { navigationHome, navigationTeam, navigationLeague };
