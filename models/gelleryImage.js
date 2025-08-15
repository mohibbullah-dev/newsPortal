import mongoose, { Schema } from "mongoose";

const gellerySchema = new Schema(
  {
    writerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export const Gellery =
  mongoose.models.Gellery || mongoose.model("Gellery", gellerySchema);
