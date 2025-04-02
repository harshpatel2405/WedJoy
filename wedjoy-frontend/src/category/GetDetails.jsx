import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  Music,
  ArrowLeft,
  Ticket,
  Heart,
  Share2,
  ChevronRight,
  Info,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetDetails = () => {
  const baseURL = import.meta.env.VITE_API_URL
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [remainingTickets, setRemainingTickets] = useState({
    general: 100,
    vip: 20,
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`/${baseURL}/${id}`);
        
        if (response.data.success) {
          const eventData = {
            ...response.data.event,
            startTime: response.data.event.startTime || "00:00",
            endTime: response.data.event.endTime || "00:00",
          };
          setEvent(eventData);
          
          // Set hardcoded coordinates for demo
          setCoordinates({ lat: 23.0713, lng: 72.5253 });
        } else {
          setError(response.data.message || "Failed to load event");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to fetch event details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleRegister = () => {
    if (selectedTicketType) {
      // Update remaining tickets
      setRemainingTickets(prev => ({
        ...prev,
        [selectedTicketType === "General Admission" ? "general" : "vip"]: prev[selectedTicketType === "General Admission" ? "general" : "vip"] - 1
      }));
      
      toast.success(
        <div>
          <p className="font-medium">Successfully registered for {selectedTicketType}!</p>
          <p className="text-sm">Check your email for confirmation.</p>
        </div>,
        { autoClose: 3000 }
      );
      setIsRegistered(true);
    } else {
      toast.warning("Please select a ticket type before registering.");
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.info(
      <div className="flex items-center">
        {isFavorite ? (
          <>
            <Heart className="text-red-500 mr-2" fill="currentColor" />
            <span>Removed from favorites</span>
          </>
        ) : (
          <>
            <Heart className="text-red-500 mr-2" fill="currentColor" />
            <span>Added to favorites</span>
          </>
        )}
      </div>
    );
  };

  const shareEvent = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event.name,
          text: `Check out this event: ${event.name}`,
          url: window.location.href,
        })
        .catch(() => toast.info("Share was cancelled"));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.info(
        <div className="flex items-center">
          <CheckCircle className="text-green-500 mr-2" size={18} />
          <span>Link copied to clipboard!</span>
        </div>
      );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeValue) => {
    if (!timeValue) return "Time not specified";

    if (typeof timeValue === "string" && timeValue.includes(":")) {
      const [hours, minutes] = timeValue.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes)); // ✅ Fixed closing parenthesis
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    

    if (typeof timeValue === "number") {
      const hours = Math.floor(timeValue / 3600);
      const minutes = Math.floor((timeValue % 3600) / 60);
      const date = new Date();
      date.setHours(hours, minutes);
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return "Invalid time format";
  };

  const ticketTypes = [
    {
      id: "general",
      type: "General Admission",
      price: event?.ticketType === "paid" ? `$${event?.ticketPrice}` : "FREE",
      features: ["Standard Entry", "Access to Main Areas", "Basic Amenities"],
      available: remainingTickets.general > 0,
      remaining: remainingTickets.general,
    },
    {
      id: "vip",
      type: "VIP Experience",
      price:
        event?.ticketType === "paid"
          ? `$${Math.floor((event?.ticketPrice || 0) * 1.5)}`
          : "FREE",
      features: [
        "Priority Entry",
        "Exclusive Lounge Access",
        "Premium Viewing Areas",
        "Complimentary Refreshments",
      ],
      available: remainingTickets.vip > 0 && event?.capacity > 50,
      remaining: remainingTickets.vip,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading event details...</p>
          <p className="text-sm text-gray-500 mt-1">Please wait while we fetch the information</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md w-full">
          <div className="text-red-500 mb-4 flex justify-center">
            <AlertCircle size={48} className="animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Error Loading Event</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center"
            >
              <RefreshCw className="mr-2" size={18} />
              Try Again
            </button>
            <Link
              to="/events"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              <ArrowLeft className="mr-2" size={18} />
              Browse Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md w-full">
          <div className="text-gray-500 mb-4 flex justify-center">
            <Music size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Event Not Found</h2>
          <p className="text-gray-600 mb-6">
            The event you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeft className="mr-2" size={18} />
            Browse All Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Back button */}
      <div className="container mx-auto pt-6 px-4 sm:px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition group"
        >
          <ArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back to Events</span>
        </button>
      </div>

      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Event Header */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-8 transition-all hover:shadow-2xl">
          {/* Event Image */}
          <div className="relative">
            <img
              src={event.image || "https://via.placeholder.com/800x400?text=Event+Image"}
              alt={event.name}
              className="w-full h-64 md:h-96 object-cover object-center"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/800x400?text=Event+Image";
              }}
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={toggleFavorite}
                className={`p-3 rounded-full shadow-md transition-all ${
                  isFavorite
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button
                onClick={shareEvent}
                className="p-3 rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100 transition"
                aria-label="Share event"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Event Info */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center">
                    {event.category || "Event"}
                  </span>
                  {event.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium flex items-center"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
                  {event.name}
                </h1>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {event.description}
                </p>
              </div>
              {event.ticketType === "paid" && (
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 rounded-xl text-white shadow-lg">
                  <div className="text-sm font-medium mb-1">Starting from</div>
                  <div className="font-bold text-2xl">${event.ticketPrice}</div>
                  <div className="text-blue-100 text-xs mt-1">+ taxes & fees</div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                  <Calendar size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-500">Date</div>
                  <div className="font-medium">
                    {formatDate(event.startDate)}
                    {event.endDate && ` - ${formatDate(event.endDate)}`}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="p-3 bg-green-100 rounded-lg text-green-600">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-500">Time</div>
                  <div className="font-medium">
                    {event.startTime ? formatTime(event.startTime) : "TBD"} -{" "}
                    {event.endTime ? formatTime(event.endTime) : "TBD"}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="p-3 bg-red-100 rounded-lg text-red-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-500">Location</div>
                  <div className="font-medium">
                    {event.venue?.name || "Venue TBD"}
                    {event.venue?.city && `, ${event.venue.city}`}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                  <Users size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-500">Capacity</div>
                  <div className="font-medium">
                    {event.capacity ? `${event.capacity} people` : "Open entry"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Details */}
          <div className="md:col-span-2 space-y-8">
            {/* Tab Navigation */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`px-6 py-4 font-medium text-sm flex items-center ${
                    activeTab === "details"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Info className="mr-2" size={16} />
                  Event Details
                </button>
                <button
                  onClick={() => setActiveTab("location")}
                  className={`px-6 py-4 font-medium text-sm flex items-center ${
                    activeTab === "location"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <MapPin className="mr-2" size={16} />
                  Location
                </button>
                {event.guests?.length > 0 && (
                  <button
                    onClick={() => setActiveTab("lineup")}
                    className={`px-6 py-4 font-medium text-sm flex items-center ${
                      activeTab === "lineup"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Mic className="mr-2" size={16} />
                    Lineup
                  </button>
                )}
              </div>
              <div className="p-6">
                {activeTab === "details" && (
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">About This Event</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {event.longDescription || event.description}
                    </p>

                    <div className="space-y-6">
                      {event.highlights && (
                        <div>
                          <h4 className="font-bold mb-3 text-gray-800">Event Highlights</h4>
                          <ul className="space-y-2">
                            {event.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="text-green-500 w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-gray-700">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {event.requirements && (
                        <div>
                          <h4 className="font-bold mb-3 text-gray-800">Requirements</h4>
                          <ul className="space-y-2">
                            {event.requirements.map((req, index) => (
                              <li key={index} className="flex items-start">
                                <Info className="text-blue-500 w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-gray-700">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "location" && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Venue Information</h3>
                    <div className="mb-6">
                      <h4 className="font-bold text-lg mb-2">{event.venue?.name || "Venue"}</h4>
                      {event.venue?.address && (
                        <p className="text-gray-700 mb-2">{event.venue.address}</p>
                      )}
                      <p className="text-gray-700">
                        {event.venue?.city && `${event.venue.city}, `}
                        {event.venue?.country}
                      </p>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-md">
                      {coordinates ? (
                        <iframe
                          src={`https://www.gomaps.pro/maps/embed/v1/place?key=AlzaSyl6PKcc3XKao5bC1hxuQ4rv9reUTdLUwhz&q=${coordinates.lat},${coordinates.lng}&zoom=15`}
                          width="100%"
                          height="400"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          title="Event Location Map"
                        ></iframe>
                      ) : (
                        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-500">
                          Map not available
                        </div>
                      )}
                    </div>

                    <div className="mt-6">
                      <h4 className="font-bold mb-3 text-gray-800">Getting There</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium mb-2 flex items-center">
                            <MapPin className="text-red-500 mr-2" size={16} />
                            Parking Information
                          </h5>
                          <p className="text-sm text-gray-600">
                            {event.venue?.parking || "Parking available on-site and nearby."}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium mb-2 flex items-center">
                            <Users className="text-purple-500 mr-2" size={16} />
                            Public Transport
                          </h5>
                          <p className="text-sm text-gray-600">
                            {event.venue?.publicTransport ||
                              "Multiple bus and metro options available within walking distance."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "lineup" && event.guests?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-6 text-gray-800">🎤 Featured Performers</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {event.guests.map((guest, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white">
                              <Mic size={24} />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">{guest.name || guest}</h3>
                            <p className="text-gray-600 text-sm">
                              {guest.genre || "Performing at"} {formatTime(event.startTime)}
                            </p>
                            {guest.bio && (
                              <p className="text-gray-500 text-xs mt-1 line-clamp-2">{guest.bio}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            {event.socialLinks?.length > 0 && (
              <div className="bg-white shadow-lg rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Connect With Us</h3>
                <div className="flex flex-wrap gap-3">
                  {event.socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition flex items-center"
                    >
                      {link.platform === "Facebook" && (
                        <span className="text-blue-600 mr-2">FB</span>
                      )}
                      {link.platform === "Twitter" && (
                        <span className="text-blue-400 mr-2">TW</span>
                      )}
                      {link.platform === "Instagram" && (
                        <span className="text-pink-600 mr-2">IG</span>
                      )}
                      {link.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Tickets */}
          <div className="space-y-6">
            {/* Ticket Selection */}
            <div className="bg-white shadow-xl rounded-2xl p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Ticket className="mr-2 text-blue-600" /> Tickets
                </h2>
                {!isRegistered && (
                  <div className="text-sm text-gray-500">
                    {remainingTickets.general + remainingTickets.vip} remaining
                  </div>
                )}
              </div>

              {!isRegistered ? (
                <>
                  <div className="space-y-4 mb-6">
                    {ticketTypes.map((ticket) => (
                      <div
                        key={ticket.id}
                        className={`border-2 rounded-xl p-5 transition-all ${
                          selectedTicketType === ticket.type
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        } ${
                          !ticket.available
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer hover:shadow-md"
                        }`}
                        onClick={() =>
                          ticket.available && setSelectedTicketType(ticket.type)
                        }
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg text-gray-800">{ticket.type}</h3>
                            <div className="flex items-center mt-2 mb-3">
                              <span className="text-blue-600 font-bold text-2xl mr-2">
                                {ticket.price}
                              </span>
                              {ticket.price !== "FREE" && (
                                <span className="text-gray-500 text-sm">+ fees</span>
                              )}
                            </div>
                          </div>
                          {!ticket.available ? (
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                              Sold Out
                            </span>
                          ) : (
                            <span className="text-green-600 text-sm font-medium">
                              {ticket.remaining} left
                            </span>
                          )}
                        </div>
                        <ul className="space-y-2 mt-3">
                          {ticket.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="text-green-500 w-4 h-4 mt-1 mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleRegister}
                    disabled={!selectedTicketType}
                    className={`w-full py-4 px-4 rounded-xl font-bold text-lg transition flex items-center justify-center ${
                      selectedTicketType
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {selectedTicketType ? (
                      <>
                        <span>Register Now</span>
                        <ChevronRight className="ml-2" size={20} />
                      </>
                    ) : (
                      "Select Ticket Type"
                    )}
                  </button>

                  <div className="mt-4 text-center text-sm text-gray-500">
                    <p>Secure checkout powered by our payment partners</p>
                    <div className="flex justify-center space-x-4 mt-2">
                      <span>Visa</span>
                      <span>Mastercard</span>
                      <span>PayPal</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="relative">
                    <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
                    <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
                      <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        ✓
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">
                    Registration Confirmed!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You're registered for{" "}
                    <span className="font-bold text-gray-800">{event.name}</span>
                  </p>
                  <div className="bg-gray-50 p-4 rounded-xl mb-6 text-left">
                    <div className="font-semibold text-gray-500 mb-1">Ticket Type:</div>
                    <div className="text-blue-600 font-bold text-lg">
                      {selectedTicketType}
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <p className="flex items-center">
                        <CheckCircle className="text-green-500 mr-2" size={16} />
                        E-ticket will be emailed to you shortly
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/my-tickets")}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-bold shadow-lg transition"
                  >
                    View My Tickets
                  </button>
                </div>
              )}
            </div>

            {/* Organizer Info */}
            {event.organizer && (
              <div className="bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Organizer</h2>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 shadow-inner">
                    <Star size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{event.organizer.name}</h3>
                    <p className="text-gray-600 text-sm">Event Organizer</p>
                    {event.organizer.rating && (
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < Math.floor(event.organizer.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">
                          ({event.organizer.reviews} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {event.organizer.description && (
                  <p className="text-gray-600 text-sm mt-4">
                    {event.organizer.description}
                  </p>
                )}
                {event.organizer.contact && (
                  <a
                    href={`mailto:${event.organizer.contact}`}
                    className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Contact Organizer
                  </a>
                )}
              </div>
            )}

            {/* Event Policies */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Event Policies</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Info className="text-blue-500 w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800">Refund Policy</h3>
                    <p className="text-gray-600 text-sm">
                      Tickets are non-refundable except in case of event cancellation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="text-purple-500 w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800">Age Requirements</h3>
                    <p className="text-gray-600 text-sm">
                      {event.ageRestriction || "All ages welcome. Under 18 must be accompanied by an adult."}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ShieldCheck className="text-green-500 w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800">Safety Measures</h3>
                    <p className="text-gray-600 text-sm">
                      {event.safetyMeasures || "Security checks will be performed at the entrance."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      {!isRegistered && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-white text-xl font-bold mb-1">
                  Ready to experience {event.name}?
                </h3>
                <p className="text-blue-100">
                  Limited tickets available. Secure your spot now!
                </p>
              </div>
              <button
                onClick={() =>
                  document
                    .getElementById("ticket-section")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg"
              >
                Get Your Tickets
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetDetails;