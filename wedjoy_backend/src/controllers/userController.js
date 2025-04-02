// import upload from "../utils/MulterUtil.js"; // Multer configuration
// import { uploadFileToCloudinary } from "../utils/cloudinaryUpload.js"; // Cloudinary upload utility
// import path from "path";

// // Function to check if a file is an image
// const isImage = (file) => {
//   const allowedExtensions = /jpeg|jpg|png|gif/;
//   return file && allowedExtensions.test(path.extname(file.originalname).toLowerCase());
// };

// // Middleware to handle image upload
// export const uploadImage = async (req, res) => {
//   console.log("➡️ Received request to upload image"); // Debug log

//   try {
//     // Use Multer to handle file upload
//     upload.single("file")(req, res, async (err) => {
//       if (err) {
//         console.error("❌ Multer Error:", err.message); // Debug log
//         return res.status(400).json({ error: err.message });
//       }

//       console.log("✅ Multer processed file:", req.file); // Debug log

//       // Check if file exists
//       if (!req.file) {
//         console.error("❌ No file uploaded");
//         return res.status(400).json({ error: "No file uploaded" });
//       }

//       // Check if the uploaded file is an image
//       if (!isImage(req.file)) {
//         console.error("❌ Uploaded file is not an image:", req.file.mimetype);
//         return res.status(400).json({ error: "Uploaded file is not an image" });
//       }

//       console.log("✅ File is a valid image:", req.file.originalname); // Debug log

//       // Upload image to Cloudinary
//       console.log("📤 Uploading file to Cloudinary...");
//       const cloudinaryResponse = await uploadFileToCloudinary(req.file);
//       console.log("✅ Cloudinary Upload Success:", cloudinaryResponse.secure_url);

//       // Return Cloudinary response
//       return res.status(200).json({
//         message: "Image uploaded successfully",
//         cloudinaryUrl: cloudinaryResponse.secure_url,
//       });
//     });
//   } catch (error) {
//     console.error("❌ Upload Error:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


import multer from "multer";
import path from 'path';
import { uploadFileToCloudinary } from "../utils/cloudinaryUpload.js";

// Multer storage configuration
// Multer storage configuration (using memoryStorage)
const storage = multer.memoryStorage();

// File filter to allow only image uploads
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Multer upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("image");




export const uploadImage = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const cloudinaryResponse = await uploadFileToCloudinary(req.file); // Pass file path
      console.log(cloudinaryResponse);
      console.log(req.body);

      // Store data in the database (add your logic here)
      req.body.profilePicture = cloudinaryResponse.secure_url;

      res.json({ message: "Image saved successfully", cloudinaryResponse });
    } catch (error) {
      res.status(500).json({ message: "Error uploading file", error: error.message });
    }
  });
};
