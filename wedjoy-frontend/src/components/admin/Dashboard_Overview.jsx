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
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalBusinesses: 0,
    totalRevenue: 0,
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [userGrowthData, setUserGrowthData] = useState({});
  const [eventCategoryData, setEventCategoryData] = useState({});

 // ... existing code ...
// ... existing code ...

// ... existing code ...

//suggest best theme

const fetchRecentEvents = async () => {
  try {
    const response = await axios.get("http://localhost:1999/api/admin/dashboard/getRecentEvents");
    
    // Validate and extract data from response
    const events = response.data?.recentEvents || [];
    
    // Transform dates and ensure all required fields exist
    const formattedEvents = events.map(event => ({
      eventID: event.eventID || event._id,
      eventName: event.eventName || 'Untitled Event',
      organizerName: event.organizerName || 'Unknown Organizer',
      eventStartDate: event.eventStartDate || new Date(),
      status: event.status || 'Pending'
    }));

    setRecentEvents(formattedEvents);
    console.log("Recent events loaded successfully!");
    
  } catch (error) {
    console.error("Failed to fetch recent events:", error);
    setRecentEvents([]); // Set empty array on error
    // You might want to set an error state here if you have one
  }
};

const fetchDashboardStats = async () => {
  try {
    // Fetch all stats from backend
    const [users, events, businesses, revenue] = await Promise.all([
      axios.get("http://localhost:1999/api/admin/dashboard/totalUsers"),
      axios.get("http://localhost:1999/api/admin/dashboard/totalEvents"),
      axios.get("http://localhost:1999/api/admin/dashboard/getTotalActiveBusinesses"),
      axios.get("http://localhost:1999/api/admin/dashboard/getTotalRevenue")
    ]);

    // Update stats with response data
    setStats({
      totalUsers: users.data.totalUsers || 0,
      totalEvents: events.data.totalEvents || 0,
      totalBusinesses: businesses.data.totalActiveBusinesses || 0,
      totalRevenue: revenue.data.totalRevenue || 0
    });

    // Log success message
    console.log("Dashboard stats loaded successfully!");

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




const fetchUserGrowthData = async () => {
  try {
    const response = await axios.get('http://localhost:1999/api/admin/dashboard/getUserGrowth');
    
    // Transform the data for the chart
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
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
    console.log(formattedData)
  } catch (error) {
    console.error('Error fetching user growth data:', error);
    // Set empty data on error
    setUserGrowthData({
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
  }
};

  

  // ... rest of the existing code ...



  useEffect(() => {
    fetchDashboardStats();
    fetchRecentEvents()
fetchUserGrowthData();
  
  
    // Simulate API calls
    setTimeout(() => {
      
      setRecentEvents([
        {
          id: 1,
          name: "Summer Music Festival",
          organizer: "Melody Productions",
          date: "2025-06-15",
          status: "Upcoming",
        },
        {
          id: 2,
          name: "Tech Conference 2025",
          organizer: "TechCorp Inc.",
          date: "2025-04-22",
          status: "Open",
        },
        {
          id: 3,
          name: "Networking Mixer",
          organizer: "Business Connect",
          date: "2025-03-30",
          status: "Open",
        },
        {
          id: 4,
          name: "Charity Gala Dinner",
          organizer: "Hope Foundation",
          date: "2025-05-12",
          status: "Upcoming",
        },
        {
          id: 5,
          name: "Basketball Tournament",
          organizer: "Sports League",
          date: "2025-04-05",
          status: "Open",
        },
      ]);

      setUserGrowthData({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "New Users",
            data: [1200, 1900, 2300, 3100, 3800, 4500],
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            tension: 0.4,
          },
        ],
      });

      setEventCategoryData({
        labels: ["Music", "Sports", "Networking", "Charity", "Tech", "Other"],
        datasets: [
          {
            label: "Event Categories",
            data: [30, 22, 18, 15, 10, 5],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            borderWidth: 1,
          },
        ],
      });

      setLoading(false);
    }, 1500);
    
  }, []);

  // Stat Card Component
  const StatCard = ({ title, value, icon, trend }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
          {icon}
        </div>
        {trend && (
          <div
            className={`flex items-center ${
              trend > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend > 0 ? (
              <ArrowUpIcon className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 mr-1" />
            )}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">
        {value !== undefined &&
          (title.includes("Revenue")
            ? `$${value.toLocaleString()}`
            : value.toLocaleString())}
      </p>
    </div>
  );

  // Loading skeleton
  const Skeleton = () => (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32"
          ></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80"></div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80"></div>
      </div>
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96"></div>
    </div>
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard Overview
        </h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            <span className="mr-2">Export Report</span>
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-md">
            Date Range
          </button>
        </div>
      </div>

      {loading ? (
        <Skeleton />
      ) : (
        <>
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<UserIcon className="h-6 w-6 text-blue-600" />}
              trend={8.5}
            />
            <StatCard
              title="Total Events"
              value={stats.totalEvents}
              icon={<CalendarIcon className="h-6 w-6 text-blue-600" />}
              trend={12.3}
            />
            <StatCard
              title="Total Active Businesses"
              value={stats.totalBusinesses}
              icon={<BuildingOfficeIcon className="h-6 w-6 text-blue-600" />}
              trend={5.2}
            />
            <StatCard
              title="Total Revenue"
              value={stats.totalRevenue}
              icon={<CurrencyDollarIcon className="h-6 w-6 text-blue-600" />}
              trend={-2.1}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                User Growth
              </h2>
              <div className="h-64">
                <Line options={chartOptions} data={userGrowthData} />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Event Category Distribution
              </h2>
              <div className="h-64">
                <Pie options={chartOptions} data={eventCategoryData} />
              </div>
            </div>
          </div>

          {/* Recent Events Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Recent Events
              </h2>
              <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Event Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Organizer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {recentEvents.map((event) => (
                    <tr
                      key={event.eventID}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {event.eventName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {event.organizerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {new Date(event.eventStartDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            event.status === "Open"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : event.status === "Upcoming"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard_Overview;
