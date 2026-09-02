//server/src/models/Service.js
const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    // Basic service information
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      default: "",
      trim: true,
    },

    // Hero section
    hero: {
      title: {
        type: String,
        default: "",
      },

      mediaType: {
        type: String,
        enum: ["image", "gif", "video"],
        default: "image",
      },

      media: {
        type: {
          type: String,
          enum: ["image", "gif", "video"],
          default: "image",
        },
        url: { type: String, default: "" },
        publicId: { type: String, default: "" },
        alt: { type: String, default: "" },
      },
    },

    // Horizontal scrolling client names
    clients: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],

    // Portfolio section
    portfolioTitle: {
      type: String,
      default: "PORTFOLIO",
    },

    portfolioSubtitle: {
      type: String,
      default: "",
    },

    // Publishing control
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    // Manual ordering of services
    order: {
      type: Number,
      default: 0,
    },

    // SEO
    seo: {
      metaTitle: {
        type: String,
        default: "",
      },

      metaDescription: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", serviceSchema);