const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },

    company: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    service: {
      type: String,
      required: true,
      trim: true,
    },

    source: {
      type: String,
      enum: ["Contact Form", "Service Page"],
      default: "Contact Form",
    },

    budget: {                    // ← NEW
      type: String,
      default: "",
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 2000,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", leadSchema);