const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  uploadMedia,
} = require("../controllers/upload.controller");

const { protect, adminOnly } = require("../middleware/auth.middleware");

router.post(
  "/media",
  protect,
  adminOnly,
  upload.single("file"),
  uploadMedia
);

module.exports = router;