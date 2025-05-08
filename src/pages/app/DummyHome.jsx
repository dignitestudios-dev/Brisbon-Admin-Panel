import React from "react";
import DashboardStats from "../../components/app/dashboard/DashboardStats";
import BookingsTable from "../../components/app/bookings/BookingsTable";


const DummyHome = () => {
  // 🔢 Static dashboard data (can be adjusted based on what your charts expect)
  const dashboardData = {
    revenue_graph: [
      { month: "Jan", revenue: 5000 },
      { month: "Feb", revenue: 6000 },
      { month: "Mar", revenue: 5500 },
      { month: "Apr", revenue: 7000 },
    ],
    posts_graph: [
      { month: "Jan", posts: 80 },
      { month: "Feb", posts: 65 },
      { month: "Mar", posts: 90 },
      { month: "Apr", posts: 120 },
    ],
    users_growth_graph: [
      { month: "Jan", users: 150 },
      { month: "Feb", users: 200 },
      { month: "Mar", users: 180 },
      { month: "Apr", users: 220 },
    ],
    sales_graph: [
      { month: "Jan", sales: 25 },
      { month: "Feb", sales: 35 },
      { month: "Mar", sales: 30 },
      { month: "Apr", sales: 45 },
    ],
  };

  return (
    <div className="h-full w-full  p-2 lg:p-2 flex flex-col gap-6 justify-start items-start bg-white">
      <h1 className="text-black text-3xl font-bold">Dashboard</h1>

      {/* Stats Section */}
      <div className="w-full flex flex-col lg:flex-row gap-6">
        <DashboardStats />
      </div>

      <div className="w-full">
  <BookingsTable />
</div>



    </div>
  );
};

export default DummyHome;
