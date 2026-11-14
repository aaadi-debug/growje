const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
    alt: { type: String, default: "" },
  },
  { _id: false }
);

const aboutPageSchema = new mongoose.Schema(
  {
    // ===== HERO =====
    hero: {
      eyebrow: { type: String, default: "About GROWJE" },
      titleLine1: { type: String, default: "We build brands" },
      titleLine2: { type: String, default: "people remember." },
      subtitle: { type: String, default: "" },
      ctaText: { type: String, default: "Get A Quote" },
      ctaLink: { type: String, default: "/contact-us" },
      backgroundImage: mediaSchema,
      stats: [
        {
          value: { type: String, default: "" }, // e.g. "1000+"
          label: { type: String, default: "" },
        },
      ],
    },

    // ===== FOUNDER / OWNER =====
    founder: {
      name: { type: String, default: "" },
      designation: { type: String, default: "" },
      image: mediaSchema,
    },

    // ===== ABOUT STORY =====
    about: {
      eyebrow: { type: String, default: "About Growje" },
      title: { type: String, default: "" },
      paragraphs: [{ type: String }], // ordered paragraphs
    },

    // ===== JOURNEY TIMELINE =====
    journey: {
      eyebrow: { type: String, default: "Our Journey" },
      title: { type: String, default: "From idea to impact" },
      items: [
        {
          year: { type: String, default: "" },
          title: { type: String, default: "" },
          description: { type: String, default: "" },
        },
      ],
    },

    // ===== MISSION & VISION =====
    mission: {
      title: { type: String, default: "Company Mission" },
      description: { type: String, default: "" },
      image: mediaSchema,
    },
    vision: {
      title: { type: String, default: "Our Vision" },
      description: { type: String, default: "" },
      image: mediaSchema,
    },

    // ===== VALUES / WAY OF WORKING =====
    values: {
      title: { type: String, default: "Our way of working" },
      items: [
        {
          number: { type: String, default: "" }, // "01"
          title: { type: String, default: "" },
          description: { type: String, default: "" },
        },
      ],
    },

    // ===== SECRET SAUCE / APPROACH IMAGES =====
    approach: {
      title: { type: String, default: "Our Secret Sauce" },
      desktopImages: [mediaSchema],
      mobileImages: [mediaSchema],
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },

    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AboutPage", aboutPageSchema);