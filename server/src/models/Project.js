//server/src/models/Project.js
const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["image", "gif", "video"],
      default: "image",
    },

    url: {
      type: String,
      required: true,
    },

    alt: {
      type: String,
      default: "",
    },

    poster: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const showcaseItemSchema = new mongoose.Schema(
  {
    media: mediaSchema,

    title: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);

const showcaseSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },

    layout: {
      type: String,
      enum: [
        "full",
        "two-column",
        "three-column",
        "custom",
      ],
      default: "full",
    },

    columns: {
      type: Number,
      default: 1,
    },

    gap: {
      type: Number,
      default: 20,
    },

    items: [showcaseItemSchema],

    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);

const projectSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC PROJECT INFORMATION
    // =========================

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

    clientName: {
      type: String,
      default: "",
    },

    shortDescription: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    // =========================
    // SERVICES
    // =========================

    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],

    // =========================
    // WORKED ON
    // =========================

    workedOn: [
      {
        type: String,
        trim: true,
      },
    ],

    // =========================
    // HERO SECTION
    // =========================

    hero: {
      media: mediaSchema,
    },

    // =========================
    // ABOUT PROJECT SECTION
    // =========================

    about: {
      title: {
        type: String,
        default: "About the project",
      },

      description: {
        type: String,
        default: "",
      },

      backgroundMedia: mediaSchema,
    },

    // =========================
    // UNLIMITED SHOWCASE SECTIONS
    // =========================

    showcaseSections: [showcaseSectionSchema],

    // =========================
    // STATUS
    // =========================

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    order: {
      type: Number,
      default: 0,
    },

    // =========================
    // SEO
    // =========================

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

module.exports = mongoose.model(
  "Project",
  projectSchema
);