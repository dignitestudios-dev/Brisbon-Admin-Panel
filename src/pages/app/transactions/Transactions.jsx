import React, { useState } from "react";
import { FaDollarSign, FaRegEye } from "react-icons/fa";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";


// Dummy Transaction Data
const initialTransactions = [
  {
    id: 1,
    user: "John Doe",
    status: "Received",
    transactionDate: "2024-11-20 08:00",
    totalAmount: "$16,000",
    platformFee: "$1,600",
    source: "Web Reservation",
  },
  {
    id: 2,
    user: "Jane Smith",
    status: "Withdrawn",
    transactionDate: "2024-11-19 14:00",
    totalAmount: "$21,000",
    platformFee: "$2,100",
    source: "Font Desks",
  },
  {
    id: 3,
    user: "Alice Johnson",
    status: "Received",
    transactionDate: "2024-11-17 20:00",
    totalAmount: "$24,500",
    platformFee: "$2,450",
    source: "Group Reservation",
  },
  {
    id: 4,
    user: "Bob Brown",
    status: "Withdrawn",
    transactionDate: "2024-11-16 19:00",
    totalAmount: "$14,000",
    platformFee: "$1,400",
    source: "Font Desks",
  },
];

const Transactions = () => {
  const [transactions] = useState(initialTransactions);

  const calculateTotalRevenue = (transaction) => {
    return parseFloat(transaction.totalAmount.replace('$', '').replace(',', ''));
  };

  return (
    <div className="p-6 h-full w-full overflow-auto">
      <h1 className="text-black text-3xl font-bold mb-6">Transactions</h1>

      {/* Total Revenue Only */}
      <div className="relative bg-gradient-to-r from-[#074F57] to-[#0a6b74] text-white p-6 rounded-xl shadow-lg mb-8 overflow-hidden">
  {/* Icon Background Watermark */}
  <div className="absolute right-0.5 top-8 text-white/20 text-9xl">
    <HiOutlineCurrencyDollar/>
  </div>

  {/* Content */}
  <div className="z-10 relative">
    <h2 className="text-sm font-medium uppercase tracking-wider text-white/80">Total Revenue</h2>
    <p className="text-3xl font-bold mt-2">
      ${transactions.reduce((acc, curr) => acc + calculateTotalRevenue(curr), 0).toLocaleString()}
    </p>
    <p className="text-sm mt-1 text-white/70">+12% compared to last month</p>
  </div>
</div>


      {/* Simplified Table */}
      <div className="bg-white border border-gray-300 rounded-xl shadow overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-[#074F57] text-white">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-medium">User</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Service</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Date</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Transaction</th>
              {/* <th className="py-4 px-6 text-left text-sm font-medium">Total Revenue</th> */}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100 transition duration-200`}
              >
                <td className="py-4 px-6 text-gray-800">{transaction.user}</td>
                <td className="py-4 px-6 text-gray-800">{transaction.source}</td>
                <td className="py-4 px-6 text-gray-800">{transaction.transactionDate}</td>
                                <td className="py-4 px-6 text-gray-800">{transaction.totalAmount}</td>

                {/* <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.status === "Received"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td> */}
                {/* <td className="py-4 px-6 text-gray-800">{transaction.totalAmount}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
