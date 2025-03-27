import Message from "../models/MessagingModel.js";

const createMessage = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    console.log("Message created successfully : ", newMessage);

    return res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in creating message : ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getMessage = async (req, res) => {
  try {
    const getMesaage = await Message.find();

    if (!getMesaage) {
      console.log("Message not found");
      console.log("Messages Found : ", getMesaage);
      return res.status(404).json({ message: "Message not found" });
    } else {
      const TotalMessages = getMesaage.length;
      console.log("Total Messages : ", TotalMessages);
      return res
        .status(200)
        .json({ "Messages ": getMesaage, "Total Messages": TotalMessages });
    }
  } catch (err) {
    console.log("Error in getting message : ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getMessageByID = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      console.log("Message not found");
      return res.status(404).json({ message: "Message not found" });
    }

    console.log("Message found : ", message);
    return res.status(200).json(message);
  } catch (err) {
    console.log("Error in getting message : ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log("Message updated successfully : ", message);
    return res.status(200).json(message);
  } catch (err) {
    console.log("Error in updating message : ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      console.log("Message not found");
      return res.status(404).json({ message: "Message not found" });
    } else {
      console.log("Message deleted successfully : ", message);
      return res.status(200).json({ message: "Message deleted successfully" });
    }
  } catch (err) {
    console.log("Error in deleting message : ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  createMessage,
  getMessage,
  getMessageByID,
  updateMessage,
  deleteMessage,
};
