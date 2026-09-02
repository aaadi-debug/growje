const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    return res.status(200).json({
      success: true,

      message: "File uploaded successfully",
      file: {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
        format: req.file.format,
        resourceType: req.file.resource_type,
        width: req.file.width || null,
        height: req.file.height || null,
        bytes: req.file.bytes,
      },
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to upload file",
    });
  }
};

module.exports = { uploadMedia };