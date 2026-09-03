const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    console.log("======= AUTH CHECK =======");
    console.log("Cookies received:", req.cookies);
    console.log("Token:", req.cookies?.token);

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

module.exports = {
  protect,
  adminOnly,
};


// Request
//    ↓
// protect middleware
//    ↓
// Read HTTP-only cookie
//    ↓
// Verify JWT
//    ↓
// Find user in MongoDB
//    ↓
// Attach user to req.user
//    ↓
// adminOnly middleware
//    ↓
// Controller