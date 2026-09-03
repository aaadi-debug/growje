//server/src/routes/auth.routes.js
const express = require("express");

const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
} = require("../controllers/auth.controller");

const {
  protect,
  adminOnly,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

router.get(
  "/admin-test",
  protect,
  adminOnly,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
      data: req.user,
    });
  }
);

module.exports = router;