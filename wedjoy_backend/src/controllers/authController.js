import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import Credential from "../models/CredentialsModel.js";
import bcrypt from "bcrypt";
import axios from "axios";
import { generateToken, generateRefreshToken } from "../config/JWT.js";
import Admin from "../models/AdminModel.js";
import EventOrganizer from "../models/EventOrganizerModel.js";
import BusinessOwner from "../models/BusinessOwnerModel.js";
import crypto from "crypto";
import { SendEmail } from "../../email/SendEmail.js";
import {
  passwordResetEmail,
  accountVerificationEmail,
} from "../../email/Templates.js";
import Event from "../models/Event.js";
import multer from "multer";
import path from "path";
import { uploadFileToCloudinary } from "../utils/cloudinaryUpload.js";

const secret = "TrialSecretKey";
let otpStore = {}; // Temporary OTP storage

export const addEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    console.log(event);

    res.status(201).json({
      message: "Event added succssfully..",
      data: event,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error Adding Event",
      data: err,
    });
  }
};

export const getAllEvent = async (req, res) => {
  try {
    const getEvents = await Event.find();

    res.status(200).json({
      message: "Events Fetched Successfully",
      data: getEvents,
    });
  } catch (err) {
    res.status(500).json({
      message: "Network Error",
      data: err,
    });
  }
};

export const getSingleEvent = async (req, res) => {
  const { eventID } = req.body;
  console.log(eventID);
  try {
    const singleEvent = await Event.findOne({ eventID }).populate(
      "eventOrganizerID"
    );

    console.log("singleEvent : ", singleEvent);
    res.status(200).json({
      message: "User Fetched Successfully",
      data: singleEvent,
    });
  } catch (err) {
    res.status(500).json({
      message: "Interna Server Error",
      data: err,
    });
  }
};

// Multer Storage (Now Uses Memory Storage for Direct Upload)
// Use memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Multer upload middleware
const upload = multer({
  storage,
  fileFilter,
}).single("profilePicture");

export const UserSignup = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { fullName, email, password, phone, dob, gender, city, interests } =
        req.body;

      // Validate required fields
      if (
        !fullName ||
        !email ||
        !password ||
        !phone ||
        !dob ||
        !gender ||
        !city
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Validate dob format (dd/mm/yyyy)
      const dobRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dobRegex.test(dob)) {
        return res
          .status(400)
          .json({ message: "Invalid date format. Use dd/mm/yyyy" });
      }

      // Convert "dd/mm/yyyy" to epoch format
      const [day, month, year] = dob.split("/");
      const date = new Date(`${year}-${month}-${day}`);
      if (isNaN(date.getTime())) {
        return res.status(400).json({ message: "Invalid date" });
      }
      const dobEpoch = date.getTime();

      const userID = Math.random().toString(36).substring(2, 15);
      const hashedPassword = await bcrypt.hash(password, 10);

      // ✅ Upload profile picture to Cloudinary if file is provided
      let profilePicture = null;
      if (req.file) {
        try {
          const cloudinaryResponse = await uploadFileToCloudinary(req.file);
          profilePicture = cloudinaryResponse.secure_url;
          console.log("✅ Cloudinary Upload Success:", profilePicture);
        } catch (error) {
          console.error("❌ Cloudinary Upload Failed:", error);
          return res
            .status(500)
            .json({ message: "Image upload failed", error: error.message });
        }
      }

      const user = await User.create({
        userID,
        fullName,
        email,
        phone,
        dob: dobEpoch,
        gender,
        city,
        interests,
        profilePicture,
        isVerified: false,
      });

      // Store user credentials
      const credential = await Credential.create({
        role: "User",
        roleID: userID,
        email,
        password: hashedPassword,
      });

      // Generate Email Verification Token
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      const verificationLink = `${process.env.BASE_URL}/verify-email?token=${token}`;

      // Send verification email
      await sendVerificationEmail(email, verificationLink);

      res.status(201).json({
        message: "User created successfully. Please verify your email.",
        user: user,
        cred: credential,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ message: "Error creating user", error: error.message });
    }
  });
};

export const AdminSignup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const adminID = Math.random().toString(36).substring(2, 15);

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      adminID,
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const credential = await Credential.create({
      role: "Admin",
      roleID: adminID,
      email,
      password: hashedPassword,
    });

    // Generate email verification token (expires in 24 hours)
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Create verification link
    const verificationLink = `http://localhost:5173/verify-email?token=${token}`;

    // Send verification email
    await sendVerificationEmail(email, verificationLink);

    res.status(201).json({ admin, credential });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating admin", error: error.message });
  }
};

