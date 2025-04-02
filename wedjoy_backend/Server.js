import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import CredentialRoutes from "./src/routes/CredentialRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import UserRoutes from "./src/routes/userRoutes.js";
// import EventRoutes from './src/routes/eventRoutes.js'
dotenv.config();
console.log(process.env.MONGO_URI);
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://wedjoy.vercel.app",
    ],
    credentials: true,
  })
);

connectDB();
// app.use("/api/events",EventRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/credential", CredentialRoutes);
app.use(UserRoutes);

import eventRoutes from "./src/routes/eventRoutes.js";
app.use(eventRoutes);

import adminRoutes from "./src/routes/AdminRoutes.js";
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Wedjoy Backend is running perfectly");
});

app.listen(PORT, () => {
  console.log(`Server => Connected (${PORT})`);
});
