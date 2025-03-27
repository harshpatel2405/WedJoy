import Payment from "../models/PaymentModel";

const createPayment = async (req, res) => {
  try {
    const newPayment = await Payment.create(req.body);

    console.log("Payment created successfully : ", newPayment);
    return res.status(201).json(newPayment);
  } catch (err) {
    console.log("Error in creating payment : ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);

    if (!payment) {
      console.log("Payment not found");
      return res.status(404).json({ message: "Payment not found" });
    }

    console.log("Payment deleted successfully : ", payment);
    return res.status(200).json({ message: "Payment deleted successfully" });
  } catch (err) {
    console.log("Error in deleting payment : ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      console.log("Payment not found");
      return res.status(404).json({ message: "Payment not found" });
    }

    console.log("Payment found : ", payment);
    return res.status(200).json(payment);
  } catch (err) {
    console.log("Error in getting payment : ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getALLPayment = async (req, res) => {
  try {
    const payment = await Payment.find();

    if (!payment) {
      console.log("Payment not found");
      return res.status(404).json({ message: "Payment not found" });
    }

    console.log("Payment found : ", payment);
    return res.status(200).json(payment);
  } catch (err) {
    console.log("Error in getting payment : ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updatePayment = async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    console.log("Payment updated successfully : ", updatedPayment);
    return res.status(200).json(updatedPayment);
  } catch (err) {
    console.log("Error in updating payment : ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  createPayment,
  deletePayment,
  getPayment,
  getALLPayment,
  updatePayment,
};
