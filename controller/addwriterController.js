import formidable from "formidable";
import { User } from "../models/authModel.js";
import bcrypt from "bcrypt";
import { deleteFile, fileUpload } from "../utils/fileUpload.js";

const AddWriter = async (req, res) => {
  const form = formidable({});
  const [fields, files] = await form.parse(req);
  console.log("fields", fields);

  if (Object.keys(files).length < 0) {
    return res.status(404).json("file not found");
  }
  console.log("fields", fields);

  const { name, email, password, category } = fields;
  console.log("name: ", name[0]);
  if (!name[0]) res.status(401).json({ message: "Name is required" });
  if (!email[0]) res.status(401).json({ message: "email is required" });
  if (!email[0].match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(401).json({ message: "invalid email" });
  }
  if (!password[0]) res.status(401).json({ message: "password is required" });
  if (!category[0]) res.status(401).json({ message: "password is required" });

  try {
    const data = await fileUpload(files.avator[0].filepath, {
      folder: "writer-avator",
      use_filename: true,
    });

    if (!data) {
      console.log("data not found");
    }
    console.log("data:", data);
    const writer = await User.findOne({ email: email[0].trim() });
    if (writer) {
      return res.status(401).json({ message: "writer already existed" });
    } else {
      const newWriter = await User.create({
        name: name[0].trim(),
        email: email[0].trim(),
        password: await bcrypt.hash(password[0].trim(), 10),
        category: category[0].trim(),
        role: "writer",
        image: {
          url: data.url,
          public_id: data.public_id,
        },
      });

      return res
        .status(201)
        .json({ message: "writer creact", writer: newWriter });
    }
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const AllWriters = async (req, res) => {
  try {
    const writers = await User.find({ role: "writer" });
    if (writers.length < 0) {
      return res.status(404).json({ message: "writers not found" });
    } else {
      return res.status(200).json({ writers });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const editWriter = async (req, res) => {
  const { writer_id } = req.params;

  if (writer_id) {
    try {
      const writer = await User.findById(writer_id);
      if (!writer) res.status(404).json({ message: "writer not found" });
      return res.status(200).json({ message: "write found", writer });
    } catch (error) {
      return res.status(404).json({ message: "server error" });
    }
  } else {
    return res.status(400).json({ message: "incorrect url" });
  }
};

const updateWriter = async (req, res) => {
  const { writer_id } = req.params;
  const form = formidable({});

  try {
    const [fields, files] = await form.parse(req);
    const writer = await User.findById(writer_id);
    if (!writer) return res.status(404).json({ message: "writer not found" });

    writer.name = fields?.name?.[0]?.trim();
    writer.email = fields?.email?.[0];
    writer.category = fields?.category?.[0]?.trim();

    if (fields?.resetPassword?.[0]?.trim()) {
      writer.password = await bcrypt.hash(
        fields?.resetPassword?.[0]?.trim(),
        10
      );
    }

    if (Object.keys(files).length > 0) {
      await deleteFile(writer.image.public_id);
      if (!files?.avator?.length > 0) {
        return res.status(404).json({ message: "avator not found" });
      }

      const result = await fileUpload(files?.avator?.[0].filepath, {
        folder: "writer-avator",
        use_filename: true,
      });
      console.log("result", result);
      writer.image.url = result?.url;
      writer.image.public_id = result?.public_id;
      await writer.save();
      return res.status(200).json({ message: "writer updated", result });
    } else {
      if (writer.image.url === fields.oldImage[0]) {
        writer.image.url = fields.oldImage[0];
      }
      await writer.save();
      return res.status(200).json({ message: "writer updated", writer });
    }
  } catch (error) {
    return res.status(500).json({ message: "server error", error });
  }
};

const deleteWriter = async (req, res) => {
  const { writer_id } = req.params;
  console.log("writer_id", writer_id);
  try {
    const deletedWriter = await User.findByIdAndDelete(writer_id);
    if (!deletedWriter) {
      console.log("writer not found");
      return res
        .status(404)
        .json({ message: "writer not found", deletedWriter });
    }
    return res
      .status(200)
      .json({ message: "writer succefully deleted", deletedWriter });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const statusUpdated = async (req, res) => {
  const { writer_id } = req.params;
  const { status } = req.body;
  console.log("writer_id", writer_id);
  console.log("status", status);
  try {
    const statusUpdated = await User.findByIdAndUpdate(
      writer_id,
      { status },
      { new: true }
    );

    if (!statusUpdated) {
      return res.status(404).json({ message: "data not found", statusUpdated });
    }

    return res
      .status(200)
      .json({ message: "status updated succefully", statusUpdated });
  } catch (error) {
    return res.status(500).json({ message: "server" });
  }
};

export {
  AddWriter,
  AllWriters,
  editWriter,
  updateWriter,
  deleteWriter,
  statusUpdated,
};
