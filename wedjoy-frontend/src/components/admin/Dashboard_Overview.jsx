import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  UserIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { 
  ArrowUpDown, 
  Plus, 
  Search, 
  Eye, 
  Pencil, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  UserCircle
} from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Dashboard_Overview = () => {
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalBusinesses: 0,
    totalRevenue: 0,
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [userGrowthData, setUserGrowthData] = useState({
    labels: [],
    datasets: [{
      label: 'New Users',
      data: [],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      tension: 0.4,
      fill: true
    }]
  });
  const [eventCategoryData, setEventCategoryData] = useState({
    labels: [],
    datasets: [
      {
        label: "Event Categories",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(100, 200, 200, 0.6)",
          "rgba(200, 100, 150, 0.6)",
          "rgba(180, 120, 220, 0.6)",
          "rgba(220, 180, 140, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const fetchEventCategories = async () => {
    try {
      const response = await axios.get("http://localhost:1999/api/admin/dashboard/eventCategories");
      const categories = response.data.categories;

      // Extract category names and counts
      const labels = categories.map((item) => item.eventCategory);
      const data = categories.map((item) => item.count);

      // Update state
      setEventCategoryData((prevData) => ({
        ...prevData,
        labels,
        datasets: [{ ...prevData.datasets[0], data }],
      }));
    } catch (error) {
      console.error("Error fetching event categories:", error);
    }
  };

  const fetchRecentEvents = async () => {
    try {
      const response = await axios.get("http://localhost:1999/api/admin/dashboard/getRecentEvents");
      const formattedEvents = response.data.recentEvents.map(event => ({
        eventID: event.eventID,
        eventName: event.eventName,
        organizerName: event.organizerName,
        eventStartDate: event.eventStartDate,
        status: event.status
      }));
      setRecentEvents(formattedEvents);
    } catch (error) {
      console.error("Failed to fetch recent events:", error);
      setRecentEvents([]);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const [users, events, businesses, revenue] = await Promise.all([
        axios.get("http://localhost:1999/api/admin/dashboard/totalUsers"),
        axios.get("http://localhost:1999/api/admin/dashboard/totalEvents"),
        axios.get("http://localhost:1999/api/admin/dashboard/getTotalActiveBusinesses"),
        axios.get("http://localhost:1999/api/admin/dashboard/getTotalRevenue")
      ]);

      setStats({
        totalUsers: users.data.totalUsers || 0,
        totalEvents: events.data.totalEvents || 0,
        totalBusinesses: businesses.data.totalActiveBusinesses || 0,
        totalRevenue: revenue.data.totalRevenue || 0
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
      setStats({
        totalUsers: 0,
        totalEvents: 0,
        totalBusinesses: 0,
        totalRevenue: 0
      });
    }
  };

  
  const sortedEvents = [...recentEvents].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
});

const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
    }
    setSortConfig({ key, direction });
};

  const fetchUserGrowthData = async () => {
    try {
      const response = await axios.get('http://localhost:1999/api/admin/dashboard/getUserGrowth');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      const formattedData = {
        labels: response.data.growthData.map(item => monthNames[item._id - 1]),
        datasets: [{
          label: 'New Users',
          data: response.data.growthData.map(item => item.count),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          tension: 0.4,
          fill: true
        }]
      };
      setUserGrowthData(formattedData);
    } catch (error) {
      console.error('Error fetching user growth data:', error);
      const mockData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'New Users',
          data: [120, 190, 150, 210, 180, 250],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          tension: 0.4,
          fill: true
        }]
      };
      setUserGrowthData(mockData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchDashboardStats();
      await fetchRecentEvents();
      await fetchUserGrowthData();
      await fetchEventCategories();
      
      
      setLoading(false);
    };
    fetchData();
  }, []);

  const StatCard = ({ title, value, icon, trend }) => (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <div className="bg-blue-100 p-2 rounded-full">
          {React.cloneElement(icon, { className: "h-5 w-5 text-blue-600" })}
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${trend > 0 ? "text-green-500" : "text-red-500"}`}>
            {trend > 0 ? <ArrowUpIcon className="h-4 w-4 mr-1" /> : <ArrowDownIcon className="h-4 w-4 mr-1" />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-xl font-bold mt-1 text-gray-800">
        {value !== undefined &&
          (title.includes("Revenue")
            ? `$${value.toLocaleString()}`
            : value.toLocaleString())}
      </p>
    </div>
  );

  const StatusBadge = ({ status }) => {
    let bgColor = "bg-gray-100";
    let textColor = "text-gray-800";
    
    if (status === "Approved") {
      bgColor = "bg-green-100";
      textColor = "text-green-800";
    } else if (status === "Rejected") {
      bgColor = "bg-red-100";
      textColor = "text-red-800";
    } else if (status === "Pending") {
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${bgColor} ${textColor}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
            Dashboard Overview
          </h1>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
              Export Report
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm border border-gray-300">
              Date Range
            </button>
          </div>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-28"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-200 rounded-lg h-64"></div>
              <div className="bg-gray-200 rounded-lg h-64"></div>
            </div>
            <div className="bg-gray-200 rounded-lg h-96"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard
                title="Total Users"
                value={stats.totalUsers}
                icon={<UserIcon />}
                trend={8.5}
              />
              <StatCard
                title="Total Events"
                value={stats.totalEvents}
                icon={<CalendarIcon />}
                trend={12.3}
              />
              <StatCard
                title="Active Businesses"
                value={stats.totalBusinesses}
                icon={<BuildingOfficeIcon />}
                trend={5.2}
              />
              <StatCard
                title="Total Revenue"
                value={stats.totalRevenue}
                icon={<CurrencyDollarIcon />}
                trend={-2.1}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  User Growth
                </h2>
                <div className="h-64">
                  <Line 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { position: "top" } }
                    }} 
                    data={userGrowthData} 
                  />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Event Categories</h2>
      <div className="h-64">
        <Pie
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "top" } },
          }}
          data={eventCategoryData}
        />
      </div>
    </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
                    Recent Events
                  </h2>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    <Link to='/admin/manage-events'> View All</Link>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
              <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-purple-200">
          <thead className="bg-purple-50">
            <tr>
              {[
                { label: "Event ID", key: "eventID", width: "w-32" },
                { label: "Event Name", key: "eventName", width: "w-48" },
                { label: "Organizer", key: "organizerName", width: "w-40" },
                { label: "Date", key: "eventStartDate", width: "w-32" },
                { label: "Status", key: "status", width: "w-28" },
                { label: "Actions", key: null, width: "w-24" }
              ].map(({ label, key, width }) => (
                <th
                  key={label}
                  className={`px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider ${width}`}
                >
                  <div 
                    className={`flex items-center ${key ? 'cursor-pointer hover:text-purple-900 group' : ''}`}
                    onClick={() => key && requestSort(key)}
                  >
                    {label}
                    {key && (
                      <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {sortConfig?.key === key ? (
                          sortConfig.direction === 'ascending' ? (
                            <ArrowUpDown className="h-4 w-4 text-purple-600 rotate-180" />
                          ) : (
                            <ArrowUpDown className="h-4 w-4 text-purple-600" />
                          )
                        ) : (
                          <ArrowUpDown className="h-4 w-4 text-purple-400" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-purple-100">
            {sortedEvents.length > 0 ? (
              sortedEvents.map((event) => (
                <tr 
                  key={event.eventID} 
                  className="hover:bg-purple-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-purple-900 bg-purple-100 px-3 py-1 rounded-full">
                      #{event.eventID}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-purple-900">{event.eventName}</div>
                    <div className="text-xs text-purple-500 mt-1">{event.category || "General"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
                        <UserCircle className="h-5 w-5 text-purple-700" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-purple-900">{event.organizerName}</div>
                        <div className="text-xs text-purple-500">{event.organizerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-purple-900">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      {new Date(event.eventStartDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-purple-500 mt-1 ml-6">
                      <Clock className="h-3 w-3 text-purple-400" />
                      {new Date(event.eventStartDate).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={event.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="text-purple-600 hover:text-purple-900 p-1.5 rounded-full hover:bg-purple-100"
                        title="View details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-purple-600 hover:text-purple-900 p-1.5 rounded-full hover:bg-purple-100"
                        title="Edit"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-purple-600 hover:text-purple-900 p-1.5 rounded-full hover:bg-purple-100"
                        title="More options"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="p-4 rounded-full bg-purple-100 text-purple-500 mb-4">
                      <Calendar className="h-8 w-8" />
                    </div>
                    <h4 className="mt-2 text-lg font-medium text-purple-900">No events found</h4>
                    <p className="mt-1 text-sm text-purple-500">Create a new event or adjust your search</p>
                    <button className="mt-4 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Event
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     
        </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard_Overview;


// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   Users,
//   Calendar,
//   Briefcase,
//   DollarSign,
//   Home,
//   ChevronRight,
// } from "lucide-react";

// const Dashboard_Overview = () => {
//   const [stats, setStats] = useState({
//     users: 0,
//     events: 0,
//     businesses: 0,
//     revenue: 0,
//   });
//   const [recentEvents, setRecentEvents] = useState([]);
//   const [userGrowthData, setUserGrowthData] = useState([]);
//   const [eventCategoryData, setEventCategoryData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // Simulate API calls with mock data
//         // Replace these with actual fetch calls in production
//         const mockFetch = async (endpoint) => {
//           await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
//           switch (endpoint) {
//             case "/api/admin/users/stats":
//               return { total: 1250 };
//             case "/api/admin/events/stats":
//               return { total: 340 };
//             case "/api/admin/businesses/stats":
//               return { total: 78 };
//             case "/api/admin/revenue/stats":
//               return { total: 15600 };
//             case "/api/admin/events/recent":
//               return [
//                 {
//                   id: 1,
//                   name: "Luxury Wedding Expo",
//                   date: "2025-03-10",
//                   category: "Wedding",
//                 },
//                 {
//                   id: 2,
//                   name: "Grand Engagement Gala",
//                   date: "2025-03-15",
//                   category: "Engagement",
//                 },
//                 {
//                   id: 3,
//                   name: "Destination Wedding Fair",
//                   date: "2025-03-20",
//                   category: "Wedding",
//                 },
//               ];
//             case "/api/admin/users/growth":
//               return [
//                 { value: 50 },
//                 { value: 120 },
//                 { value: 300 },
//                 { value: 450 },
//                 { value: 700 },
//                 { value: 1250 },
//               ];
//             case "/api/admin/events/categories":
//               return [
//                 { category: "Weddings", count: 40 },
//                 { category: "Engagements", count: 25 },
//                 { category: "Corporate", count: 20 },
//                 { category: "Birthdays", count: 15 },
//               ];
//             default:
//               throw new Error("Endpoint not found");
//           }
//         };

//         // Fetch data from mock endpoints
//         const [
//           usersStats,
//           eventsStats,
//           businessesStats,
//           revenueStats,
//           recentEventsData,
//           userGrowth,
//           eventCategories,
//         ] = await Promise.all([
//           mockFetch("/api/admin/users/stats"),
//           mockFetch("/api/admin/events/stats"),
//           mockFetch("/api/admin/businesses/stats"),
//           mockFetch("/api/admin/revenue/stats"),
//           mockFetch("/api/admin/events/recent"),
//           mockFetch("/api/admin/users/growth"),
//           mockFetch("/api/admin/events/categories"),
//         ]);

//         // Update states with fetched data
//         setStats({
//           users: usersStats?.total || 0,
//           events: eventsStats?.total || 0,
//           businesses: businessesStats?.total || 0,
//           revenue: revenueStats?.total || 0,
//         });

//         setRecentEvents(recentEventsData || []);

//         // Transform user growth data for Recharts
//         setUserGrowthData(
//           (userGrowth || []).map((item, index) => ({
//             name: `Month ${index}`,
//             users: item.value || 0,
//           }))
//         );

//         // Transform event categories for Recharts
//         setEventCategoryData(
//           (eventCategories || []).map((item, index) => ({
//             name: item.category || `Category ${index}`,
//             value: item.count || 0,
//           }))
//         );

//         setLoading(false);
//       } catch (err) {
//         console.error("Dashboard data fetch error:", err);
//         setError(err);
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // COLORS for charts
//   const COLORS = ["#10B981", "#F43F5E", "#6366F1", "#F97316"];

//   // Error handling component
//   if (error) {
//     return (
//       <div className="p-6 bg-red-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">
//             Dashboard Error
//           </h2>
//           <p className="text-red-500">
//             Failed to load dashboard data. Please try again later.
//           </p>
//           <pre className="mt-4 p-4 bg-red-100 rounded text-left">
//             {error.message}
//           </pre>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Loading skeleton
//   if (loading) {
//     return (
//       <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
//         <div className="animate-pulse space-y-4">
//           <div className="h-10 bg-gray-300 rounded w-1/2 mb-6"></div>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="bg-white h-32 rounded-xl shadow-md"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center text-gray-600">
//           <Home className="w-5 h-5 mr-2 text-blue-500" />
//           <span className="mr-2 text-sm">Home</span>
//           <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
//           <span className="mr-2 text-sm text-gray-500">Admin</span>
//           <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
//           <span className="text-sm font-semibold text-gray-800">Dashboard</span>
//         </div>

//         {/* Overview Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           {[
//             {
//               icon: <Users className="text-blue-500 w-8 h-8" />,
//               title: "Total Users",
//               value: stats.users,
//               color: "text-blue-600",
//             },
//             {
//               icon: <Calendar className="text-green-500 w-8 h-8" />,
//               title: "Total Events",
//               value: stats.events,
//               color: "text-green-600",
//             },
//             {
//               icon: <Briefcase className="text-purple-500 w-8 h-8" />,
//               title: "Active Businesses",
//               value: stats.businesses,
//               color: "text-purple-600",
//             },
//             {
//               icon: <DollarSign className="text-red-500 w-8 h-8" />,
//               title: "Total Revenue",
//               value: `$${(stats.revenue || 0).toLocaleString()}`,
//               color: "text-red-600",
//             },
//           ].map((card, index) => (
//             <div
//               key={index}
//               className="bg-white p-6 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 {card.icon}
//                 <p className={`text-2xl font-bold ${card.color}`}>
//                   {card.value}
//                 </p>
//               </div>
//               <h2 className="text-md font-semibold text-gray-600">
//                 {card.title}
//               </h2>
//             </div>
//           ))}
//         </div>

//         {/* Recent Events and Charts Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Recent Events */}
//           <div className="md:col-span-1 bg-white p-6 shadow-lg rounded-xl">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               Recent Events
//             </h2>
//             <div className="space-y-4">
//               {recentEvents.map((event) => (
//                 <div
//                   key={event.id}
//                   className="border-b last:border-none pb-3 flex justify-between items-center"
//                 >
//                   <div>
//                     <p className="font-medium text-gray-800">{event.name}</p>
//                     <p className="text-sm text-gray-500">{event.date}</p>
//                   </div>
//                   <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
//                     {event.category}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* User Growth Chart */}
//           <div className="md:col-span-1 bg-white p-6 shadow-lg rounded-xl">
//             <h2 className="text-lg font-semibold mb-4 text-gray-800">
//               User Growth
//             </h2>
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={userGrowthData}>
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line
//                     type="monotone"
//                     dataKey="users"
//                     stroke="#3B82F6"
//                     strokeWidth={3}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Event Categories Chart */}
//           <div className="md:col-span-1 bg-white p-6 shadow-lg rounded-xl">
//             <h2 className="text-lg font-semibold mb-4 text-gray-800">
//               Event Categories
//             </h2>
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={eventCategoryData}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {eventCategoryData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard_Overview;
