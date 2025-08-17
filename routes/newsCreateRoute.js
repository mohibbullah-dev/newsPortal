import e from "express";
import { authMiddleware } from "../middleware/authMiddlware.js";
import {
  addGellery,
  getGelleries,
  getNews,
  newsCreate,
} from "../controller/newsCreateController.js";

const Router = e.Router();
Router.post("/news-create", authMiddleware, newsCreate);
Router.get("/get-all-news", authMiddleware, getNews);
Router.post("/add-gellery", authMiddleware, addGellery);
Router.get("/get-gelleries", authMiddleware, getGelleries);

export default Router;
