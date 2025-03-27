import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Star, 
  Mic, 
  CheckCircle, 
  ShieldCheck, 
  Headphones, 
  Music 
} from "lucide-react";
import axios from "axios";

const GetDetails = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:1999/${id}`);
        setEventData(response.data.event);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleRegister = () => {
    if (selectedTicketType) {
      setIsRegistered(true);
    } else {
      alert("Please select a ticket type before registering.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg font-medium">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 mb-4">
            <ShieldCheck size={48} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Event</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/events"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Browse All Events
          </Link>
        </div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-gray-500 mb-4">
            <Headphones size={48} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-4">The requested event could not be found.</p>
          <Link
            to="/events"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Browse All Events
          </Link>
        </div>
      </div>
    );
  }

  // Format date from epoch
  const formatDate = (epoch) => {
    const date = new Date(epoch * 1000);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Format time from seconds
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${mins.toString().padStart(2, '0')} ${ampm}`;
  };

  // Generate ticket types based on event data
  const ticketTypes = [
    {
      type: "General Admission",
      price: eventData.ticketType === "paid" ? `$${eventData.ticketPrice}` : "FREE",
      features: [
        "Standard Entry",
        "Access to Main Areas",
        "Basic Amenities"
      ]
    },
    {
      type: "VIP Experience",
      price: eventData.ticketType === "paid" ? `$${Math.floor(eventData.ticketPrice * 1.5)}` : "FREE",
      features: [
        "Priority Entry",
        "Exclusive Lounge Access",
        "Premium Viewing Areas",
        "Complimentary Refreshments"
      ]
    }
  ];

  // Generate artists/performers list if available
  const artists = eventData.guests?.length > 0
    ? eventData.guests.map((guest, index) => ({
        name: guest,
        genre: "Performance",
        stage: "Main Stage",
        time: formatTime(eventData.eventStartTime)
      }))
    : [
        {
          name: "Featured Performers",
          genre: "Various",
          stage: "Multiple Stages",
          time: formatTime(eventData.eventStartTime)
        }
      ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <div className="container mx-auto">
        {/* Event Header */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden mb-8">
          <div className="md:flex">
            {/* Event Image */}
            <div className="md:w-1/2">
              <img
                src={eventData.eventBannerImage || "https://picsum.photos/800/600?random=10"}
                alt={eventData.eventName}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Event Info */}
            <div className="md:w-1/2 p-6">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{eventData.eventName}</h1>
              <p className="text-gray-600 text-lg mb-4">{eventData.eventDescription}</p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-blue-600" />
                  <span className="font-semibold">
                    {formatDate(eventData.eventStartDate)} - {formatDate(eventData.eventEndDate)}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="text-green-600" />
                  <span className="font-semibold">
                    {formatTime(eventData.eventStartTime)} - {formatTime(eventData.eventEndTime)}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-red-600" />
                  <span className="font-semibold">
                    {eventData.venueName || "Venue TBD"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="text-purple-600" />
                  <span className="font-semibold">
                    {eventData.ticketType === "paid" ? `$${eventData.ticketPrice}` : "FREE ENTRY"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {ticketTypes.map((ticket, index) => (
            <div 
              key={index} 
              className={`bg-white shadow-lg rounded-xl p-6 transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                selectedTicketType === ticket.type 
                  ? 'border-4 border-blue-500' 
                  : 'border border-gray-200'
              }`}
              onClick={() => setSelectedTicketType(ticket.type)}
            >
              <h3 className="text-2xl font-bold mb-4">{ticket.type}</h3>
              <div className="text-3xl font-extrabold text-blue-600 mb-4">{ticket.price}</div>
              <ul className="space-y-2">
                {ticket.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Artist Lineup */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">🎵 Featured {eventData.guests?.length > 0 ? "Guests" : "Highlights"}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {artists.map((artist, index) => (
              <div key={index} className="bg-gray-100 rounded-xl p-6 text-center">
                <Mic className="mx-auto text-purple-600 mb-4" size={48} />
                <h3 className="text-2xl font-bold mb-2">{artist.name}</h3>
                <p className="text-gray-600 mb-2">{artist.genre}</p>
                <div className="flex justify-center items-center space-x-2">
                  <Music className="text-blue-500" size={20} />
                  <span>{artist.stage} at {artist.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Section */}
        <div className="bg-white shadow-2xl rounded-2xl p-8">
          {!isRegistered ? (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">🎟 Register for the Event</h2>
              {selectedTicketType && (
                <div className="text-center mb-4 text-xl">
                  Selected Ticket: <span className="font-bold text-blue-600">{selectedTicketType}</span>
                </div>
              )}
              <button
                onClick={handleRegister}
                disabled={!selectedTicketType}
                className={`w-full py-4 text-white font-bold text-xl rounded-lg transition-all duration-300 ${
                  selectedTicketType 
                    ? 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Confirm Registration
              </button>
            </div>
          ) : (
            <div className="text-center">
              <CheckCircle className="mx-auto text-green-600 mb-4" size={72} />
              <h2 className="text-3xl font-bold mb-4">Registration Confirmed!</h2>
              <p className="text-xl text-gray-600">
                Get ready for an incredible experience at {eventData.eventName}
              </p>
              <div className="mt-6 bg-blue-50 p-4 rounded-lg inline-block">
                <p className="font-semibold">Your Ticket Type: <span className="text-blue-600">{selectedTicketType}</span></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetDetails;