import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    adminID: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 10, 
      maxlength: 15, 
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    total_events_accepted: {
      type: Number,
      default: 0,
      min: 0, 
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
