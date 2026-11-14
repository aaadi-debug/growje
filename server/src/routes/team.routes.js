const express = require("express");
const router = express.Router();

const {
  createTeamMember,
  getAllTeamMembers,
  getPublishedTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/team.controller");

const { protect, adminOnly } = require("../middleware/auth.middleware");

// Public
router.get("/public", getPublishedTeamMembers);

// Admin
router.get("/", protect, adminOnly, getAllTeamMembers);
router.post("/", protect, adminOnly, createTeamMember);
router.get("/:id", protect, adminOnly, getTeamMemberById);
router.put("/:id", protect, adminOnly, updateTeamMember);
router.delete("/:id", protect, adminOnly, deleteTeamMember);

module.exports = router;