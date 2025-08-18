import formidable from "formidable";
import { deleteFile, fileUpload } from "../utils/fileUpload.js";
import { News } from "../models/newsModel.js";
import moment from "moment";
import { Gellery } from "../models/gelleryImage.js";
import { Types } from "mongoose";

const newsCreate = async (req, res) => {
  const form = formidable({});
  const { name, id, category } = req.userInfo;

  try {
    const [fields, files] = await form.parse(req);
    const { title, description } = fields;

    if (Object.keys(files).length > 0) {
      const data = await fileUpload(files.image[0].filepath, {
        folder: "news_images",
        public_id: title[0].trim(),
        use_filename: true,
      });

      const news = await News.create({
        writerId: id,
        title: title[0].trim(),
        slug: title[0].trim().split(" ").join("-"),
        description: description[0],
        image: { url: data.url, public_id: data.public_id },
        category,
        writer_name: name,
        date: moment().format("LLLL"),
        count: files.image[0]._eventsCount,
      });
      console.log("data inserted:", news);
    } else {
      console.log("image not selected");
    }
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({ message: "image created successfully" });
};

const newsEdit = async (req, res) => {
  const { id } = req.userInfo;
  const { news_id } = req.params;
  if (news_id) {
    const news = await News.findOne({
      writerId: id,
      _id: new Types.ObjectId(news_id),
    });
    // console.log("editNews: ", news);
    return res.status(200).json({ message: "editable news", news });
  } else {
    console.log("editNews not found ");
  }
};

const newsUpdate = async (req, res) => {
  const { news_id } = req.params;
  const form = formidable({});
  const [fields, files] = await form.parse(req);

  const news = await News.findById(news_id);

  if (!news) {
    console.log("news not found");
    return res.status(404).json({ message: "news not found" });
  }

  news.title = fields.title[0];
  news.description = fields.description[0];
  if (news.image.url !== fields.old_image[0]) {
    news.image.url = fields.old_image[0];
  } else {
    await deleteFile(news.image.public_id);
    const result = await fileUpload(files.new_image[0].filepath, {
      folder: "news_images",
      public_id: fields.title[0].trim(),
      use_filename: true,
    });
    news.image.url = result.url;
    news.image.public_id = result.public_id;
    news.slug = fields.title[0].trim().split(" ").join("-");
  }

  await news.save();
  return res.status(200).json({ message: "news updated" });
};

const statusUpdate = async (req, res) => {
  const { newsId } = req.params;
  const { role } = req.userInfo;
  const { status } = req.body;

  console.log("newsId: ", newsId);
  console.log("role: ", role);
  console.log("status: ", status);

  try {
    if (role === "admin") {
      const data = await News.findByIdAndUpdate(
        newsId,
        { status },
        { new: true }
      );
      if (!data) res.status(404).json({ message: "news not found", data });

      return res.status(200).json({ message: "status updated", data });
    } else {
      return res.status(400).json({ message: "you are unable to update it" });
    }
  } catch (error) {
    return res.status(400).json({ message: "server error", error });
  }
};
const getNews = async (req, res) => {
  const { id, role } = req.userInfo;
  if (role === "admin") {
    const data = await News.find().sort({ createdAt: -1 });
    return res.status(200).json({ message: "all news data for admin", data });
  } else {
    const data = await News.find({ writerId: id }).sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ message: "all news data for created by writer", data });
  }
};

const getGelleries = async (req, res) => {
  const { id } = req.userInfo;

  try {
    const data = await Gellery.find({
      writerId: new Types.ObjectId(id),
    }).sort({ createdAt: -1 });

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: "server error", error });
  }
};

const addGellery = async (req, res) => {
  const form = formidable({ multiples: true });
  const { id } = req.userInfo;

  try {
    const [fields, files] = await form.parse(req);
    const rawTempIds = fields?.tempIds ?? [];
    const tempIds = Array.isArray(rawTempIds) ? rawTempIds : [rawTempIds];
    const imagesArray = Array.isArray(files.images)
      ? files.images
      : [files.images];

    const uploadedData = [];

    for (let i = 0; i < imagesArray.length; i++) {
      const uploaded = await fileUpload(imagesArray[i].filepath, {
        folder: "gellery_images",
      });

      const saved = await Gellery.create({
        writerId: new Types.ObjectId(id),
        image: { url: uploaded.url, public_id: uploaded.public_id },
      });

      uploadedData.push({
        tempId: String(tempIds[i] ?? ""), // tempId সবসময় string করে দিচ্ছি
        url: saved.image.url,
        id: String(saved._id),
        public_id: saved.image.public_id,
      });
    }

    // ফ্রন্টএন্ড ডাইরেক্ট অ্যারে ধরছে, তাই অ্যারেই পাঠালাম
    return res.status(201).json(uploadedData);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

export {
  newsCreate,
  getNews,
  addGellery,
  getGelleries,
  newsEdit,
  newsUpdate,
  statusUpdate,
};
