// server/src/routes/offlineZone.routes.js
const express = require("express");
const router = express.Router();
const {
  getOfflineZone,
  updateOfflineZone,
} = require("../controllers/offlineZone.controller");
const { protect, adminOnly } = require("../middleware/auth.middleware");

// Public
router.get("/public", getOfflineZone);

// Admin
router.get("/", protect, adminOnly, getOfflineZone);
router.put("/", protect, adminOnly, updateOfflineZone);

module.exports = router;