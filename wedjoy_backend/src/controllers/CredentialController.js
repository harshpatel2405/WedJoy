//Name : /controller/CredentialController.js
import Credential from "../models/CredentialsModel.js";

export const updateLoginHistory = async (req, res) => {
  try {
    // console.log("Received roleID:", req.body.roleID);

    if (!req.body.roleID) {
      console.error("Role ID is required\nIt is not provided in the request body");
      return res.status(400).json({ error: "Role ID is required" });
    }

    const credential = await Credential.findOne({ roleID: req.body.roleID });

    if (!credential) {
      return res.status(404).json({ error: "User not found" });
    }

    const timestamp = new Date();
    credential.lastLogin = timestamp;
    credential.loginHistory.push(timestamp);

    if (credential.loginHistory.length > 5) {
      credential.loginHistory = credential.loginHistory.slice(-5);
    }

    await credential.save();

    return res.status(200).json({
      message: "Login history updated successfully",
      lastLogin: credential.lastLogin,
      loginHistory: credential.loginHistory,
    });
  } catch (error) {
    console.error("Error updating login history:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
