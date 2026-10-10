// server/src/routes/digitalZone.routes.js
const express = require("express");
const router = express.Router();
const { getDigitalZone, updateDigitalZone } = require("../controllers/digitalZone.controller");
const { protect, adminOnly } = require("../middleware/auth.middleware");

// Public
router.get("/public", getDigitalZone);

// Admin
router.get("/", protect, adminOnly, getDigitalZone);
router.put("/", protect, adminOnly, updateDigitalZone);

module.exports = router;