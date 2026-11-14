const express = require("express");
const router = express.Router();
const {
  getAboutPage,
  updateAboutPage,
} = require("../controllers/aboutPage.controller");
const { protect, adminOnly } = require("../middleware/auth.middleware");

router.get("/public", getAboutPage);
router.get("/", protect, adminOnly, getAboutPage);
router.put("/", protect, adminOnly, updateAboutPage);

module.exports = router;