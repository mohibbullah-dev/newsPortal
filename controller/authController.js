import jwt from "jsonwebtoken";
import { User } from "../models/authModel.js";
import bcrypt from "bcrypt";
import { ACCEESS_TOKEN_EXPIRED, ACCEESS_TOKEN_SECRET } from "../constant.js";
import formidable from "formidable";
import { Types } from "mongoose";
import { deleteFile, fileUpload } from "../utils/fileUpload.js";
const Login = async (req, res) => {
  console.log("hello, i am backend");
  const { email, password } = req.body;

  if (!email) res.status(404).json({ message: "please provide your email" });
  if (!password)
    return res.status(404).json({ message: "please provide your password" });

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) res.status(404).json({ message: "user not found" });
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const obj = {
        id: user.id,
        name: user.name,
        category: user.category,
        role: user.role,
        status: user.status,
      };

      const token = await jwt.sign(obj, ACCEESS_TOKEN_SECRET, {
        expiresIn: ACCEESS_TOKEN_EXPIRED,
      });

      return res
        .status(200)
        .json({ message: "login successfulle done", token });
    } else {
      return res.status(404).json({ message: "incorrect password" });
    }
  } catch (error) {
    console.log(error);
  }
};
const ProfileUpdate = async (req, res) => {
  const { profile_id } = req.params;
  const form = formidable({});
  const [fields, files] = await form.parse(req);
  const data = await User.findById(profile_id);
  if (!data) return res.status(404).json({ message: "user not found", data });
  data.name = fields?.name?.[0];
  data.email = fields?.email?.[0];
  await data.save();

  if (Object.keys(files).length > 0) {
    if (data.image.public_id) {
      await deleteFile(data.image.public_id);
    }
    const result = await fileUpload(files?.newImage[0].filepath, {
      folder: "avator",
      public_id: fields.name[0].trim(),
      use_filename: true,
    });
    data.image.url = result?.url;
    data.public_id = result?.public_id;
    await data.save();
  } else {
  }

  return res.status(200).json({ message: "profile updated", data });
};

const prof_passwor_reset = async (req, res) => {
  const { reset_pass_id } = req.params;

  const { old_password, new_password } = req.body;
  const user = await User.findById(new Types.ObjectId(reset_pass_id)).select(
    "+password"
  );

  if (!user) return res.status(404).json({ message: "user not found", user });
  const matched = await bcrypt.compare(old_password, user?.password);
  if (matched) {
    user.password = await bcrypt.hash(new_password || null, 10);
    await user.save();
    return res.status(201).json({ message: "password reset done", user });
  } else {
    return res.status(500).json({ message: "server error" });
  }
};

export { Login, ProfileUpdate, prof_passwor_reset };
