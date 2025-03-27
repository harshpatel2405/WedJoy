import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    reviewID: {
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
    userID: {
      type: String,
      required: true,
    },
    reviewRating: {
      type: Number,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;