import mongoose, { Schema } from "mongoose";

const authModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "pending",
    },
    image: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", authModel);
