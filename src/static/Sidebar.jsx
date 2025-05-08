// Sidebar.js or Sidebar.jsx
import { LuUsers } from "react-icons/lu";
import { RiDashboardLine } from "react-icons/ri"; // Add others as needed
import { IoBookmarkOutline } from "react-icons/io5";
import { GoReport } from "react-icons/go";
import { MdWorkOutline } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { GoStar } from "react-icons/go";
import { GoBriefcase } from "react-icons/go";
import { GoCalendar } from "react-icons/go";






export const sidebarData = [
  {
    title: "Dashboard",
    icon: RiDashboardLine,
    link: "/app/dashboard",
  },
  {
    title: "Users",
    icon: LuUsers,
    link: "/app/users",
  },
  {
    title: "Services",
    icon: GoBriefcase, // replace with the correct icon you want
    link: "/app/services",
  },
  {
    title: "Bookings",
    icon: GoCalendar, // replace with the correct icon
    link: "/app/bookings",
  },
  {
    title: "Reports",
    icon: GoReport, // replace with the correct icon
    link: "/app/reports",
  },
  {
    title: "Reviews",
    icon: GoStar, // replace with the correct icon
    link: "/app/reviews",
  },

  {
    title: "Chat",
    icon: IoChatbubblesOutline, // replace with the correct icon
    link: "/app/chat",
  },
];
