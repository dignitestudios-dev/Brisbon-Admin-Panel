import ReportsTable from "../../../components/app/reports/ReportsTable";
    // import SearchField from "../../components/global/SearchField";

const Reports = () => {
  return (
    <div className="">
      {/* <div className="grid grid-cols-2 items-center justify-between">
        <div>
          <p className="text-heading text-base font-semibold">Bookings</p>
        </div>
        <SearchField />
      </div> */}

      <ReportsTable />
    </div>
  );
};

export default Reports;