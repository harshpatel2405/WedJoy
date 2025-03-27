import mongoose from "mongoose";
import { Schema } from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    eventID:{
      type:String,
      required:true
    },
    eventOrganizerID:{
        type:Schema.Types.ObjectId,
        ref:'EventOrganizer'
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
      type: String,
    },

    //Debug both in epoch
    eventStartDate: {
      type: Number,
      required: true,
    },
    eventEndDate: {
      type: Number,
      required: true,
    },
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
    },
    venueName: {
      type: String,
    },
    venuAddress: {
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
    },
    ticketPrice: {
      type: Number,
    },
    totalTickets: {
      type: Number,
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
      type: Number,
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
      type: String,
    },
    promoVideo: {
      type: String,
    },
    ageRestrictions: {
      type: Boolean,
    },
    accessibilityOptions: {
      type: Boolean,
    },
    sponsors: {
      type: Boolean,
    },
    refundPolicy: {
      type: String,
    },
    tnc: {
      type: String,
    },
    eventCreated:{
        type:Number,
        default:Date.now(),
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Event", EventSchema);



//? This is the schema for the Event model. The Event model is used to store the details of the events that are created by the event organizers. The schema contains the following fields: