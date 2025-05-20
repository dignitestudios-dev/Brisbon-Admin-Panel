import React, { useState, useEffect } from "react";
import { FaDollarSign, FaRegEye } from "react-icons/fa";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import axios from "../../../axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch transaction data from the API
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/admin/transaction");
        if (response.data.success) {
          setTransactions(response.data.data);
          setTotalRevenue(response.data.totallRevenue);
        }
      } catch (err) {
        setError("Failed to load transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []); // Empty dependency array to run only once on mount

  const calculateTotalRevenue = (transaction) => {
    return parseFloat(transaction.price); // Assuming `price` is the amount you need
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 h-full w-full overflow-auto">
      <h1 className="text-black text-3xl font-bold mb-6">Transactions</h1>

      {/* Total Revenue Only */}
      <div className="relative bg-gradient-to-r from-[#074F57] to-[#0a6b74] text-white p-6 rounded-xl shadow-lg mb-8 overflow-hidden">
        {/* Icon Background Watermark */}
        <div className="absolute right-0.5 top-8 text-white/20 text-9xl">
          <HiOutlineCurrencyDollar />
        </div>

        {/* Content */}
        <div className="z-10 relative">
          <h2 className="text-sm font-medium uppercase tracking-wider text-white/80">Total Revenue</h2>
          <p className="text-3xl font-bold mt-2">
            ${totalRevenue.toLocaleString()}
          </p>
          <p className="text-sm mt-1 text-white/70">+0% compared to last month</p>
        </div>
      </div>

      {/* Simplified Table */}
      <div className="bg-white border border-gray-300 rounded-xl shadow overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-[#074F57] text-white">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-medium">User</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Service</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Date / Time</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Transaction</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={transaction._id}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100 transition duration-200`}
              >
                <td className="py-4 px-6 text-gray-800">{transaction.userRecord.name}</td>
                <td className="py-4 px-6 text-gray-800">{transaction.serviceRecord.title}</td>
                <td className="py-4 px-6 text-gray-800">
                  {new Date(transaction.createdAt).toLocaleString()}
                </td>
                <td className="py-4 px-6 text-gray-800">${transaction.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
