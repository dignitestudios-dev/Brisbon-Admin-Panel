import UserTable from "../../../components/app/users/UsersTable";

const Users = () => {
  return (
    <div className="">
      {/* <div className="grid grid-cols-2 items-center justify-between">
        <div>
          <p className="text-heading text-base font-semibold">Bookings</p>
        </div>
        <SearchField />
      </div> */}

      <UserTable />
    </div>
  );
};

export default Users;