// server/src/controllers/offlineZone.controller.js
const OfflineZone = require("../models/OfflineZone");

const getOfflineZone = async (req, res) => {
  try {
    let page = await OfflineZone.findOne();

    if (!page) {
      page = await OfflineZone.create({});
    }

    res.status(200).json({ success: true, page });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Offline Zone",
    });
  }
};

const updateOfflineZone = async (req, res) => {
  try {
    let page = await OfflineZone.findOne();

    if (!page) {
      page = await OfflineZone.create(req.body);
    } else {
      Object.assign(page, req.body);
      await page.save();
    }

    res.status(200).json({
      success: true,
      message: "Offline Zone updated successfully",
      page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update Offline Zone",
    });
  }
};

module.exports = { getOfflineZone, updateOfflineZone };