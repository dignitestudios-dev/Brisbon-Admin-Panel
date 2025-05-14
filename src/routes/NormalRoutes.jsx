import { Route, Routes } from "react-router";
import DummyHome from "../pages/app/DummyHome";
import UsersTable from "../components/app/users/UsersTable";
import UserProfile from "../pages/app/users/UserProfile";
import ServiceTable from "../components/app/services/ServiceTable";
import BookingsTable from "../components/app/bookings/BookingsTable";
import ReportsTable from "../components/app/reports/ReportsTable";
import Chat from "../pages/app/chat/Chat";
import ServiceDetails from "../pages/app/services/ServiceDetails";
import BookingDetails from "../pages/app/bookings/BookingDetails";
import ReportDetails from "../pages/app/reports/ReportDetails";
import Reviews from "../pages/app/reviews/Reviews";
import Bookings from "../pages/app/bookings/Bookings";
import Users from "../pages/app/users/Users";
import Services from "../pages/app/services/Services";
import Reports from "../pages/app/reports/Reports";
import Transactions from "../pages/app/transactions/Transactions";
import Notifications from "../pages/app/notifications/Notifications";



export const normalRoutes = [
  {
    title: "Dashboard",
    url: "dashboard",
    page: <DummyHome />,
  },
  {
    title: "Users",
    url: "users",
    page: <Users />,
  },
  {
    title: "deleted",
    url: "user-profile/:id",
    page: <UserProfile />,
  },
  {
    title: "reports",
    url: "services",
    page: <Services />,
  },
  {
    title: "blocked",
    url: "reports",
    page: <Reports />,
  },
  {
    title: "matches",
    url: "bookings",
    page: <Bookings />,
  },

  {
    title: "notifications",
    url: "service-details/:id",
    page: <ServiceDetails />,
  },
  {
    title: "create-notification",
    url: "booking-details/:id",
    page: <BookingDetails />,
  },
  {
    title: "Location",
    url: "report-details/:id",  
    page: <ReportDetails />,
  },

  {
    title: "Location",
    url: "reviews",
    page: <Reviews />,
  },

  {
    title: "Transactions",
    url: "transactions",
    page: <Transactions />,
  },

  {
    title: "Notifications",
    url: "notifications",
    page: <Notifications />,
  },

  {
    title: "Location",
    url: "chat",
    page: <Chat />,
  },

];
