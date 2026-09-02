//server/src/routes/service.routes.js
const express = require("express");

const router = express.Router();

const {
  createService,
  getAllServices,
  getPublishedServices,
  getServiceById,
  getServiceBySlug,
  updateService,
  deleteService,
} = require("../controllers/service.controller");

const { protect, adminOnly } = require("../middleware/auth.middleware");


// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get all published services
// router.get("/", getAllServices);

router.get("/public", getPublishedServices);
// Get service by slug
router.get("/slug/:slug", getServiceBySlug);


// ==========================================
// ADMIN ROUTES
// ==========================================

router.get(
  "/",
  protect,
  adminOnly,
  getAllServices
);

// Create service
router.post(
  "/",
  protect,
  adminOnly,
  createService
);

// Get service by ID
router.get(
  "/:id",
  protect,
  adminOnly,
  getServiceById
);

// Update service
router.put(
  "/:id",
  protect,
  adminOnly,
  updateService
);

// Delete service
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteService
);


module.exports = router;