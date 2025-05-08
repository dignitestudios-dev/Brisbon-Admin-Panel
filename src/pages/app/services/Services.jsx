import ReportsTable from "../../../components/app/reports/ReportsTable";
import ServiceTable from "../../../components/app/services/ServiceTable";

const Services = () => {
  return (
    <div className="">
      {/* <div className="grid grid-cols-2 items-center justify-between">
        <div>
          <p className="text-heading text-base font-semibold">Bookings</p>
        </div>
        <SearchField />
      </div> */}

      <ServiceTable />
    </div>
  );
};

export default Services;