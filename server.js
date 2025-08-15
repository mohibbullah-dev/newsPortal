import express from "express";
import { MODE, PORT } from "./constant.js";
import db_connect from "./utils/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
if (MODE === "production") {
  app.use(cors());
} else {
  app.use(
    cors({
      origin: "http://localhost:5173",
      // credentials: true,
    })
  );
}
app.use(cookieParser());

// route starts
import authRouter from "./routes/authRoute.js";
import newsRouter from "./routes/newsCreateRoute.js";

app.use("/api/v1/", authRouter);
app.use("/api/v1/", newsRouter);
// route ends

const serverStart = async () => {
  try {
    await db_connect();
    app.listen(PORT, () => {
      console.log(
        `server is running on the port of ${PORT} http://localhost:5001`
      );
    });
  } catch (error) {
    console.log(`serverStart error ${error}`);
    process.exit(1);
  }
};

serverStart();
