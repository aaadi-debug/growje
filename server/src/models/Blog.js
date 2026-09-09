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

    publicId: {
      type: String,
      default: "",
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

const contentBlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "paragraph",
        "heading",
        "image",
        "quote",
        "list",
        "video",
      ],
      required: true,
    },

    content: {
      type: String,
      default: "",
    },

    level: {
      type: Number,
      enum: [2, 3],
      default: 2,
    },

    items: {
      type: [String],
      default: [],
    },

    media: {
      type: mediaSchema,
      default: undefined,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    excerpt: {
      type: String,
      default: "",
      trim: true,
      maxlength: 500,
    },

    category: {
      type: String,
      default: "Article",
      trim: true,
    },

    readTime: {
      type: Number,
      default: 3,
      min: 1,
    },

    author: {
      name: {
        type: String,
        default: "GROWJE",
        trim: true,
      },

      role: {
        type: String,
        default: "",
        trim: true,
      },
    },

    visualCredit: {
      type: String,
      default: "",
      trim: true,
    },

    hero: {
      media: {
        type: mediaSchema,
        required: true,
      },
    },

    content: {
      type: [contentBlockSchema],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    order: {
      type: Number,
      default: 0,
    },

    seo: {
      metaTitle: {
        type: String,
        default: "",
      },

      metaDescription: {
        type: String,
        default: "",
      },

      ogImage: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);