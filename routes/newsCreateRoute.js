import e from "express";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddlware.js";
import {
  addGellery,
  deleteNews,
  getGelleries,
  getNews,
  newsCreate,
  newsEdit,
  newsUpdate,
  singleNews,
  statusUpdate,
} from "../controller/newsCreateController.js";

const Router = e.Router();
Router.post("/news-create", authMiddleware, newsCreate);
Router.put("/update/:news_id", authMiddleware, newsUpdate);
Router.put("/update-status/:newsId", authMiddleware, statusUpdate);
Router.get("/get-all-news", authMiddleware, getNews);
Router.post("/add-gellery", authMiddleware, addGellery);
Router.get("/get-gelleries", authMiddleware, getGelleries);
Router.get("/news/:news_id", authMiddleware, newsEdit);
Router.get("/single-news/:news_id", authMiddleware, singleNews);
Router.delete("/delete-news/:news_id", authMiddleware, deleteNews);

export default Router;
