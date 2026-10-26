const express = require("express");
const router = express.Router();

const {
  createTestimonial,
  getAllTestimonials,
  getPublishedTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial.controller");

const { protect, adminOnly } = require("../middleware/auth.middleware");

// Public
router.get("/public", getPublishedTestimonials);

// Admin
router.get("/", protect, adminOnly, getAllTestimonials);
router.post("/", protect, adminOnly, createTestimonial);
router.get("/:id", protect, adminOnly, getTestimonialById);
router.put("/:id", protect, adminOnly, updateTestimonial);
router.delete("/:id", protect, adminOnly, deleteTestimonial);

module.exports = router;