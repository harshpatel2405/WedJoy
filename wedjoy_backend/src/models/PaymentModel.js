import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    paymentID: {
      type: String,
      required: true,
      unique: true,
    },
    eventID: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    businessOwnerID: {
      type: Schema.Types.ObjectId,
      ref: "BusinessOwner",
      required: true,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["creditcard", "debitcard", "netbanking", "upi", "wallet"],
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
