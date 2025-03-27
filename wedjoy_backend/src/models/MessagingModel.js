import mongoose from "mongoose";

const messagingSchema = new mongoose.Schema(
  {
    messageID: {
      type: String,
      required: true,
      unique: true,
    },
    senderID: {
      type: String,
      required: true,
    },
    receiverID: {
      type: String,
      required: true,
    },
    messageText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Messaging = mongoose.model("Messaging", messagingSchema);
export default Messaging;