// import formidable from "formidable";
// import { fileUpload } from "../utils/fileUpload.js";
// import { News } from "../models/newsModel.js";
// import moment from "moment";
// import { Gellery } from "../models/gelleryImage.js";
// import mongoose, { Types } from "mongoose";

// const newsCreate = async (req, res) => {
//   const form = formidable({});
//   const { name, id, category } = req.userInfo;
//   console.log(req.userInfo);
//   try {
//     const [fields, files] = await form.parse(req);
//     const { title, description } = fields;
//     console.log("files data:", files);
//     if (Object.keys(files).length > 0) {
//       const data = await fileUpload(files.image[0].filepath, {
//         folder: "news_images",
//         public_id: title[0].trim(),
//         use_filename: true,
//       });
//       const news = await News.create({
//         writerId: id,
//         title: title[0].trim(),
//         slug: title[0].trim().split(" ").join("-"),
//         description: description[0],
//         image: {
//           url: data.url,
//           public_id: data.public_id,
//         },
//         category,
//         writer_name: name,
//         date: moment().format("LLLL"),
//         count: files.image[0]._eventsCount,
//       });

//       console.log("data inserted:", news);
//     } else {
//       console.log("image not selected");
//     }
//   } catch (error) {
//     console.log(error);
//   }

//   return res.status(200).json({ message: "api is working perfectly" });
// };

// const getGelleries = async (req, res) => {
//   const { id } = req.userInfo;

//   console.log("query id:", new Types.ObjectId(id)); // making ObjectId

//   try {
//     const data = await Gellery.find({
//       writerId: new Types.ObjectId(id),
//     }).sort({ createdAt: -1 });
//     // console.log("gallery_images", data);

//     return res.status(200).json({ data });
//   } catch (error) {
//     return res.status(500).json({ message: "server error", error });
//   }
// };

// // const addGellery = async (req, res) => {
// //   const form = formidable({});
// //   const { id } = req.userInfo;
// //   try {
// //     const [_, files] = await form.parse(req);
// //     console.log("sending files with rempId: ", files.images);
// //     const imagesArray = Array.isArray(files.images)
// //       ? files.images
// //       : [files.images];
// //     console.log("sending files with rempId: ", imagesArray);

// //     let allImages = [];

// //     for (let i = 0; i < imagesArray.length; i++) {
// //       const data = await fileUpload(imagesArray[i].filepath, {
// //         folder: "gellery_images",
// //       });

// //       allImages.push({
// //         writerId: new Types.ObjectId(id),
// //         image: { url: data.url, public_id: data.public_id },
// //       });
// //     }

// //     const new_data = await Gellery.insertMany(allImages);

// //     return res
// //       .status(201)
// //       .json({ message: "Gallery insert successfully done", new_data });
// //   } catch (error) {
// //     return res.status(500).json({ message: "server error" }, error.message);
// //   }
// // };

// const addGellery = async (req, res) => {
//   const form = formidable({ multiples: true });
//   const { id } = req.userInfo;

//   try {
//     const [fields, files] = await form.parse(req);
//     const tempIds = Array.isArray(fields.tempIds)
//       ? fields.tempIds
//       : [fields.tempIds];

//     const imagesArray = Array.isArray(files.images)
//       ? files.images
//       : [files.images];

//     let uploadedData = [];

//     for (let i = 0; i < imagesArray.length; i++) {
//       const uploaded = await fileUpload(imagesArray[i].filepath, {
//         folder: "gellery_images",
//       });

//       const saved = await Gellery.create({
//         writerId: new Types.ObjectId(id),
//         image: { url: uploaded.url, public_id: uploaded.public_id },
//       });

//       uploadedData.push({
//         tempId: tempIds[i], // ফ্রন্টএন্ডের tempId ফেরত পাঠানো
//         url: saved.image.url,
//       });
//     }

//     return res.status(201).json(uploadedData);
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ message: "server error", error: error.message });
//   }
// };

// export { newsCreate, addGellery, getGelleries };

import formidable from "formidable";
import { fileUpload } from "../utils/fileUpload.js";
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

  return res.status(200).json({ message: "api is working perfectly" });
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

    // tempIds ফর্ম-ফিল্ড থেকে নিলাম (এক বা একাধিক হতে পারে)
    const rawTempIds = fields?.tempIds ?? [];
    const tempIds = Array.isArray(rawTempIds) ? rawTempIds : [rawTempIds];

    // files.images এক/একাধিক হতে পারে
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

export { newsCreate, addGellery, getGelleries };
