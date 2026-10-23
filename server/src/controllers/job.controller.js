const Job = require("../models/Job");

// CREATE
const createJob = async (req, res) => {
  try {
    const {
      title,
      slug,
      department,
      location,
      employmentType,
      shortDescription,
      description,
      responsibilities = [],
      requirements = [],
      applyEmail,
      order,
      status,
      seo,
    } = req.body;

    if (!title || !slug) {
      return res.status(400).json({
        success: false,
        message: "Title and slug are required",
      });
    }

    const existing = await Job.findOne({ slug: slug.toLowerCase() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "A job with this slug already exists",
      });
    }

    const job = await Job.create({
      title,
      slug: slug.toLowerCase(),
      department,
      location,
      employmentType,
      shortDescription,
      description,
      responsibilities,
      requirements,
      applyEmail,
      order,
      status,
      seo,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create job",
      error: error.message,
    });
  }
};

// GET ALL (admin)
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch jobs" });
  }
};

// GET PUBLISHED (public)
const getPublishedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "published" }).sort({
      order: 1,
      createdAt: -1,
    });
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch jobs" });
  }
};

// GET BY ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch job" });
  }
};

// GET BY SLUG (public)
const getJobBySlug = async (req, res) => {
  try {
    const job = await Job.findOne({
      slug: req.params.slug,
      status: "published",
    });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch job" });
  }
};

// UPDATE
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const { slug } = req.body;
    if (slug && slug !== job.slug) {
      const existing = await Job.findOne({
        slug: slug.toLowerCase(),
        _id: { $ne: job._id },
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "A job with this slug already exists",
        });
      }
    }

    Object.assign(job, {
      ...req.body,
      slug: slug ? slug.toLowerCase() : job.slug,
    });

    await job.save();

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.error("Update Job Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update job",
      error: error.message,
    });
  }
};

// DELETE
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    await job.deleteOne();
    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete job" });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getPublishedJobs,
  getJobById,
  getJobBySlug,
  updateJob,
  deleteJob,
};