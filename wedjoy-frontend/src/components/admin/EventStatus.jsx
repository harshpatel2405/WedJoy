import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

const EventStatus = ({ event, type, onClose,id }) => {
  const baseURL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [id1,setId]=useState(id)

  console.log("Event ID:", id1); // Log the event ID to the console

  const handleAction = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${baseURL}/${type}/${id1}`, {
        eventId: event.id,
        action: type, // Accept or Reject action
      });

      if (response?.status === 200) {
        type === 'accept' 
        ? toast.success('Accepted successfully!') 
        : toast.error('Rejected successfully!');
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error) {
      console.error("Error performing action", error);
      toast.error('Error performing action');
    } finally {
      setLoading(false);
      onClose(); // Close modal after action
    }
  };

  if (!event) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-96 max-w-lg relative overflow-hidden"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
        
        <h2 className={`text-2xl font-semibold mb-4 text-center ${type === "accept" ? "text-purple-600" : "text-red-600"}`}>
          {type === "accept" ? "Accept" : "Reject"} Event
        </h2>
        
        {/* Event Image */}
        <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 overflow-hidden">
          <img src={event.image} alt={event.name} className="object-cover w-full h-full rounded-lg" />
        </div>

        <div className="space-y-3 text-gray-800">
          <p><strong>Name:</strong> {event.name}</p>
          <p><strong>Target Audience:</strong> {event.targetAudience || "N/A"}</p>
          <p><strong>Event Type:</strong> {event.event}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Status:</strong> {event.status}</p>
          <p><strong>Price:</strong> ${event.price}</p>

          {/* Additional Details */}
          <div className="text-sm text-gray-600 mt-2">
            <p>This event is currently {event.status === "Active" ? "available" : "inactive"}.</p>
            <p>Do you want to proceed with this action?</p>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-6">
          <button onClick={onClose} className="px-6 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-all duration-200">
            Close
          </button>
          <button
            onClick={handleAction}
            disabled={loading}
            className={`px-6 py-2 text-white rounded-lg transition-all duration-200 ${type === "accept" ? "bg-purple-500 hover:bg-purple-600" : "bg-red-500 hover:bg-red-600"} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Processing..." : type === "accept" ? "Accept" : "Reject"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EventStatus;
