import { User } from "../models/authModel.js";
import bcrypt from "bcrypt";

const AddWriter = async (req, res) => {
  const { name, email, password, category } = req.body;
  if (!name) res.status(401).json({ message: "Name is required" });
  if (!email) res.status(401).json({ message: "email is required" });
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(401).json({ message: "invalid email" });
  }
  if (!password) res.status(401).json({ message: "password is required" });
  if (!category) res.status(401).json({ message: "password is required" });

  try {
    const writer = await User.findOne({ email: email.trim() });
    if (writer) {
      return res.status(401).json({ message: "writer already existed" });
    } else {
      const newWriter = await User.create({
        name: name.trim(),
        email: email.trim(),
        password: await bcrypt.hash(password.trim(), 10),
        category: category.trim(),
        role: "writer",
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
    console.log(writers);
    return res.status(200).json({ writers });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export { AddWriter, AllWriters };
