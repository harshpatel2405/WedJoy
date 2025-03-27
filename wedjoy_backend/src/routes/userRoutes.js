import express from "express";
// Import Multer middleware
import { uploadImage } from "../controllers/userController.js"; // Import controller

const router = express.Router(); 

// Apply Multer middleware here
router.post("/image",  uploadImage);

export default router;
