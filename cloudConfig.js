// const cloudinary = require('cloudinary');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET
// });

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'horental_DEV',
//       allowerdFormat: ["png", "jpg", "jpeg"],
//     },
// });

// module.exports = {
//     cloudinary,
//     storage,
// }

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config(); 

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'horental_DEV',
      allowed_formats: ['png', 'jpg', 'jpeg'], // Corrected the typo
    },
});

module.exports = {
    cloudinary,
    storage,
};
