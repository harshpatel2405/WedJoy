//Name : /models/CredentialsModel.js

import mongoose from "mongoose";
import { Schema } from "mongoose";

const CredentialSchema = new mongoose.Schema(
  {
    roleID:{
      type:String,
      required:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Number,
      default: null,
    },
    loginHistory: {
      type: [Number],
      default: [],
    },
    role: {
      type: String,
      enum: ["User", "Admin", "EventOrganizer", "BusinessOwner"],
      required: true,
    },
   
    createdAt: {
      type: Number,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

// Add a compound index on email and accountVerified
CredentialSchema.index({ email: 1, accountVerified: 1 });

export default mongoose.model("Credential", CredentialSchema);
