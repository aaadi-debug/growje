//server/src/controllers/service.controller.js
const Service = require("../models/Service");
const Project = require("../models/Project");

// ===============================
// CREATE SERVICE
// ===============================

const createService = async (req, res) => {
  try {
    const {
      title,
      slug,
      shortDescription,
      hero,
      clients,
      portfolioTitle,
      portfolioSubtitle,
      servicesSection,
      processSection,
      aboutSections,
      faqs = [],
      status,
      order,
      seo,
    } = req.body;

    // Check existing slug
    const existingService = await Service.findOne({
      slug: slug.toLowerCase(),
    });

    if (existingService) {
      return res.status(400).json({
        success: false,
        message: "A service with this slug already exists",
      });
    }

    const service = await Service.create({
      title,
      slug,
      shortDescription,
      hero,
      clients,
      portfolioTitle,
      portfolioSubtitle,
      servicesSection,
      processSection,
      aboutSections,
      faqs,
      status,
      order,
      seo,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error("Create Service Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error.message,
    });
  }
};


// ===============================
// GET ALL SERVICES
// ===============================

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get Services Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};


// ===============================
// GET SINGLE SERVICE BY ID
// ===============================

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("Get Service Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch service",
    });
  }
};


// ===============================
// GET SINGLE SERVICE BY SLUG
// ===============================

const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({
      slug: req.params.slug,
      status: "published",
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Fetch published projects belonging to this service
    const projects = await Project.find({
      services: service._id,
      status: "published",
    })
      .select(
        "title slug clientName shortDescription category hero order"
      )
      .sort({
        order: 1,
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      service,
      projects,
    });
  } catch (error) {
    console.error("Get Service By Slug Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch service",
    });
  }
};


// ===============================
// UPDATE SERVICE
// ===============================

const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const {
      title,
      slug,
      shortDescription,
      hero,
      clients,
      portfolioTitle,
      portfolioSubtitle,
      servicesSection,
      processSection,
      aboutSections,
      faqs,
      status,
      order,
      seo,
    } = req.body;

    // Check duplicate slug
    if (slug && slug !== service.slug) {
      const existingService = await Service.findOne({
        slug: slug.toLowerCase(),
        _id: {
          $ne: service._id,
        },
      });

      if (existingService) {
        return res.status(400).json({
          success: false,
          message: "A service with this slug already exists",
        });
      }
    }

    service.title = title ?? service.title;
    service.slug = slug?.toLowerCase() ?? service.slug;
    service.shortDescription =
      shortDescription ?? service.shortDescription;

    service.hero = hero ?? service.hero;
    service.clients = clients ?? service.clients;

    service.portfolioTitle =
      portfolioTitle ?? service.portfolioTitle;

    service.portfolioSubtitle =
      portfolioSubtitle ?? service.portfolioSubtitle;

    service.servicesSection = servicesSection ?? service.servicesSection;
    service.processSection = processSection ?? service.processSection;
    service.aboutSections = aboutSections ?? service.aboutSections;
    service.faqs = faqs ?? service.faqs;

    service.status = status ?? service.status;
    service.order = order ?? service.order;

    service.seo = seo ?? service.seo;

    await service.save();

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error("Update Service Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update service",
      error: error.message,
    });
  }
};


// ===============================
// DELETE SERVICE
// ===============================

const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    await service.deleteOne();

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete Service Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete service",
    });
  }
};

// ===============================
// FETCH PIBLISHED SERVICE
// ===============================

const getPublishedServices = async (req, res) => {
  try {
    const services = await Service.find({
      status: "published",
    }).sort({
      order: 1,
    });

    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};


module.exports = {
  createService,
  getAllServices,
  getPublishedServices,
  getServiceById,
  getServiceBySlug,
  updateService,
  deleteService,
};