import mongoose from "mongoose";
import { Schema } from "mongoose";

// Format date in IST (dd/mm/yyyy)
const formatDateIST = (epoch) => {
  if (!epoch) return "N/A"; // Handle null or undefined values

  // Convert epoch (seconds) to milliseconds
  const date = new Date(epoch * 1000);

  // Convert to IST (Kolkata Time)
  const options = { timeZone: "Asia/Kolkata", day: "2-digit", month: "2-digit", year: "numeric" };
  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

// Event Schema
const EventSchema = new mongoose.Schema(
  {
    eventID: {
      type: String,
      required: true,
      unique: true,
    },
    eventOrganizerID: {
      type: Schema.Types.ObjectId,
      ref: "EventOrganizer",
      // required: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    eventDescription: {
      type: String,
      required: true,
    },
    eventCategory: {
      type: String,
      required: true,
    },
    eventTags: {
      type: [String], // Changed to an array of strings
    },
status:{
  type: String,
  enum: ["Pending", "Approved", "Rejected"],
  default: "Pending", 
},
    // Store in epoch (seconds), display as dd/mm/yyyy
    eventStartDate: {
      type: Number,
      required: true,
      get: formatDateIST,
    },
    eventEndDate: {
      type: Number,
      required: true,
      get: formatDateIST,
    },

    // Store time separately in epoch (seconds)
    eventStartTime: {
      type: Number,
      required: true,
    },
    eventEndTime: {
      type: Number,
      required: true,
    },

    eventType: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      required: true,
    },
    venueName: {
      type: String,
    },
    venueAddress: {
      type: String,
    },
    venueGoogleMapLink: {
      type: String,
    },
    virtualEventLink: {
      type: String,
    },

    ticketType: {
      type: String,
      enum: ["free", "paid"],
      required: true,
    },
    ticketPrice: {
      type: Number,
      default: 0, // Default to free
    },
    totalTickets: {
      type: Number,
      required: true,
    },

    organizerName: {
      type: String,
      required: true,
    },
    organizerContactEmail: {
      type: String,
      required: true,
    },
    organizerContactPhone: {
      type: String, // Changed from Number to String
      required: true,
    },

    websiteLink: {
      type: String,
    },
    eventBannerImage: {
      type: String,
      required: true,
    },
    gallery: {
      type: [String], // Changed to an array for multiple images
    },
    promoVideo: {
      type: String,
    },

    ageRestrictions: {
      type: Boolean,
      default: false,
    },
    accessibilityOptions: {
      type: Boolean,
      default: false,
    },
    sponsors: {
      type: Boolean,
      default: false,
    },
    refundPolicy: {
      type: String,
    },
    tnc: {
      type: String,
    },

    eventCreated: {
      type: Number,
      default: Math.floor(Date.now() / 1000), // Epoch in seconds
    },
    isVerified:{
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true }, // Enable getters when converting to JSON
  }
);

export default mongoose.model("Event", EventSchema);
