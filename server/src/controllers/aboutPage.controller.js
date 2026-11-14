const AboutPage = require("../models/AboutPage");

const getAboutPage = async (req, res) => {
  try {
    let page = await AboutPage.findOne();
    if (!page) {
      page = await AboutPage.create({});
    }
    res.status(200).json({ success: true, page });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch About page",
    });
  }
};

const updateAboutPage = async (req, res) => {
  try {
    let page = await AboutPage.findOne();
    if (!page) {
      page = await AboutPage.create(req.body);
    } else {
      Object.assign(page, req.body);
      await page.save();
    }
    res.status(200).json({
      success: true,
      message: "About page updated successfully",
      page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update About page",
    });
  }
};

module.exports = { getAboutPage, updateAboutPage };