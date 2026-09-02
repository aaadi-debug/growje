//server/src/routes/project.routes.js
const express = require("express");

const router = express.Router();

const {
  createProject,
  getProjects,
  getProjectById,
  getProjectBySlug,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

const { protect, adminOnly } = require("../middleware/auth.middleware");

// ===============================
// ADMIN ROUTES
// ===============================

router.post(
  "/",
  protect,
  adminOnly,
  createProject
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateProject
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProject
);

// ===============================
// GET ALL
// ===============================

router.get(
  "/",
  getProjects
);

// ===============================
// IMPORTANT:
// /slug/:slug must come before /:id
// ===============================

router.get(
  "/slug/:slug",
  getProjectBySlug
);

router.get(
  "/:id",
  getProjectById
);

module.exports = router;