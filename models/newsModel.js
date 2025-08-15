import mongoose, { Schema } from "mongoose";

const newsCreateSchema = new Schema(
  {
    writerId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    image: {
      url: {
        type: String,
        default: null,
      },

      public_id: {
        type: String,
        default: null,
      },
    },
    category: {
      type: String,
      required: true,
      default: null,
    },
    writer_name: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: "pending",
    },
    date: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const News =
  mongoose.models.News || mongoose.model("News", newsCreateSchema);
