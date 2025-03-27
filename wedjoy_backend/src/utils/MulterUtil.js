// import multer from "multer";
// import path from "path";

// // Configure storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log("📂 Setting file destination to 'uploads/'");
//     cb(null, "uploads/"); 
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     const newFilename = `${uniqueSuffix}${path.extname(file.originalname)}`;
//     console.log(`📄 Generating unique filename: ${newFilename}`);
//     cb(null, newFilename);
//   },
// });

// // File filter to allow images and videos
// const fileFilter = (req, file, cb) => {
//   console.log(`🔍 Checking file type: ${file.originalname} (${file.mimetype})`);

//   const allowedExtensions = /jpeg|jpg|png|gif|mp4|mov|avi|mkv/;
//   const extName = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
//   const mimeType = allowedExtensions.test(file.mimetype);

//   if (extName && mimeType) {
//     console.log("✅ File type is allowed");
//     cb(null, true);
//   } else {
//     console.error("❌ File type not allowed:", file.originalname);
//     cb(new Error("Only images (JPEG, JPG, PNG, GIF) and videos (MP4, MOV, AVI, MKV) are allowed"));
//   }
// };

// // Multer upload configuration
// const upload = multer({
//   storage,
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
//   fileFilter,
// });

// console.log("✅ Multer initialized for images and videos");

// export default upload;

// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // Ensure `uploads/` folder exists
// const uploadDir = "uploads/";
// if (!fs.existsSync(uploadDir)) {
//   console.log("📂 'uploads/' folder not found! Creating...");
//   fs.mkdirSync(uploadDir, { recursive: true });
//   console.log("✅ 'uploads/' folder created successfully!");
// }

// // Configure storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log("📂 Setting file destination to 'uploads/'");
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     const newFilename = `${uniqueSuffix}${path.extname(file.originalname)}`;
//     console.log(`📄 Generating unique filename: ${newFilename}`);
//     cb(null, newFilename);
//   },
// });

// // File filter to allow images and videos
// const fileFilter = (req, file, cb) => {
//   console.log(`🔍 Checking file type: ${file.originalname} (${file.mimetype})`);

//   const allowedExtensions = /jpeg|jpg|png|gif|mp4|mov|avi|mkv/;
//   const extName = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
//   const mimeType = allowedExtensions.test(file.mimetype);

//   if (extName && mimeType) {
//     console.log("✅ File type is allowed");
//     cb(null, true);
//   } else {
//     console.error("❌ File type not allowed:", file.originalname);
//     cb(new Error("Only images (JPEG, JPG, PNG, GIF) and videos (MP4, MOV, AVI, MKV) are allowed"));
//   }
// };

// // Multer upload configuration
// const upload = multer({
//   storage,
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
//   fileFilter,
// });

// console.log("✅ Multer initialized for images and videos");

// export default upload;

