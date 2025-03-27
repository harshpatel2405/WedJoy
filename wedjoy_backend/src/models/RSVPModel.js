import mongoose, { Schema } from "mongoose";

const RSVPSchema = new mongoose.Schema(
  {
    eventID: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true, 
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    rsvpStatus: {
      type: String,
      enum: ["going", "interested", "notgoing"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

RSVPSchema.index({ eventID: 1, userID: 1 }, { unique: true });

const RSVP = mongoose.model("RSVP", RSVPSchema);
export default RSVP;
