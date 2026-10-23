const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getPublishedJobs,
  getJobById,
  getJobBySlug,
  updateJob,
  deleteJob,
} = require("../controllers/job.controller");

const { protect, adminOnly } = require("../middleware/auth.middleware");

// Public
router.get("/public", getPublishedJobs);
router.get("/slug/:slug", getJobBySlug);

// Admin
router.get("/", protect, adminOnly, getAllJobs);
router.post("/", protect, adminOnly, createJob);
router.get("/:id", protect, adminOnly, getJobById);
router.put("/:id", protect, adminOnly, updateJob);
router.delete("/:id", protect, adminOnly, deleteJob);

module.exports = router;