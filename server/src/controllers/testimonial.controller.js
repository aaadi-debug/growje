const Testimonial = require("../models/Testimonial");

// CREATE
const createTestimonial = async (req, res) => {
  try {
    const { name, role, content, rating, avatar, order, status } = req.body;

    if (!name || !content) {
      return res.status(400).json({
        success: false,
        message: "Name and content are required",
      });
    }

    const testimonial = await Testimonial.create({
      name,
      role,
      content,
      rating: rating || 5,
      avatar,
      order: order ?? 0,
      status: status || "draft",
    });

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      testimonial,
    });
  } catch (error) {
    console.error("Create Testimonial Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create testimonial",
      error: error.message,
    });
  }
};

// GET ALL (admin)
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: testimonials.length,
      testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
    });
  }
};

// GET PUBLISHED (public)
const getPublishedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      status: "published",
    }).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
    });
  }
};

// GET BY ID
const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({ success: true, testimonial });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonial",
    });
  }
};

// UPDATE
const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      testimonial,
    });
  } catch (error) {
    console.error("Update Testimonial Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update testimonial",
      error: error.message,
    });
  }
};

// DELETE
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
    });
  }
};

module.exports = {
  createTestimonial,
  getAllTestimonials,
  getPublishedTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};