export const EventOrganizerSignup = async (req, res) => {
  try {
    const { name, email, password, phone, location } = req.body;

    const eventOrganizerID = Math.random().toString(36).substring(2, 15);

    const hashedPassword = await bcrypt.hash(password, 10);

    const eventOrganizer = await EventOrganizer.create({
      organizerID: eventOrganizerID,
      name,
      email,
      phone,
      location,
    });

    const credential = await Credential.create({
      role: "EventOrganizer",
      roleID: eventOrganizerID,
      email,
      password: hashedPassword,
    });

    // Generate email verification token (expires in 24 hours)
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // ? Create verification link
    const verificationLink = `http://localhost:5173/verify-email?token=${token}`;

    // Send verification email
    await sendVerificationEmail(email, verificationLink);

    res.status(201).json({ eventOrganizer, credential });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating event organizer",
      error: error.message,
    });
  }
};

export const BusinessOwnerSignup = async (req, res) => {
  try {
    const { name, email, password, phone, businessName, address, ownerName } =
      req.body;

    const businessOwnerID = Math.random().toString(36).substring(2, 15);

    const hashedPassword = await bcrypt.hash(password, 10);

    const businessOwner = await BusinessOwner.create({
      ownerID: businessOwnerID,
      name,
      email,
      phone,
      businessName,
      address,
      ownerName,
    });

    const credential = await Credential.create({
      role: "BusinessOwner",
      roleID: businessOwner._id,
      email,
      password: hashedPassword,
    });

    // Generate email verification token (expires in 24 hours)
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Create verification link
    const verificationLink = `http://localhost:5173/verify-email?token=${token}`;

    // Send verification email
    await sendVerificationEmail(email, verificationLink);

    res.status(201).json({ businessOwner, credential });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating business owner", error: error.message });
  }
};

// Function to send verification email
const sendVerificationEmail = async (recipientEmail, verificationLink) => {
  try {
    await SendEmail(
      recipientEmail,
      "🔐 Verify Your Email - WedJoy",
      accountVerificationEmail(verificationLink)
    );
    console.log("✅ Verification email sent successfully!");
  } catch (err) {
    console.error("❌ Failed to send verification email:", err.message);
  }
};

export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("UserLogin attempt:", { email });

    const credential = await Credential.findOne({ email });

    if (!credential) {
      console.log("No credential or user found for email:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!credential.accountVerified) {
      console.log("Unverified account login attempt:", email);
      return res
        .status(403)
        .json({ message: "Please verify your email first" });
    }

    const isPasswordValid = await bcrypt.compare(password, credential.password);

    if (!isPasswordValid) {
      console.log("Invalid password attempt for email:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    await Credential.updateOne({ email }, { lastLogin: Date.now() });

    console.log("User logged in successfully:", email);

    if (!credential.roleID) {
      console.error("No roleID found for the user:", email);
      return res.status(400).json({ message: "User ID is required" });
    }

    await axios.post(
      "http://localhost:1999/api/credential/update-login-history",
      { roleID: credential.roleID }
    );

    console.log("Role :", credential.role);
    const token = generateToken(credential.roleID);
    const refreshToken = generateRefreshToken(credential.roleID);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1 * 60 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("Cookies set:", res.getHeaders()["set-cookie"]); // Debugging
    res.status(200).json({
      message:
        "User logged in successfully. Token and Refresh Token are set in the cookies",
      Email: email,
      role: credential.role,
    });
  } catch (error) {
    console.error("Error during UserLogin:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

//Routes  handler for password reset
export const ResetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    console.log("🔄 ResetPassword initiated for email:", email);

    // ✅ Check if the user exists
    const user = await Credential.findOne({ email });
    if (!user) {
      console.log(`❌ User not found: ${email}`);
      return res.status(404).json({ message: "❌ User not found." });
    }

    // ✅ Step 1: Send OTP
    if (!otp && !newPassword) {
      const response = await sendOtp(email);
      return res.status(response.status).json({ message: response.message });
    }

    // ✅ Step 2: Verify OTP
    if (otp && !newPassword) {
      const verifyResponse = verifyOtp(email, otp);
      return res
        .status(verifyResponse.status)
        .json({ message: verifyResponse.message });
    }

    // ✅ Step 3: Update Password (Only if OTP was verified)
    if (!otp && newPassword) {
      const updateResponse = await updatePassword(email, newPassword);
      return res
        .status(updateResponse.status)
        .json({ message: updateResponse.message });
    }

    return res.status(400).json({ message: "❌ Invalid request parameters." });
  } catch (error) {
    console.error("❌ Error during ResetPassword process:", error);
    return res
      .status(500)
      .json({ message: "❌ Internal server error", error: error.message });
  }
};

// Function to send OTP
const sendOtp = async (email) => {
  try {
    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 }; // OTP valid for 10 minutes
    console.log("📩 Stored OTP:", otp, "for email:", email);

    const htmlContent = passwordResetEmail(otp);
    await SendEmail(email, "🔐 Password Reset OTP", htmlContent);

    return { status: 200, message: "📩 OTP sent to your email." };
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    return { status: 500, message: "❌ Error sending OTP." };
  }
};

// Function to verify OTP
const verifyOtp = (email, otp) => {
  const storedOtp = otpStore[email];

  if (!storedOtp) {
    console.log(`❌ No OTP found for email: ${email}`);
    return { status: 400, message: "❌ Invalid or expired OTP." };
  }

  console.log("📜 Stored OTP:", storedOtp.otp, "Received OTP:", otp);

  if (storedOtp.otp !== String(otp) || Date.now() > storedOtp.expiresAt) {
    console.log("❌ OTP mismatch or expired.");
    return { status: 400, message: "❌ Invalid or expired OTP." };
  }

  delete otpStore[email]; // Remove OTP after successful verification
  console.log("✅ OTP verified successfully.");
  return { status: 200, message: "✅ OTP verified successfully." };
};

// Function to update password
// Function to update password
const updatePassword = async (email, newPassword) => {
  try {
    // ✅ Fetch the user from the database
    const user = await Credential.findOne({ email });
    if (!user) {
      console.log(`❌ User not found: ${email}`);
      return { status: 404, message: "❌ User not found." };
    }

    console.log("🔑 Updating password for:", email);

    // ✅ Ensure user has a password before comparing
    if (!user.password) {
      console.log(`⚠️ No existing password found for: ${email}`);
      return {
        status: 400,
        message: "❌ Unable to reset password, please contact support.",
      };
    }
    console.log("User Password (before update): ", user.password);

    // ✅ Check if the new password matches the existing one
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      console.log("❌ New password cannot be the same as the old password.");
      return {
        status: 400,
        message: "❌ New password cannot be the same as the old password.",
      };
    }

    console.log("New password to be hashed:", newPassword);
    // ✅ Hash the new password and update it in the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log("New Hashed Password: ", hashedPassword);

    // Update the password in the database and get the updated document
    const updateResult = await Credential.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true } // This returns the updated document
    );

    if (!updateResult) {
      console.log("❌ Update operation failed");
      return { status: 500, message: "❌ Error updating password." };
    }

    console.log("User Password (after update): ", updateResult.password);

    console.log(`✅ Password updated successfully for ${email}`);
    return { status: 200, message: "✅ Password updated successfully." };
  } catch (error) {
    console.error("❌ Error updating password:", error);
    return { status: 500, message: "❌ Error updating password." };
  }
};

