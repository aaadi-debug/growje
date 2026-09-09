const Blog = require("../models/Blog");

// CREATE
const createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      category,
      readTime,
      author,
      visualCredit,
      hero,
      content,
      featured,
      status,
      publishedAt,
      order,
      seo,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Blog title is required",
      });
    }

    if (!slug?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Blog slug is required",
      });
    }

    if (!hero?.media?.url) {
      return res.status(400).json({
        success: false,
        message: "Hero media is required",
      });
    }

    const existingBlog = await Blog.findOne({
      slug: slug.trim().toLowerCase(),
    });

    if (existingBlog) {
      return res.status(409).json({
        success: false,
        message: "A blog with this slug already exists",
      });
    }

    const blog = await Blog.create({
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      excerpt: excerpt?.trim() || "",
      category: category?.trim() || "Article",
      readTime: Number(readTime) || 3,
      author: author || {},
      visualCredit: visualCredit?.trim() || "",
      hero,
      content: content || [],
      featured: Boolean(featured),
      status: status || "draft",
      publishedAt:
        status === "published"
          ? publishedAt || new Date()
          : null,
      order: Number(order) || 0,
      seo: seo || {},
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Create Blog Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create blog",
    });
  }
};

// ADMIN - GET ALL
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({
        order: 1,
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("Get Blogs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
};

// ADMIN - GET ONE
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Get Blog Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
    });
  }
};

// PUBLIC - GET ALL PUBLISHED
const getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      status: "published",
    })
      .sort({
        featured: -1,
        publishedAt: -1,
        order: 1,
      })
      .select(
        "-content -seo -hero.media.publicId"
      );

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("Get Published Blogs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch published blogs",
    });
  }
};

// PUBLIC - GET BY SLUG
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      status: "published",
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Get Blog By Slug Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
    });
  }
};

// UPDATE
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const {
      title,
      slug,
      excerpt,
      category,
      readTime,
      author,
      visualCredit,
      hero,
      content,
      featured,
      status,
      publishedAt,
      order,
      seo,
    } = req.body;

    if (slug && slug !== blog.slug) {
      const existingBlog = await Blog.findOne({
        slug: slug.trim().toLowerCase(),
        _id: { $ne: blog._id },
      });

      if (existingBlog) {
        return res.status(409).json({
          success: false,
          message: "A blog with this slug already exists",
        });
      }
    }

    blog.title = title?.trim() || blog.title;

    if (slug) {
      blog.slug = slug.trim().toLowerCase();
    }

    blog.excerpt = excerpt?.trim() ?? blog.excerpt;
    blog.category = category?.trim() || blog.category;
    blog.readTime = Number(readTime) || blog.readTime;

    if (author) {
      blog.author = author;
    }

    blog.visualCredit =
      visualCredit?.trim() ?? blog.visualCredit;

    if (hero) {
      blog.hero = hero;
    }

    // if (content) {
    //   blog.content = content;
    // }
    if (Array.isArray(content)) {
      blog.content = content.map((block) => {
        const cleanedBlock = {
          ...block,
        };

        if (!cleanedBlock.media?.url) {
          delete cleanedBlock.media;
        }

        return cleanedBlock;
      });
    }

    if (typeof featured !== "undefined") {
      blog.featured = Boolean(featured);
    }

    if (status) {
      blog.status = status;

      if (
        status === "published" &&
        !blog.publishedAt
      ) {
        blog.publishedAt = new Date();
      }

      if (status === "draft") {
        blog.publishedAt = null;
      }
    }

    if (publishedAt) {
      blog.publishedAt = publishedAt;
    }

    if (typeof order !== "undefined") {
      blog.order = Number(order);
    }

    if (seo) {
      blog.seo = seo;
    }

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("Update Blog Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update blog",
    });
  }
};

// DELETE
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete Blog Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete blog",
    });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  getPublishedBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};