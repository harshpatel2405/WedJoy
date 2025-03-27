import mongoose from "mongoose";

const businessOwnerSchema = new mongoose.Schema(
  {
    ownerID: {
      type: String,
      required: true,
      unique: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    googleMapLink: {
      type: String,
    },
    businessCategory: {
      type: String,
      
    },
    businessWebsite: {
      type: String,
      default: "",
    },
    businessContact: {
      businessEmail: {
        type: String,
      
      },
      businessPhone: {
        type: String,
        
      },
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
     type:String,
     required:true,
    },
    totalDealsOffered: {
      type: Number,
      default: 0,
      min: 0,
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const BusinessOwner = mongoose.model("BusinessOwner", businessOwnerSchema);

export default BusinessOwner;
