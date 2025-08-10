import mongoose from "mongoose";
import { DB_LOCAL_URL, MODE } from "../constant.js";
import { DB_PRODUCTION_URL } from "../constant.js";

const db_connect = async () => {
  try {
    if (MODE === "production") {
      await mongoose.connect(DB_PRODUCTION_URL);
      console.log("production database connected");
    } else {
      await mongoose.connect(DB_LOCAL_URL);
      console.log("local database connected \u2714");
    }
  } catch (error) {
    console.log(error);
  }
};
export default db_connect;
