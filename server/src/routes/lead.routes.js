const express = require("express");

const {
  createLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  updateLeadReadStatus,
  deleteLead,
} = require("../controllers/lead.controller");

const {
  protect,
  adminOnly,
} = require("../middleware/auth.middleware");

const router = express.Router();


// =========================================
// PUBLIC
// =========================================

router.post("/", createLead);


// =========================================
// ADMIN
// =========================================

// Get all leads
router.get(
  "/",
  protect,
  adminOnly,
  getLeads
);

// Get single lead
router.get(
  "/:id",
  protect,
  adminOnly,
  getLeadById
);

// Update status
router.patch(
  "/:id/status",
  protect,
  adminOnly,
  updateLeadStatus
);

// Mark read/unread
router.patch(
  "/:id/read",
  protect,
  adminOnly,
  updateLeadReadStatus
);

// Delete
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteLead
);


module.exports = router;