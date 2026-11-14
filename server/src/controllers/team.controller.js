const TeamMember = require("../models/TeamMember");

const createTeamMember = async (req, res) => {
  try {
    const { name, profession, specialName, description, photo, order, status } =
      req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const member = await TeamMember.create({
      name,
      profession,
      specialName,
      description,
      photo,
      order: order ?? 0,
      status: status || "draft",
    });

    res.status(201).json({
      success: true,
      message: "Team member created successfully",
      member,
    });
  } catch (error) {
    console.error("Create Team Member Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create team member",
      error: error.message,
    });
  }
};

const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, members });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch team members",
    });
  }
};

const getPublishedTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find({ status: "published" }).sort({
      order: 1,
      createdAt: -1,
    });
    res.status(200).json({ success: true, members });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch team members",
    });
  }
};

const getTeamMemberById = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }
    res.status(200).json({ success: true, member });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch team member",
    });
  }
};

const updateTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team member updated successfully",
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update team member",
      error: error.message,
    });
  }
};

const deleteTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete team member",
    });
  }
};

module.exports = {
  createTeamMember,
  getAllTeamMembers,
  getPublishedTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
};