//Function to verify email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query; // Get token from URL

    if (!token) {
      return res.status(400).json({ message: "Invalid or missing token." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;

    // Find user and update isVerified to true
    const user = await Credential.findOneAndUpdate(
      { email: userEmail },
      { accountVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid or expired token.", error: error.message });
  }
};

//Function to resend Account Verification Link
export const resendAccountVerificationLink = async (req, res) => {
  try {
    const { email } = req.body;

    // Input validation
    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }

    // Validate email format (basic check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format.",
      });
    }

    // Generate email verification token (expires in 24 hours)
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Create verification link
    const verificationLink = `http://localhost:5173/verify-email?token=${token}`;

    // Send verification email
    await sendVerificationEmail(email, verificationLink);

    // Success response
    res.status(200).json({
      message: "Verification email sent successfully!",
      data: {
        email,
        verificationLink, // Optional: Return link for debugging
      },
    });
  } catch (err) {
    console.error("Error in resendAccountVerificationLink:", err);

    // Handle specific errors
    if (err.name === "JsonWebTokenError") {
      return res.status(500).json({
        message: "Failed to generate verification token.",
      });
    }

    if (err.name === "EmailSendingError") {
      return res.status(500).json({
        message: "Failed to send verification email.",
      });
    }

    // Generic error response
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
      error: err.message, // Optional: Include error details for debugging
    });
  }
};

export const reset_Password = async (req, res) => {
  try {
    const email = req.body.email;

    const foundUser = await User.findOne({ email: email });

    if (foundUser) {
      const token = jwt.sign({ email }, secret, { expiresIn: "1h" });
      console.log("Token Generated : ", token);
      const link = `http://localhost:5173/resetPassword/${token}`;
      console.log("Link : ", link);
      const htmlContent = `
    <html>
      <style>
        h1 {
          color: red;
        }
      </style>
      <h1>Reset Password Link</h1>
      <p>Click on the link to reset your password</p>
      <a href=${link}><button>Reset Password</button></a>
      <marquee>WedJoy</marquee>
    </html>`;

      await SendEmail(email, "Reset Password", htmlContent);
      res.status(200).json({
        message: "Reset Password Link sent to your email",
      });
    } else {
      console.log("User Not found with this email : ", email);
      res.status(404).json({
        message: "User not found with email .....Register first",
      });
    }
  } catch (err) {
    console.log("Error in Reset Password : ", err);
    res.status(500).json({
      message: "Error in Reset Password",
      data: err,
    });
  }
};



export const newUpdatedPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required." });
    }

   
    
      const userFromToken = jwt.verify(token, secret);
    

    console.log("User from Token:", userFromToken);

    // Hash new password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    // Update user password
    const updatedUser = await User.findByIdAndUpdate(
      userFromToken._id,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("Error in newUpdatedPassword:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

