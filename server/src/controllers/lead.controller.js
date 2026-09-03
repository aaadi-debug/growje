const Lead = require("../models/Lead");

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const phoneRegex =
  /^[0-9+\-\s()]{10,20}$/;


// =========================================
// CREATE LEAD - PUBLIC
// =========================================

const createLead = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      service,
      message,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters",
      });
    }

    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email",
      });
    }

    if (!phone?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    if (!phoneRegex.test(phone.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number",
      });
    }

    if (!service?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please select a service",
      });
    }

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    if (message.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: "Message must be at least 20 characters",
      });
    }

    const lead = await Lead.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: company?.trim() || "",
      service: service.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
      lead: {
        id: lead._id,
      },
    });

  } catch (error) {
    console.error("Create Lead Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit enquiry",
    });
  }
};


// =========================================
// ADMIN - GET ALL LEADS
// =========================================

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find()
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: leads.length,
      leads,
    });

  } catch (error) {
    console.error("Get Leads Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
};


// =========================================
// ADMIN - GET SINGLE LEAD
// =========================================

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      lead,
    });

  } catch (error) {
    console.error("Get Lead Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch lead",
    });
  }
};


// =========================================
// ADMIN - UPDATE STATUS
// =========================================

const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "new",
      "contacted",
      "closed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead status",
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Lead marked as ${status}`,
      lead,
    });

  } catch (error) {
    console.error("Update Lead Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update lead status",
    });
  }
};


// =========================================
// ADMIN - UPDATE READ STATUS
// =========================================

const updateLeadReadStatus = async (req, res) => {
  try {
    const { isRead } = req.body;

    if (typeof isRead !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isRead must be true or false",
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        isRead,
      },
      {
        new: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: isRead
        ? "Lead marked as read"
        : "Lead marked as unread",
      lead,
    });

  } catch (error) {
    console.error("Update Lead Read Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update read status",
    });
  }
};


// =========================================
// ADMIN - DELETE LEAD
// =========================================

const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(
      req.params.id
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });

  } catch (error) {
    console.error("Delete Lead Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete lead",
    });
  }
};


module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  updateLeadReadStatus,
  deleteLead,
};