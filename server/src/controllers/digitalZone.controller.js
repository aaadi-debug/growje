const DigitalZone = require("../models/DigitalZone");

// Get the page (for admin + public)
const getDigitalZone = async (req, res) => {
  try {
    let page = await DigitalZone.findOne();

    // Create empty document if it doesn't exist yet
    if (!page) {
      page = await DigitalZone.create({});
    }

    res.status(200).json({ success: true, page });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch Digital Zone" });
  }
};

// Update the page
const updateDigitalZone = async (req, res) => {
  try {
    let page = await DigitalZone.findOne();

    if (!page) {
      page = await DigitalZone.create(req.body);
    } else {
      Object.assign(page, req.body);
      await page.save();
    }

    res.status(200).json({
      success: true,
      message: "Digital Zone updated successfully",
      page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

module.exports = { getDigitalZone, updateDigitalZone };