const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "growje/projects",

    resource_type: "auto",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
      "gif",
      "avif",
      "mp4",
      "webm",
      "mov",
    ],
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

module.exports = upload;