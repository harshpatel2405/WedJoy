import React, { useState, useEffect } from 'react';
import { 
  List, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  XCircle,
  Users,
  Calendar,
  MapPin,
  BarChart,
  Home,
  ChevronRight,
} from 'lucide-react';

// Mock data and API functions
const mockEvents = [
  {
    id: 1,
    name: "Luxury Wedding Expo 2025",
    organizer: "Global Wedding Planners",
    date: "2025-06-15",
    location: "Grand Convention Center, New York",
    status: "Pending",
    attendees: 250,
    revenue: 75000,
    images: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
  },
  {
    id: 2,
    name: "Corporate Networking Gala",
    organizer: "Business Connect Inc.",
    date: "2025-07-20",
    location: "Hilton Downtown, San Francisco",
    status: "Approved",
    attendees: 500,
    revenue: 150000,
    images: ["/api/placeholder/800/600"],
  },
  {
    id: 3,
    name: "Destination Wedding Fair",
    organizer: "Travel & Weddings Co.",
    date: "2025-08-10",
    location: "Marriott Resort, Miami",
    status: "Rejected",
    attendees: 100,
    revenue: 25000,
    images: ["/api/placeholder/800/600"],
  }
];

// Mock API Functions
const fetchEvents = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockEvents;
};

const fetchEventDetails = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockEvents.find(event => event.id === id);
};

const approveEvent = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const event = mockEvents.find(event => event.id === id);
  if (event) {
    event.status = "Approved";
    return event;
  }
};

const rejectEvent = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const event = mockEvents.find(event => event.id === id);
  if (event) {
    event.status = "Rejected";
    return event;
  }
};

const deleteEvent = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockEvents.findIndex(event => event.id === id);
  if (index !== -1) {
    mockEvents.splice(index, 1);
    return true;
  }
  return false;
};

const Manage_Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    };
    loadEvents();
  }, []);

  const handleViewEvent = async (id) => {
    const event = await fetchEventDetails(id);
    setSelectedEvent(event);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleApproveEvent = async (id) => {
    try {
      const updatedEvent = await approveEvent(id);
      setEvents(events.map(event => 
        event.id === id ? updatedEvent : event
      ));
    } catch (error) {
      console.error("Failed to approve event:", error);
    }
  };

  const handleRejectEvent = async (id) => {
    try {
      const updatedEvent = await rejectEvent(id);
      setEvents(events.map(event => 
        event.id === id ? updatedEvent : event
      ));
    } catch (error) {
      console.error("Failed to reject event:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const isDeleted = await deleteEvent(id);
      if (isDeleted) {
        setEvents(events.filter(event => event.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const renderStatusBadge = (status) => {
    const statusColors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
       <div className="flex items-center text-gray-600">
          <Home className="w-5 h-5 mr-2 text-blue-500" />
          <span className="mr-2 text-sm">Home</span>
          <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
          <span className="mr-2 text-sm text-gray-500">Admin</span>
          <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-sm font-semibold text-gray-800">Manage Events</span>
        </div>
      <div className="container mx-auto">
        

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Event Name</th>
                <th className="px-4 py-3 text-left">Organizer</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{event.name}</td>
                  <td className="px-4 py-3">{event.organizer}</td>
                  <td className="px-4 py-3">{event.date}</td>
                  <td className="px-4 py-3">{event.location}</td>
                  <td className="px-4 py-3">
                    {renderStatusBadge(event.status)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleViewEvent(event.id)}
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded"
                        title="View Event Details"
                      >
                        <Eye size={18} />
                      </button>
                      {event.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => handleApproveEvent(event.id)}
                            className="text-green-500 hover:bg-green-50 p-2 rounded"
                            title="Approve Event"
                          >
                            <CheckCircle2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleRejectEvent(event.id)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded"
                            title="Reject Event"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                        title="Delete Event"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Details Modal (placeholder for future implementation) */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Event Details</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {selectedEvent.name}</p>
              <p><strong>Organizer:</strong> {selectedEvent.organizer}</p>
              <p><strong>Date:</strong> {selectedEvent.date}</p>
              <p><strong>Location:</strong> {selectedEvent.location}</p>
              <p><strong>Status:</strong> {selectedEvent.status}</p>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage_Events;