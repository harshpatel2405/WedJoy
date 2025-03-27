import mongoose from "mongoose";

const eventOrganizerSchema = new mongoose.Schema(
  {
    organizerID: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 10, // Ensures valid phone number length
      maxlength: 15,
    },
    location:{
      type:String,
      required:true
    },
    organizationName: {
      type: String,
      trim: true,
      default: "",
    },
    organizationWebsite: {
      type: String,
      trim: true,
      default: "",
      // match: [/^https?:\/\/.+/, "Please enter a valid URL"], // Ensures valid URL format
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
   
    eventsOrganized: {
      type: Number,
      default: 0,
      min: 0, // Prevents negative values
    },
    profilePicture: {
      type: String,
      default: "",
    },
    tnc:{
      type:Boolean,
      required:true,
      default:false
    }
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

const EventOrganizer = mongoose.model("EventOrganizer", eventOrganizerSchema);

export default EventOrganizer;


//? Here  , we have created a schema for the EventOrganizer model. The schema contains eventOrganizer Details......