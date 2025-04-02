import React, { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import EventStatus from "./EventStatus.jsx";

const Manage_Events = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [length, setLength] = useState(0);
  const itemsPerPage = 10; // 10 items per page

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/getAllEvent`);
        console.log("Response from API:", response.data);
        setLength(response.data.length);
        if (response.status === 200) {
          const events = response.data?.data;
          if (Array.isArray(events)) {
            const filteredEvents = events.filter(event => 
              event.status !== "Approved" && event.status !== "Rejected"
            ).map((event) => {
              let formattedDate = "N/A";
              if (event.eventStartDate) {
                const dateParts = event.eventStartDate.split("/");
                if (dateParts.length === 3) {
                  const [day, month, year] = dateParts;
                  const isoFormattedDate = `${year}-${month}-${day}`;
                  const parsedDate = new Date(isoFormattedDate);
                  if (!isNaN(parsedDate)) {
                    formattedDate = parsedDate.toLocaleDateString();
                  }
                }
              }
              return {
                id: event._id,
                name: event.eventName,
                date: formattedDate,
                event: event.eventCategory,
                location: event.venueName || "Online",
                image: event.eventBannerImage,
                price: event.ticketPrice || "Free",
                status: event.status,
              };
            });
            setData(filteredEvents);
          }
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
  
    fetchData();
  }, []);
  

  // Sort function
  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    setSortConfig({ key, direction });
  };

  // Filter data based on search
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6 shadow-lg rounded-lg">
     <div className="flex items-center justify-between mb-6">
  <input
    type="text"
    placeholder="Search Events..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="p-3 border border-purple-400 rounded-lg w-9/12 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
  />
  <button
    onClick={() => console.log('Total Events button clicked')}
   className="ml-4 p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-pink-700 hover:to-indigo-700 hover:shadow-lg hover:scale-102 hover:-translate-y-1 transition-all duration-300 ease-in-out transform focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50"
  >
    Total Events: {filteredData.length}
  </button>
</div>


      {/* Table */}
      <table className="w-full border border-purple-400 text-center rounded-lg overflow-hidden bg-white shadow-lg">
        <thead>
          <tr className="bg-gradient-to-r from-purple-500 to-indigo-700 text-white font-semibold">
            <th
              className="p-4 border cursor-pointer hover:bg-gradient-to-r from-purple-800 to-indigo-900"
              onClick={() => sortData("srNo")}
            >
              Sr. No.
            </th>
            <th
              className="p-4 border cursor-pointer hover:bg-gradient-to-r from-purple-800 to-indigo-900"
              onClick={() => sortData("name")}
            >
              Event Name
            </th>
            <th
              className="p-4 border cursor-pointer hover:bg-gradient-to-r from-purple-800 to-indigo-900"
              onClick={() => sortData("event")}
            >
              Category
            </th>
            <th
              className="p-4 border cursor-pointer hover:bg-gradient-to-r from-purple-800 to-indigo-900"
              onClick={() => sortData("date")}
            >
              Date
            </th>
            <th
              className="p-4 border cursor-pointer hover:bg-gradient-to-r from-purple-800 to-indigo-900"
              onClick={() => sortData("location")}
            >
              Location
            </th>
            <th
              className="p-4 border cursor-pointer hover:bg-gradient-to-r from-purple-800 to-indigo-900"
              onClick={() => sortData("status")}
            >
              Status
            </th>
            <th className="p-4 border hover:bg-gradient-to-r from-purple-800 to-indigo-900">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr
              key={item.id}
              className="border-t-2 border-purple-200 hover:border-purple-700 hover:bg-gradient-to-r from-purple-200 to-indigo-100 transition-all"
            >
              <td className="p-4 border">
                {index + 1 + (currentPage - 1) * itemsPerPage}
              </td>
              {/* Sr. No. column */}
              <td className="p-4 border">{item.name}</td>
              <td className="p-4 border">{item.event}</td>
              <td className="p-4 border">{item.date}</td>
              <td className="p-4 border">{item.location}</td>
              <td className="p-4 border">{item.status}</td>
              <td className="p-4 border flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSelectedEvent(item);
                    setModalType("accept");
                  }}
                  className="text-green-600 hover:text-green-800"
                >
                  <CheckCircle size={24} />
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">
                    Accept
                  </span>
                </button>
                <button
                  onClick={() => {
                    setSelectedEvent(item);
                    setModalType("reject");
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <XCircle size={24} />
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">
                    Reject
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-3">
        <button
          className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="flex items-center text-purple-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {selectedEvent && (
        <EventStatus
          id={selectedEvent.id}
          event={selectedEvent}
          type={modalType}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default Manage_Events;

// {/* This is Extra code direct get from ClaudeAI */}

// import React, { useState, useEffect } from 'react';
// import {
//   List,
//   Edit,
//   Trash2,
//   Eye,
//   CheckCircle2,
//   XCircle,
//   Users,
//   Calendar,
//   MapPin,
//   BarChart,
//   Home,
//   ChevronRight,
// } from 'lucide-react';

// // Mock data and API functions
// const mockEvents = [
//   {
//     id: 1,
//     name: "Luxury Wedding Expo 2025",
//     organizer: "Global Wedding Planners",
//     date: "2025-06-15",
//     location: "Grand Convention Center, New York",
//     status: "Pending",
//     attendees: 250,
//     revenue: 75000,
//     images: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
//   },
//   {
//     id: 2,
//     name: "Corporate Networking Gala",
//     organizer: "Business Connect Inc.",
//     date: "2025-07-20",
//     location: "Hilton Downtown, San Francisco",
//     status: "Approved",
//     attendees: 500,
//     revenue: 150000,
//     images: ["/api/placeholder/800/600"],
//   },
//   {
//     id: 3,
//     name: "Destination Wedding Fair",
//     organizer: "Travel & Weddings Co.",
//     date: "2025-08-10",
//     location: "Marriott Resort, Miami",
//     status: "Rejected",
//     attendees: 100,
//     revenue: 25000,
//     images: ["/api/placeholder/800/600"],
//   }
// ];

// // Mock API Functions
// const fetchEvents = async () => {
//   await new Promise(resolve => setTimeout(resolve, 500));
//   return mockEvents;
// };

// const fetchEventDetails = async (id) => {
//   await new Promise(resolve => setTimeout(resolve, 500));
//   return mockEvents.find(event => event.id === id);
// };

// const approveEvent = async (id) => {
//   await new Promise(resolve => setTimeout(resolve, 500));
//   const event = mockEvents.find(event => event.id === id);
//   if (event) {
//     event.status = "Approved";
//     return event;
//   }
// };

// const rejectEvent = async (id) => {
//   await new Promise(resolve => setTimeout(resolve, 500));
//   const event = mockEvents.find(event => event.id === id);
//   if (event) {
//     event.status = "Rejected";
//     return event;
//   }
// };

// const deleteEvent = async (id) => {
//   await new Promise(resolve => setTimeout(resolve, 500));
//   const index = mockEvents.findIndex(event => event.id === id);
//   if (index !== -1) {
//     mockEvents.splice(index, 1);
//     return true;
//   }
//   return false;
// };

// const Manage_Events = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState('view');

//   useEffect(() => {
//     const loadEvents = async () => {
//       const fetchedEvents = await fetchEvents();
//       setEvents(fetchedEvents);
//     };
//     loadEvents();
//   }, []);

//   const handleViewEvent = async (id) => {
//     const event = await fetchEventDetails(id);
//     setSelectedEvent(event);
//     setModalMode('view');
//     setIsModalOpen(true);
//   };

//   const handleApproveEvent = async (id) => {
//     try {
//       const updatedEvent = await approveEvent(id);
//       setEvents(events.map(event =>
//         event.id === id ? updatedEvent : event
//       ));
//     } catch (error) {
//       console.error("Failed to approve event:", error);
//     }
//   };

//   const handleRejectEvent = async (id) => {
//     try {
//       const updatedEvent = await rejectEvent(id);
//       setEvents(events.map(event =>
//         event.id === id ? updatedEvent : event
//       ));
//     } catch (error) {
//       console.error("Failed to reject event:", error);
//     }
//   };

//   const handleDeleteEvent = async (id) => {
//     try {
//       const isDeleted = await deleteEvent(id);
//       if (isDeleted) {
//         setEvents(events.filter(event => event.id !== id));
//       }
//     } catch (error) {
//       console.error("Failed to delete event:", error);
//     }
//   };

//   const renderStatusBadge = (status) => {
//     const statusColors = {
//       'Pending': 'bg-yellow-100 text-yellow-800',
//       'Approved': 'bg-green-100 text-green-800',
//       'Rejected': 'bg-red-100 text-red-800'
//     };

//     return (
//       <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
//         {status}
//       </span>
//     );
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//        <div className="flex items-center text-gray-600">
//           <Home className="w-5 h-5 mr-2 text-blue-500" />
//           <span className="mr-2 text-sm">Home</span>
//           <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
//           <span className="mr-2 text-sm text-gray-500">Admin</span>
//           <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
//           <span className="text-sm font-semibold text-gray-800">Manage Events</span>
//         </div>
//       <div className="container mx-auto">

//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-3 text-left">Event Name</th>
//                 <th className="px-4 py-3 text-left">Organizer</th>
//                 <th className="px-4 py-3 text-left">Date</th>
//                 <th className="px-4 py-3 text-left">Location</th>
//                 <th className="px-4 py-3 text-left">Status</th>
//                 <th className="px-4 py-3 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {events.map((event) => (
//                 <tr key={event.id} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-3">{event.name}</td>
//                   <td className="px-4 py-3">{event.organizer}</td>
//                   <td className="px-4 py-3">{event.date}</td>
//                   <td className="px-4 py-3">{event.location}</td>
//                   <td className="px-4 py-3">
//                     {renderStatusBadge(event.status)}
//                   </td>
//                   <td className="px-4 py-3 text-right">
//                     <div className="flex justify-end space-x-2">
//                       <button
//                         onClick={() => handleViewEvent(event.id)}
//                         className="text-blue-500 hover:bg-blue-50 p-2 rounded"
//                         title="View Event Details"
//                       >
//                         <Eye size={18} />
//                       </button>
//                       {event.status === 'Pending' && (
//                         <>
//                           <button
//                             onClick={() => handleApproveEvent(event.id)}
//                             className="text-green-500 hover:bg-green-50 p-2 rounded"
//                             title="Approve Event"
//                           >
//                             <CheckCircle2 size={18} />
//                           </button>
//                           <button
//                             onClick={() => handleRejectEvent(event.id)}
//                             className="text-red-500 hover:bg-red-50 p-2 rounded"
//                             title="Reject Event"
//                           >
//                             <XCircle size={18} />
//                           </button>
//                         </>
//                       )}
//                       <button
//                         onClick={() => handleDeleteEvent(event.id)}
//                         className="text-red-500 hover:bg-red-50 p-2 rounded"
//                         title="Delete Event"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Event Details Modal (placeholder for future implementation) */}
//       {isModalOpen && selectedEvent && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Event Details</h2>
//             <div className="space-y-2">
//               <p><strong>Name:</strong> {selectedEvent.name}</p>
//               <p><strong>Organizer:</strong> {selectedEvent.organizer}</p>
//               <p><strong>Date:</strong> {selectedEvent.date}</p>
//               <p><strong>Location:</strong> {selectedEvent.location}</p>
//               <p><strong>Status:</strong> {selectedEvent.status}</p>
//             </div>
//             <div className="mt-6 flex justify-end space-x-2">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Manage_Events;
