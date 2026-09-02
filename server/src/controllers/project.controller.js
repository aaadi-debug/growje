//server/src/controllers/project.controller.js
const Project = require("../models/Project");

// ======================================
// CREATE PROJECT
// ======================================

const createProject = async (req, res) => {
  try {
    const {
      title,
      slug,
      clientName,
      shortDescription,
      category,
      services,
      workedOn,
      hero,
      about,
      showcaseSections,
      status,
      order,
      seo,
    } = req.body;

    if (!title || !slug) {
      return res.status(400).json({
        success: false,
        message: "Project title and slug are required",
      });
    }

    const existingProject = await Project.findOne({
      slug,
    });

    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: "A project with this slug already exists",
      });
    }

    const project = await Project.create({
      title,
      slug,
      clientName,
      shortDescription,
      category,
      services: services || [],
      workedOn: workedOn || [],
      hero,
      about,
      showcaseSections: showcaseSections || [],
      status,
      order,
      seo,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Create Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};

// ======================================
// GET ALL PROJECTS
// ======================================

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("services", "title slug")
      .sort({
        order: 1,
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Get Projects Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

// ======================================
// GET SINGLE PROJECT BY ID
// ======================================

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    ).populate("services", "title slug");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Get Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
};

// ======================================
// GET PROJECT BY SLUG
// ======================================

const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
      status: "published",
    }).populate("services", "title slug");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Get Project By Slug Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
};

// ======================================
// UPDATE PROJECT
// ======================================

const updateProject = async (req, res) => {
  try {
    const {
      slug,
    } = req.body;

    if (slug) {
      const existingProject =
        await Project.findOne({
          slug,
          _id: {
            $ne: req.params.id,
          },
        });

      if (existingProject) {
        return res.status(400).json({
          success: false,
          message:
            "Another project already uses this slug",
        });
      }
    }

    const project =
      await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      ).populate("services", "title slug");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};

// ======================================
// DELETE PROJECT
// ======================================

const deleteProject = async (req, res) => {
  try {
    const project =
      await Project.findByIdAndDelete(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  getProjectBySlug,
  updateProject,
  deleteProject,
};