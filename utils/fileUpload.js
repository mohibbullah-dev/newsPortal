import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../constant.js";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const fileUpload = async (file, options = {}) => {
  try {
    const data = await cloudinary.uploader.upload(file, { ...options });
    return data;
  } catch (error) {
    return { message: error };
  }
};

export { fileUpload };
