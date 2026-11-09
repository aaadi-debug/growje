const express = require("express");
const router = express.Router();

const {
  createClient,
  getAllClients,
  getPublishedClients,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/client.controller");

const { protect, adminOnly } = require("../middleware/auth.middleware");

// Public
router.get("/public", getPublishedClients);

// Admin
router.get("/", protect, adminOnly, getAllClients);
router.post("/", protect, adminOnly, createClient);
router.get("/:id", protect, adminOnly, getClientById);
router.put("/:id", protect, adminOnly, updateClient);
router.delete("/:id", protect, adminOnly, deleteClient);

module.exports = router;