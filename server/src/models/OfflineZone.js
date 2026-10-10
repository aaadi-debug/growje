// server/src/models/OfflineZone.js
const mongoose = require("mongoose");

const offlineZoneSchema = new mongoose.Schema(
  {
    hero: {
      title: { type: String, default: "" },
      subtitle: { type: String, default: "" },
      mediaType: {
        type: String,
        enum: ["image", "gif", "video"],
        default: "image",
      },
      media: {
        type: { type: String, enum: ["image", "gif", "video"], default: "image" },
        url: { type: String, default: "" },
        publicId: { type: String, default: "" },
        alt: { type: String, default: "" },
      },
    },

    aboutSections: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        bullets: [{ type: String }],
        image: {
          url: { type: String, default: "" },
          alt: { type: String, default: "" },
          publicId: { type: String, default: "" },
        },
      },
    ],

    faqs: [
      {
        question: { type: String, required: true, trim: true },
        answer: { type: String, default: "", trim: true },
      },
    ],

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OfflineZone", offlineZoneSchema);