import BookingsTable from "../../../components/app/bookings/BookingsTable";
    // import SearchField from "../../components/global/SearchField";

const Bookings = () => {
  return (
    <div className="">
      {/* <div className="grid grid-cols-2 items-center justify-between">
        <div>
          <p className="text-heading text-base font-semibold">Bookings</p>
        </div>
        <SearchField />
      </div> */}

      <BookingsTable />
    </div>
  );
};

export default Bookings;