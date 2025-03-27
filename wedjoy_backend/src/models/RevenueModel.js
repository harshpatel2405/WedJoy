import mongoose from "mongoose";

const revenueSchema = new mongoose.Schema(
  {
    revenueID: {
      type: String,
      required: true,
      unique: true,
    },
    eventID: {
      type: String,
      required: true,
    },
    businessOwnerID: {
      type: String,
      required: true,
    },
    revenueAmount: {
      type: Number,
      required: true,
    },
    revenueDate: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Revenue = mongoose.model("Revenue", revenueSchema);
export default Revenue;