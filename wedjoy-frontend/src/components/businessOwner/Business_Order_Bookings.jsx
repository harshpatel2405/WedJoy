import React, { useState } from "react";
import { Search, Filter, Calendar, CheckCircle, XCircle, Clock, MoreVertical, Plus } from "lucide-react";

const Business_Order_Bookings = () => {
  // Sample data for orders and bookings
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Doe",
      date: "2025-03-15",
      status: "pending",
      amount: "$120.00",
    },
    {
      id: 2,
      customer: "Jane Smith",
      date: "2025-03-14",
      status: "completed",
      amount: "$250.00",
    },
    {
      id: 3,
      customer: "Alice Johnson",
      date: "2025-03-13",
      status: "cancelled",
      amount: "$80.00",
    },
    {
      id: 4,
      customer: "Bob Brown",
      date: "2025-03-12",
      status: "pending",
      amount: "$150.00",
    },
  ]);

  // State for filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered orders based on status and search query
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesSearch = order.customer
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Orders & Bookings</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus className="w-4 h-4" />
          Create New Order
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Orders Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
          <p className="mt-2 text-3xl font-bold text-gray-800">{orders.length}</p>
        </div>

        {/* Pending Orders Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h3 className="text-lg font-semibold text-gray-700">Pending Orders</h3>
          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {orders.filter((order) => order.status === "pending").length}
          </p>
        </div>

        {/* Completed Orders Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h3 className="text-lg font-semibold text-gray-700">Completed Orders</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {orders.filter((order) => order.status === "completed").length}
          </p>
        </div>

        {/* Cancelled Orders Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h3 className="text-lg font-semibold text-gray-700">Cancelled Orders</h3>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {orders.filter((order) => order.status === "cancelled").length}
          </p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white shadow-lg rounded-lg p-6 border mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <input
              type="date"
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-lg rounded-lg p-6 border">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="p-3">Customer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : order.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 font-semibold">{order.amount}</td>
                  <td className="p-3">
                    <button className="text-gray-500 hover:text-gray-700 transition">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Business_Order_Bookings;