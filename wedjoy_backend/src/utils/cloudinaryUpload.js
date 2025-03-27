import cloudinary from "cloudinary";

// Configure Cloudinary (Ensure ENV variables are loaded correctly)
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

/**
 * Uploads file buffer to Cloudinary
 * @param {Object} file - Multer file object (with buffer)
 * @returns {Promise<Object>} - Cloudinary upload response
 */
const uploadFileToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { resource_type: "image" }, 
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(error);
        }
        resolve(result);
      }
    );

    uploadStream.end(file.buffer); // Sending the file buffer
  });
};

export { uploadFileToCloudinary };
