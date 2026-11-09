const Client = require("../models/Client");

const createClient = async (req, res) => {
  try {
    const { name, logo, website, order, status } = req.body;

    if (!name || !logo?.url) {
      return res.status(400).json({
        success: false,
        message: "Name and logo are required",
      });
    }

    const client = await Client.create({
      name,
      logo,
      website,
      order: order ?? 0,
      status: status || "draft",
    });

    res.status(201).json({
      success: true,
      message: "Client created successfully",
      client,
    });
  } catch (error) {
    console.error("Create Client Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create client",
      error: error.message,
    });
  }
};

const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, clients });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch clients" });
  }
};

const getPublishedClients = async (req, res) => {
  try {
    const clients = await Client.find({ status: "published" }).sort({
      order: 1,
      createdAt: -1,
    });
    res.status(200).json({ success: true, clients });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch clients" });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }
    res.status(200).json({ success: true, client });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch client" });
  }
};

const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }
    res.status(200).json({
      success: true,
      message: "Client updated successfully",
      client,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update client",
      error: error.message,
    });
  }
};

const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }
    res.status(200).json({ success: true, message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete client" });
  }
};

module.exports = {
  createClient,
  getAllClients,
  getPublishedClients,
  getClientById,
  updateClient,
  deleteClient,
};