import React, { useState } from 'react';

const EventOrganizer_Manage_Events = () => {
  const [events, setEvents] = useState([
    { 
      id: 1, 
      title: 'Tech Conference 2025', 
      date: '2025-04-15', 
      location: 'Convention Center',
      address: '123 Main St, Tech City',
      capacity: 200,
      category: 'Technology',
      price: 99.99,
      description: 'Annual technology conference featuring the latest innovations',
      image: '/api/placeholder/400/250',
      rsvpCount: 42,
      status: 'Upcoming'
    },
    { 
      id: 2, 
      title: 'Networking Mixer', 
      date: '2025-03-20', 
      location: 'Downtown Hotel',
      address: '456 Central Ave, Business District',
      capacity: 75,
      category: 'Networking',
      price: 0,
      description: 'Professional networking event with industry leaders',
      image: '/api/placeholder/400/250',
      rsvpCount: 27,
      status: 'Upcoming'
    },
    { 
      id: 3, 
      title: 'Art Exhibition', 
      date: '2025-05-10', 
      location: 'City Gallery',
      address: '789 Art Street, Creative Quarter',
      capacity: 150,
      category: 'Arts',
      price: 15.50,
      description: 'Featuring works from local and international artists',
      image: '/api/placeholder/400/250',
      rsvpCount: 63,
      status: 'Upcoming'
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [detailEvent, setDetailEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    address: '',
    capacity: '',
    category: '',
    price: '',
    description: '',
    status: 'Upcoming'
  });
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const categories = ['Technology', 'Networking', 'Arts', 'Business', 'Education', 'Entertainment', 'Other'];
  const statuses = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const openModal = (event = null) => {
    if (event) {
      setFormData({ ...event });
      setCurrentEvent(event);
    } else {
      setFormData({
        title: '',
        date: '',
        location: '',
        address: '',
        capacity: '',
        category: '',
        price: '',
        description: '',
        status: 'Upcoming'
      });
      setCurrentEvent(null);
    }
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const openDetailModal = (event) => {
    setDetailEvent(event);
    setIsDetailModalOpen(true);
  };
  
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };
  
  const handleSubmit = () => {
    const processedData = {
      ...formData,
      capacity: parseInt(formData.capacity) || 0,
      price: parseFloat(formData.price) || 0
    };
    
    if (currentEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === currentEvent.id ? { 
          ...processedData, 
          id: event.id, 
          rsvpCount: event.rsvpCount,
          image: event.image || '/api/placeholder/400/250'
        } : event
      ));
    } else {
      // Add new event
      const newEvent = {
        ...processedData,
        id: events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1,
        rsvpCount: 0,
        image: '/api/placeholder/400/250'
      };
      setEvents([...events, newEvent]);
    }
    closeModal();
  };
  
  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };
  
  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || event.category === categoryFilter;
    const matchesStatus = statusFilter === '' || event.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Events</h1>
        <button 
          onClick={() => openModal()} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Create New Event
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button 
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
                setStatusFilter('');
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md w-full"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Event cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    event.status === 'Upcoming' ? 'bg-green-100 text-green-800' : 
                    event.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' : 
                    event.status === 'Completed' ? 'bg-gray-100 text-gray-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <div><span className="font-medium">Date:</span> {new Date(event.date).toLocaleDateString()}</div>
                  <div><span className="font-medium">Location:</span> {event.location}</div>
                  <div><span className="font-medium">RSVPs:</span> {event.rsvpCount} / {event.capacity}</div>
                </div>
                <div className="mt-3 flex justify-between">
                  <button 
                    onClick={() => openDetailModal(event)} 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                  <div>
                    <button 
                      onClick={() => openModal(event)} 
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-medium mr-3"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(event.id)} 
                      className="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 bg-white rounded-lg shadow">
            <p className="text-gray-500">No events found. Create your first event or adjust your filters.</p>
          </div>
        )}
      </div>
      
      {/* Modal for Add/Edit Event */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {currentEvent ? 'Edit Event' : 'Create New Event'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location Name</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeModal}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  {currentEvent ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal for Event Details */}
      {isDetailModalOpen && detailEvent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="relative">
              <img 
                src={detailEvent.image} 
                alt={detailEvent.title} 
                className="w-full h-64 object-cover"
              />
              <button 
                onClick={closeDetailModal}
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-100"
              >
                ✕
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-70 text-white p-4">
                <h2 className="text-2xl font-bold">{detailEvent.title}</h2>
                <span className={`text-xs px-2 py-1 rounded-full inline-block mt-2 ${
                  detailEvent.status === 'Upcoming' ? 'bg-green-100 text-green-800' : 
                  detailEvent.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' : 
                  detailEvent.status === 'Completed' ? 'bg-gray-100 text-gray-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {detailEvent.status}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Event Details</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Date:</span> {new Date(detailEvent.date).toLocaleDateString()}</p>
                    <p><span className="font-medium">Location:</span> {detailEvent.location}</p>
                    <p><span className="font-medium">Address:</span> {detailEvent.address}</p>
                    <p><span className="font-medium">Category:</span> {detailEvent.category}</p>
                    <p><span className="font-medium">Price:</span> ${detailEvent.price.toFixed(2)}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Attendance</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">RSVPs:</span> {detailEvent.rsvpCount}</p>
                    <p><span className="font-medium">Capacity:</span> {detailEvent.capacity}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${Math.min(100, (detailEvent.rsvpCount / detailEvent.capacity) * 100)}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {Math.round((detailEvent.rsvpCount / detailEvent.capacity) * 100)}% of capacity filled
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{detailEvent.description}</p>
              </div>
              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    closeDetailModal();
                    openModal(detailEvent);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                >
                  Edit Event
                </button>
                <button
                  onClick={() => {
                    closeDetailModal();
                    handleDelete(detailEvent.id);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                  Delete Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventOrganizer_Manage_Events;