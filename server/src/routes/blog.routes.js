const express = require("express");

const {
  createBlog,
  getBlogs,
  getBlogById,
  getPublishedBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");

const {
  protect,
  adminOnly,
} = require("../middleware/auth.middleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

router.get("/public", getPublishedBlogs);

router.get("/slug/:slug", getBlogBySlug);

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  protect,
  adminOnly,
  getBlogs
);

router.post(
  "/",
  protect,
  adminOnly,
  createBlog
);

router.get(
  "/:id",
  protect,
  adminOnly,
  getBlogById
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateBlog
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteBlog
);

module.exports = router;